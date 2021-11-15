
function less(a, b) {
    return a - b < 0;
}

function exchange(array, i, j) {
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}

function bubbleSort(array) {
    if (typeof(array) != Array) {
        return;
    }
    if (array.length === 0 || array.length === 1) {
        return;
    }
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            if (less(array[j +1], array[j])) {
                exchange(array, j, j + 1);
            }
        }
    }
}

function selectSort(array) {
    for (let i = 0; i < array.length - 1; i++) {
        let min = i;
        for (let j = i + 1;j < array.length;j++) {
            if (less(array[j], array[min])) {
                min = j;
            }
        }
        exchange(array, i, min);
    }
}

function insertSort(array) {
    for (let i = 0;i < array.length - 1; i++) {
        // 当前索引左边的元素都是有序的，但是最终位置不确定，为了给更小的元素腾出位置，它们可能会向右移动，当索引到达最右端时排序也就结束了
        for(let j = i+1; j > 0 && less(array[j], array[j -1]); j--) {
            exchange(array, j, j-1);
        }
    }
}

function quickSort(array, start, end) {
    if (end <= start) return;
    let j = partition(array, start, end);
    quickSort(array, start, j -1);
    quickSort(array, j + 1, end);
}

function partition(array, start, end) {
    let i = start;
    let j = end + 1;
    let partitionValue = array[start];

    while(true) {
        while(true) {
            i++;
            if (i >= end) {
                break;
            }
            if (less(partitionValue, array[i])) {
                break;
            }
        }
        while(true) {
            if (j <= start) {
                break;
            }
            if (less(array[j], partitionValue)) {
                break;
            }
            j--;
        }
        if (i >= j) {
            break;
        }
        exchange(array, i, j);
    }
    exchange(array, lo, j);
    return j;
}

function mergeSort(arr, start, end) {
    let mid = start + (end - start) / 2;
    mergeSort(arr, start, mid);
    mergeSort(arr, mid + 1, end);
    merge(arr, start, mid, end);
}

function merge(arr, start, mid, end) {
    let arrBack = [];
    for(let i = 0; i < arr.length; i++) {
        arrBack[i] = arr[i];
    }
    let i = start;
    let j = mid + 1;
    for (let k = 0; k < arr.length; k++) {
        if (i > mid) {
            arr[k] = arrBack[j++];
        }
        if (j > end) {
            arr[k] = arrBack[i++];
        }
        if(less(arrBack[i], arrBack[j])) {
            arr[k] = arrBack[i++];
        } else {  
            arr[k] = arrBack[j++];
        }
    }
}