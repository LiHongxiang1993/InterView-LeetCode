


function deepCopy(obj, cache = new WeakMap) {
  if (!obj instanceof Object) return obj;
  // 防止循环引用
  if (cache.get(obj)) return cache.get(obj);
  if (obj instanceof Function) {
    return function () {
      obj.apply(this, [...arguments]);
    }
  }
  if (obj instanceof Date) {
    return new Date(obj);
  }
  if (obj instanceof RegExp) {
    return new RegExp(obj.source, obj.flags);
  }
  
  const res = Array.isArray(obj) ? [] : {};
  cache.set(obj, res);
  // 针对Symbol属性
  const symKeys = Object.getOwnPropertySymbols(target);
  if (symKeys.length) {
    symKeys.forEach(symKey => {
      if (typeof target[symKey] === 'object' && target[symKey] !== null) {
        res[symKey] = deepCopy(target[symKey], cache);
      } else {
        res[symKey] = target[symKey];
      }
    })
  }

  Object.keys(obj).forEach(key => {
    if (obj[key] instanceof Object) {
      res[key] = deepCopy(obj[key], cache);
    } else {
      res[key] = obj[key];
    }
  });
  return res;
}

// 测试
const source = {
  name: 'Jack',
  meta: {
    age: 12,
    birth: new Date('1997-10-10'),
    ary: [1, 2, { a: 1 }],
    say() {
      console.log('Hello');
    }
  }
}
source.source = source
const newObj = deepCopy(source)
console.log(newObj.meta.ary[2] === source.meta.ary[2]); // false
console.log(newObj.meta.birth === source.meta.birth); // false

// 首先，WeakMap只接受对象作为键名（null除外），不接受其他类型的值作为键名。
// 其次，WeakMap的键名所指向的对象，不计入垃圾回收机制。
function deepCopy(obj, cache = new WeakMap()) {
  if (!obj instanceof Object || obj === null) {
    return obj
  }
  if (cache.get(obj)) {
    return cache.get(obj)
  }
  if(obj instanceof Function) {
    return function() {
      obj.apply(this, [...arguments])
    }
  }
  if (obj instanceof Date) {
    return new Date(obj)
  }
  if (obj instanceof RegExp) {
    return new RegExp(obj.source, obj.flags)
  }

  const res = Array.isArray(obj) ? [] : {}
  cache.set(obj, res)
   // 针对Symbol属性
   const symKeys = Object.getOwnPropertySymbols(obj);
   if (symKeys.length) {
     symKeys.forEach(symKey => {
       if (typeof obj[symKey] === 'object' && obj[symKey] !== null) {
        res[symKey] = deepCopy(obj[symKey], cache);
       } else {
        res[symKey] = obj[symKey];
       }
     })
  Object.keys(obj).forEach(key => {
    if (obj[key] instanceof Object) {
      res[key] = deepCopy(obj[key], cache)
    } else {
      res[key] = obj[key]
    }
  })

  return res
}