


const add = function (a, b) {
  return a + b;
};

const curried = curry(add);
const plusOne = curried(1);
const plusTwo = curried(2, 5);

console.log('plusTwo :>> ', plusTwo);

function partial(fun) {
  let args = [].slice.call(arguments, 1);
  return function () {
    let newArgs = args.concat([].slice.call(arguments))
    return fun.apply(this, newArgs);
  }
}

function memorize(fn) {
  const cache = Object.create(null); // 存储缓存数据的对象
  return function (...args) {
    const _args = JSON.stringify(args);
    return cache[_args] || (cache[_args] = fn.apply(fn, args));
  };
};

function curry(fun) {
  return function curried(...args) {
    if (args.length >= fun.length) {
      fun.apply(this, args);
    } else {
      return function (...args2) {
        return curried.apply(this, args.concat(args2));
      }
    }
  }
}


function curry(func) {
  return function curried(...args) {
    if (args.length >= func.length) { // 通过函数的length属性，来获取函数的形参个数
      // console.log('this :>> ', this);
      return func.apply(this, args);
    } else {
      return function (...args2) {
        return curried.apply(this, args.concat(args2));
      };
    }
  }
}

function partial(fun) {
  let args = [].slice.call(arguments, 1);
  return function (...args2) {
    let newArgs = args.concat(args2);
    return fun.apply(this, newArgs);
  }
}

function curry(func) {
  return function curried(...args) {
    if (args.length > func.length) {
      func.apply(this, args)
    } else {
      return function(...args2) {
        return curried.apply(this, args.concat(args2))
      }
    }
  }
}
// 组合函数
/**
 * 概括来说，就是接收若干个函数作为参数，返回一个新函数。
 * 新函数执行时，按照由右向左的顺序依次执行传入compose中的函数，每个函数的执行结果作为为下一个函数的输入，
 * 直至最后一个函数的输出作为最终的输出结果。
 */
 function compose(...fns){
  return function(x){
      return fns.reduceRight(function(arg,fn){
          return fn(arg);
      }, x)
  }
}


function curry(func) {
  return function curried(...args) {
    if (args.length >= func.length) {
      func.apply(this, args)
    } else {
      return new function(...args2) {
        return curried.apply(this, args2.concat(args))
      }
    }
  }
}