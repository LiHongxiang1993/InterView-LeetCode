const rawToReactive = new WeakMap();
const reactiveToRaw = new WeakMap();

function isObject(obj) {
  return typeof obj === 'object';
}

function hasOwn(obj, key) {
  const hasOwnProperty = Object.prototype.hasOwnProperty;
  return hasOwnProperty.call(obj, key);
}

function get(target, key, receiver) {
  const res = Reflect.get(target, key, receiver);
  return isObject(res) ? reactive(res) : res;
}


function set(target, key, value, receiver) {
  const hasKey = hasOwn(target, key);
  const oldValue = target[key];

  // value = reactiveToRaw.get(value) || value;
  const result = Reflect.set(target, key, value, receiver);

  if (!hasKey) {
    console.log('trigger ... is a add OperationType')
  } else if (oldValue !== value) {
    console.log('trigger ... is a set OperationType')
  }
  return result;
}

const mutableHandler = {
  get: get,
  set: set
}

function createReactiveObject(target, toProxy, toRaw, basHandler) {
  let observed = toProxy.get(target);
  // 原数据已经有相应的可响应数据, 返回可响应数据
  if (observed !== undefined) {
    return observed;
  }
  // 原数据已经是可响应数据
  if (toRaw.has(target)) {
    return target;
  }
  observed = new Proxy(target, basHandler);
  toProxy.set(target, observed);
  toRaw.set(observed, target);
  return observed;
}


function reactive(target) {
  return createReactiveObject(target, rawToReactive, reactiveToRaw, mutableHandler);
}

let data = { foo: 'foo', ary: [1, 2] }
let r = reactive(data)
r.ary.push(3)
r.foo = 'dd'