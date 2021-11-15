

function asyncAdd(a, b, callback) {
    setTimeout(() => {
        callback(a + b)
    }, 500)
}

const promiseAdd = (a, b) => new Promise((resolve, reject) => {
    asyncAdd(a, b, resolve)
})

async function serialSum(...args) {
    return args.reduce((task, cur) => task.then(res => promiseAdd(res, cur)), Promise.resolve(0))
}

async function parallelSum(...args) {
    if(args.length === 1) return args[0]
    const tasks = []
    for(let i = 0; i < args.length; i = i+2) {
        tasks.push(promiseAdd(args[i], args[i +1] || 0))
    }
    const result = await Promise.all(tasks)
    return parallelSum(...result)
}

(async () => {
    console.log('start :>> ', 'start');
    const result = await serialSum(1, 2, 3, 4, 5)
    console.log('end :>> ', result);

    console.log('start2 :>> ', 'start2');
    const result2 = await parallelSum(1, 2, 3, 4, 5)
    console.log('end :>> ', result2);
})()