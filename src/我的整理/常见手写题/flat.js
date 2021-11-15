

function arrayFlat(arr) {
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    let item = arr[i];
    if (Array.isArray(item)) {
      result.push(...arrayFlat(item));
    } else {
      result.push(item);
    }
  }
}

function arrFlat2 (arr) {
  return arr.reduce((pre, cur) => {
    return pre.concat(Array.isArray(cur) ? arrFlat2(cur) : cur)
  }, [])
}

function objectFlat(obj = {}) {
  const res = {};
  function flat(item, preKey = '') {
    Object.entries(item).forEach(([key, val]) => {
      const newKey = preKey ? `${preKey}.${key}` : key
      if (val && typeof val === 'object') {
        flat(val, newKey);
      } else {
        res[newKey] = val;
      }
    });
  }
  flat(obj);
  return res;
}

// 测试
const arr = [1, [2, [3, [4, 5]]], 6];
console.log(arrFlat(arr));
const source = { a: { b: { c: 1, d: 2 }, e: 3 }, f: { g: 2 } }
const source1 =  { a: { b: { c: 1 } }, d: 2, e: [3, { f: 4, g: [5] }, [6, 7]], h: 8 }
console.log(objectFlat(source1));

function arrFlat(array) {
  return array.reduce((result, cur) => result.concat(Array.isArray(cur) ? arrFlat(cur) : cur), [])
}
