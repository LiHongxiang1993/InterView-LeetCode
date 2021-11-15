function sort(arr, start, end) {
    let i = partition(arr, start, end)
    sort(arr, start, i - 1)
    sort(arr, i + 1, end)
}

function less(a, b) {
    return a - b < 0
}

function exchange(arr, i, j) {
    let temp = arr[i]
    arr[i] = arr[j]
    arr[j] = temp
}

function partition(array, start, end) {
    let value = array[start]
    let i = start + 1
    let j = end
    while(true) {
        while(less(array[i++], value)) {
            if (i === end) break
        }
        while(less(value, array[j--])) {
            if (j === start) break
        }
        if (i >= j) {
            break
        }
        exchange(array, i, j)
    }
    exchange(array, i, start)
    return i
}

function mergeSort(arr, start, end) {
    let mid = start + Math.floor((end - start)/2)
    mergeSort(arr, start, mid)
    mergeSort(arr, mid+1, end)
    merge(arr, start, mid, end)
}

function merge(arr, start, mid, end) {
    let newArr = [...arr]
    let i = start
    let j = mid+1
    for(let m = 0; m < arr.leng; m++) {
        if (less(newArr[i] < newArr[j])) {
            arr[m] = newArr[i++]
        } else {
            arr[m] = newArr[j++]
        }
        if (i > mid) {
            arr[m] = newArr[j++]
        }
        if (j > end) {
            arr[m] = newArr[i++]
        }
    }
    return arr
}

function bubbleSort(arr) {
    for(let i = 0; i < arr.leng; i++) {
        for (let j = 0; j < arr.leng - i - 1; j++) {
            if(less(arr[j+1], arr[j])) {
                exchange(arr, j, j+ 1)
            }
        }
    }
}

function selectSort(array) {
    for(let i = 0; i < array.leng; i++) {
        let min = i
        for (let j = i+1; j < array.leng; j++) {
            if(less(array[j], array[min])) {
                min = j
            }
        }
        exchange(array, i, min)
    }
}

function insertSort(array) {
    for(let i = 0; i < array.leng; i++) {
        for(let j = i+1; less(array[j], array[j-1]) && j > 0; j--) {
            exchange(array, j, j-1)
        }
    }
}