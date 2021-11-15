

function compareVersion(v1, v2) {
    const arr1 = v1.split('.')
    const arr2 = v2.split('.')
    const len = Math.max(arr1.length, arr2.length)
    for(let i = 0; i < len; i++) {
        let x = 0, y = 0
        if (i < arr1.length) {
            x = parseInt(arr1[i])
        }
        if (i < arr2.length) {
            y = parseInt(arr2[i])
        }
        if (x > y) {
            return 1
        }
        if (x < y) {
            return -1
        }
    }
    return 0
}