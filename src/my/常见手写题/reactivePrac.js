



// const rawToReactive = new WeakMap();

// function getter(target, key, receiver) {
//   let res = Reflect.get(target, key, receiver);
//   return isObject(res) ? reactive(res) : res;
// }

// function setter(target, key, value, reciever) {
//   let hasKey = hasOwn(target, key);
//   let oldValue = target[key];
//   let res = Reflect.set(target, key, value, reciever);
//   if (!hasKey) {
//     console.log('trigger by add :>> ', 'trigger by add');
//   } else if (oldValue !== value) {
//     console.log('trigger by change :>> ', 'trigger by change');
//   }
//   return res;
// }

// function isObject(obj) {
//   return typeof obj === 'object';
// }

// function hasOwn(obj, key) {
//   let hasOwnProperty = Object.prototype.hasOwnProperty;
//   return hasOwnProperty.call(obj, key);
// }


// const handler = { get: getter, set: setter };

// function reactive(obj) {
//   return createReactiveObject(obj, handler, rawToReactive);
// }

// function createReactiveObject(target, handler, rawToReactive) {
//   let observed = rawToReactive.get(target);
//   if (observed) {
//     return observed;
//   }
//   observed = new Proxy(target, handler);
//   rawToReactive.set(target, observed);
//   return observed;
// }

// let data = { foo: 'foo', ary: [1, 2] }
// let r = reactive(data)
// r.ary.push(3)

const rawToReactive = new WeakMap()
const reactiveToRaw = new WeakMap()

function reactive(data) {
  return createReactiveObj(data, baseHandler, rawToReactive, reactiveToRaw)
}

function createReactiveObj(obj, handler, rawToReactive, reactiveToRaw) {
  const target = rawToReactive.get(obj)
  if (target) {
    return target
  }
  if (reactiveToRaw.has(obj)) {
    return obj
  }
  const proxy = new Proxy(obj, handler)
  rawToReactive.set(obj, proxy)
  reactiveToRaw.set(proxy, obj)
  return proxy
}

const baseHandler = {
  set: setter,
  get: getter,
}

function getter(target, key, receiver) {
  const value = Reflect.get(target, key, receiver)
  return isObject(value) ? reactive(value) : value
}

function setter(target, key, value, receiver) {
  const haskey = hasOwn(target, key)
  let oldValue = target[key]
  const res = Reflect.set(target, key, value, receiver)
  if (!haskey) {
    console.log('trigger by new prop key')
  } else if (oldValue !== value) {
    console.log('trigger by value change')
  }
  return res
}

function isObject(value) {
  return typeof value === 'object'
}

function hasOwn(obj, key) {
  const hasOwnProperty = Object.prototype.hasOwnProperty
  return hasOwnProperty.call(obj, key)
}

let obj = {name: 'li', age: '12'}

let proxy = reactive(obj)

proxy.nme = 'zhang s21a34n'