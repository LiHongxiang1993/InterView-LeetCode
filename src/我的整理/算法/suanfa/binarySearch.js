

const findIndex = (arr, target) => {
    let leftIndex = 0
    let rightIndex = arr.length - 1
    while(leftIndex <= rightIndex) {
        let mid = Math.floor((leftIndex + rightIndex) / 2)
        if(target < arr[mid]) {
            rightIndex = mid - 1
        } else if(target > arr[mid]) {
            leftIndex = mid + 1
        } else {
            return mid
        }
    }
    return -1
}