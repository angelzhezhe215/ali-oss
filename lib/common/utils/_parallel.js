"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._parallel = void 0;
function _parallel(todo, num, fn, sourceData) {
    const that = this;
    return new Promise(res => {
        const jobErr = [];
        const doing = [];
        const jobs = todo.map(_ => {
            return () => {
                return fn(_, sourceData);
            };
        });
        for (let i = 0; i < num && todo && todo.length && !that.isCancel(); i++) {
            continueFn(jobs);
        }
        function continueFn(queue) {
            if (!queue || !queue.length || that.isCancel()) {
                return;
            }
            ;
            const item = queue.pop();
            doing.push(item);
            item().then(_res => {
                continueFn(queue);
            }).catch(_err => {
                queue.length = 0;
                jobErr.push(_err);
                res(jobErr);
            }).finally(() => {
                doing.pop();
                if (!doing.length)
                    res();
            });
        }
    });
}
exports._parallel = _parallel;
// export async function _parallel(this: any, todo, parallel, fn, sourceData?) {
//   // upload in parallel
//   const jobErr: any = [];
//   let jobs = [];
//   for (let i = 0; i < todo.length; i = i + parallel) {
//     if (this.isCancel()) {
//       break;
//     }
//     jobs = todo.slice(i, i + parallel).map(_ => fn(_, sourceData))
//     try {
//       /* eslint no-await-in-loop: [0] */
//       await Promise.all(jobs);
//     } catch (err) {
//       jobErr.push(err);
//       break;
//     }
//   }
//   return jobErr;
// };
