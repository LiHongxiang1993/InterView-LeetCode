// 异步并发数限制
// poolLimit（数字类型）：表示限制的并发数；
// array（数组类型）：表示任务数组；
// iteratorFn（函数类型）：表示迭代函数，用于实现对每个任务项进行处理，该函数会返回一个 Promise 对象或异步函数
// async function asyncPool(poolLimit, array, iteratorFn) {
//     const ret = []; // 存储所有的异步任务
//     const executing = []; // 存储正在执行的异步任务
//     for (const item of array) {
//       // 调用iteratorFn函数创建异步任务
//       const p = Promise.resolve().then(() => iteratorFn(item, array));
//       ret.push(p); // 保存新的异步任务
  
//       // 当poolLimit值小于或等于总任务个数时，进行并发控制
//       if (poolLimit <= array.length) {
//         // 当任务完成后，从正在执行的任务数组中移除已完成的任务
//         const e = p.then(() => executing.splice(executing.indexOf(e), 1));
//         executing.push(e); // 保存正在执行的异步任务
//         if (executing.length >= poolLimit) {
//           await Promise.race(executing); // 等待较快的任务执行完成
//         }
//       }
//     }
//     return Promise.all(ret);
//   }

  function asyncPool(poolLimit, array, iteratorFn) {
    let i = 0;
    const ret = []; // 存储所有的异步任务
    const executing = []; // 存储正在执行的异步任务
    const enqueue = function () {
      if (i === array.length) {
        return Promise.resolve();
      }
      const item = array[i++]; // 获取新的任务项
      const p = Promise.resolve().then(() => iteratorFn(item, array));
      ret.push(p);
  
      let r = Promise.resolve();
  
      // 当poolLimit值小于或等于总任务个数时，进行并发控制
      if (poolLimit <= array.length) {
        // 当任务完成后，从正在执行的任务数组中移除已完成的任务
        const e = p.then(() => executing.splice(executing.indexOf(e), 1));
        executing.push(e);
        if (executing.length >= poolLimit) {
          r = Promise.race(executing); 
        }
      }
   
      // 正在执行任务列表 中较快的任务执行完成之后，才会从array数组中获取新的待办任务
      return r.then(() => enqueue());
    };
    return enqueue().then(() => Promise.all(ret));
  }
  

const timeout = i => new Promise(resolve => setTimeout(() => {
    resolve(i)
    console.log('i :>> ', i);
}, i));
asyncPool(2, [1000, 5000, 3000, 2000], timeout);


async function asyncPool(limit, array, iteratorFn) {
    let tasks = []
    let doingTasks = []
    for(const item of array) {
        const task = Promise.resolve().then(() => iteratorFn(item))
        tasks.push(task)
        if (limit < array.length) {
            const e = task.then(() => doingTasks.splice(doingTasks.indexOf(e), 1))
            doingTasks.push(e)
            if (doingTasks.length >= limit) {
                await Promise.race(doingTasks)
            }
        }
    }
    return Promise.all(tasks)
}

function asyncPoll(limit, array, iteratorFn) {
    const tasks = []
    const doingTasks = []
    let index = 0
    const enqueue = () => {
        if (index === array.length) {
            return Promise.resolve()
        }
        // Promise.resolve().then把任务添加到微任务队列防止任务立即执行
        const task = Promise.resolve().then(() => iteratorFn(array[index++]))
        tasks.push(task)
        let result = Promise.resolve()
        if (limit < array.length) {
            // 任务完成时，从正在执行的任务队列里面 移除任务
            const e = task.then(() => doingTasks.splice(doingTasks.indexOf(), 1))
            doingTasks.push(e)
            if (doingTasks.length >= limit) {
                result = Promise.race(doingTasks)
            }
        }
        // 正在执行的任务列表中执行较快的任务完成后 才会从array中获取新的任务，保证任务按最大并发数执行
        return result.then(() => enqueue())
    }
    return enqueue().then(() => Promise.all(tasks))
}
