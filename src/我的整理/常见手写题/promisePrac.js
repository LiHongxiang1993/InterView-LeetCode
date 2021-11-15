



class MyPromise {

  constructor(executor) {
    this.status = 'pending';
    this.value = '';
    this.error = '';
    this.onResolvedCallback = [];
    this.onRejectCallback = [];
    const resolve = (value) => {
      if (this.status === 'pending') {
        this.status = 'fulfilled';
        this.value = value;
        this.onResolvedCallback.forEach(fun => fun());
      }
    }
    const reject = (error) => {
      if (this.status === 'pending') {
        this.status = 'reject';
        this.error = error;
        this.onRejectCallback.forEach(fun => fun());
      }
    }
    try {
      executor(resolve, reject);
    } catch (err) {
      reject(err);
    }
    
  }

  then(onFulfilled, onReject) {
    let promise2 = new MyPromise((resolve, reject) => {
      if (this.status === 'fulfilled') {
        let x = onFulfilled(this.value);
        resolvePromise(promise2, x, resolve, reject);
      }
      if (this.status === 'reject') {
        let y = onReject(this.error);
        resolvePromise(promise2, y, resolve, reject);
      }
      if (this.status === 'pending') {
        this.onResolvedCallback.push(() => {
          let x = onFulfilled(this.value);
          resolvePromise(promise2, x, resolve, reject);
        })
        this.onRejectCallback.push(() => {
          let y = onReject(this.error);
          resolvePromise(promise2, y, resolve, reject);
        })
      }
    });
    return promise2;
  }

  catch(fn){
    return this.then(null,fn)
  }

}
MyPromise.resolve = val => new MyPromise(resolve => resolve(val))

MyPromise.race = promises =>
  new MyPromise((resolve,reject)=>{
    for(let i=0;i<promises.length;i++){
      promises[i].then(resolve,reject)
    };
  })

MyPromise.all = function (promises) {
  return new MyPromise((resolve, reject) => {
    let index = 0;
    let result = [];
    if (promises.length === 0) {
      resolve(result);
    } else {
      function processValue(i, data) {
        result[i] = data;
        if (++index === promises.length) {
          resolve(result);
        }
      }
      for (let i = 0; i < promises.length; i++) {
        //promises[i] 可能是普通值
        Promise.resolve(promises[i]).then((data) => {
          processValue(i, data);
        }, (err) => {
          reject(err);
          return;
        });
      }
    }
  });
}
  

function resolvePromise(promise2, x, resolve, reject) {
  if (x === promise2) {
    return reject(new TypeError('循环引用'));
  }
  if (x != null && (typeof x == 'function' || typeof x == 'object')) {
    try {
      let then = x.then;
      // 如果是then是函数，则默认x是promise对象
      if (typeof then == 'function') {
        then.call(x, y => {
          resolvePromise(promise2, y, resolve, reject);
        }, err => {
          reject(err);
        });
      } else {
        resolve(x);
      }
    } catch (err) {
      reject(err);
    }
  } else {
    resolve(x);
  }
}

new MyPromise(resolve => {
  console.log(0)
  setTimeout(() => resolve(1), 3000)
})
.then(res => {
  console.log(res)
  return new MyPromise(resolve => {
    console.log(2)
    setTimeout(() => {
      resolve(3)
    }, 3000)
  })
})
.then(res => {
  console.log(res)
})


class Promise {
  constructor(executor) {
    this.state = 'pending'
    this.value = ''
    this.reason = ''
    this.onResoleveCallbacks = []
    this.onRejectCallbacks = []

    let resolve = value => {
      if (this.state === 'pending') {
        this.state = 'fufilled'
        this.value = value
        this.onResoleveCallbacks.forEach(func => func())
      }
    }

    let reject = reason => {
      if (this.state === 'pending') {
        this.state = 'rejected'
        this.reason = reason
        this.onRejectCallbacks.forEach(func => func())
      }
    }

    try {
      executor(resolve, reject)
    } catch(err) {
      reject(err)
    }
  }

  then(onFufilled, onRejected) {
    let promise2 = new Promise((resolve, reject) => {
      if (this.state === 'fufilled') {
        let x = onFufilled(this.value)
        // resolvePromise函数处理 自己返回的promise与promise2的关系
        resolvePromise(promise2, x, resolve, reject)
      }
      if (this.state === 'rejected') {
        let x = onRejected(this.reason)
        // resolvePromise函数处理 自己返回的promise与promise2的关系
        resolvePromise(promise2, x, resolve, reject)
      }
      if (this.state === 'pending') {
        this.onResoleveCallbacks.push(() => {
          let x = onFufilled(this.value)
          // resolvePromise函数处理 自己返回的promise与promise2的关系
          resolvePromise(promise2, x, resolve, reject)
        })
        this.onRejectCallbacks.push(() => {
          let x = onRejected(this.reason)
          // resolvePromise函数处理 自己返回的promise与promise2的关系
          resolvePromise(promise2, x, resolve, reject)
        })
      }
    })
    return promise2
    
  }
}

function resolvePromise(promise, x, resolve, reject) {
  if (promise === x) {
    return reject(new TypeError('chaining cycle detected for promise'))
  }
  let called = false
  if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
    let then = x.then
    if (typeof then === 'function') {
      then.call(x, value => {
        if (called) {
          return
        }
        called = true
        resolvePromise(promise2, value, resolve, reject)
      }, reason => {
        if (called) {
          return
        }
        called = true
        resolvePromise(promise2, reason, resolve, reject)
      })
    } else {
      resolve(x)
    }
  } else {
    resolve(x)
  }
}

Promise.resolve = val => new Promise(resolve => resolve(val))

Promise.reject = err => new Promise((resolve, reject) => {
  reject(err)
})

Promise.race = promises => new Promise((resolve, reject) => {
  promises.forEach(p => p.then(resolve, reject))
})

// catch 是then方法的语法糖
Promise.catch = (callback) => {
  this.then(null, callback)
}

Promise.all = promises => new Promise((resolve, reject) => {
  let index= 0
  let result = []
  if (promises.length === 0) {
    resolve(result)
  } else {
    function processValue(i, data) {
      result[i] = data
      if (++index === promises.length) {
        resolve(result)
      }
    }
    for (let i = 0; i < promises.length; i++) {
      Promise.resolve(promises[i]).then(val => {
        processValue(i, data)
      }, err => {
        reject(err)
        return
      })
    }
  }
})