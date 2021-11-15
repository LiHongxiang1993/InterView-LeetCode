/**
 * [["a", "b"], ["n", "m"], ["0", "1"]] => ["am0", "am1", "an0", "an1", "bm0", ...]
 */

 function changeArr (arr) {
    // 赋值：赋值给一个新的对象，这样修改之后不会影响之前的值
    const newArr = [...arr]
    // 取值：获取数组的第一个值
    let result = newArr.shift()
    // 循环这个数组
    while (newArr.length) {
        // 取值：从这个数组中再次获取第一个值
        const other = newArr.shift()
        // 定义一个新的数组为 []
        const newResult = []
        // 循环 result 
        result.forEach(item => {
            // 循环 other
            other.forEach(_item => {
                // 把数据组合返回给定义的数组
                newResult.push(item + '' + _item)
            })
        })
        // 把 result 赋值给 newResult
        result = [...newResult]
    }
    return result
}
const arr = [['a', 'b'], ['m', 'n'], [0, 1]]
const result = changeArr(arr)
// console.log(result) // ["am0", "am1", "an0", "an1", "bm0", "bm1", "bn0", "bn1"]

function changeArr1(arr) {
    const newArr = arr
    let result = newArr.shift()
    while(newArr.length) {
        let newResult = []
        let other = newArr.shift()
        result.forEach(item1 => {
            other.forEach(item2 => {
                newResult.push(item1 + item2)
            })
        })
        result = [...newResult]
    }
    return result
}

function f(matrix) {
   const result = [];
   const len = matrix.length;
 function dfs(res, curr) {
     if (res.length === len) {
         result.push(res.join(''));
           return;
     }
       for (let i = 0; i < matrix[curr].length; i++) {
         res.push(matrix[curr][i]);
              dfs(res, curr + 1);
           res.pop();
     }
 }
   dfs([], 0);
   return result;
}

const arr1 = [['a', 'b'], ['m', 'n'], [0, 1]]
const result1 = changeArr1(arr1)
console.log(result1) // ["am0", "am1", "an0", "an1", "bm0", "bm1", "bn0", "bn1"]