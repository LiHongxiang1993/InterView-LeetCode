



Promise.prototype.all = function(promises) {
    return new Promise((resolve, reject) => {
        let index = 0;
        let result = [];
        if (promises.length == 0) {
            resolve(result);
        } else {
            function processValue(i, data) {
                result[i] = data;
                index++;
                if (index == promises.length) {
                    resolve(result);
                }
            }
            for (let i = 0; i < promises.length; i++) {
                Promise.resolve(promises[i]).then(data => {
                    processValue(i, data);
                },
                err => {
                    reject(err);
                    return;
                })
            }
        }
    })
}

Promise.prototype.race = function(promises) {
    return new Promise((resolve, reject) => {
       promises.forEach(pro => pro.then(resolve, reject))
    })
}

Promise.prototype.resolve = value => new Promise(resolve => resolve(value));

Promise.prototype.reject = err => new Promise((resolve, reject) => reject(err));