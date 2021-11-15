

const timeMap = {}
let id = 0

function mySetInterval(callback, delay) {
    id++
    let timerId = id
    function fn() {
        callback()
        timeMap[timerId] = setTimeout(() => {
            fn()
            clearTimeout(timeMap[timerId])
        }, delay)
    }
    timeMap[timerId] = setTimeout(fn, delay)
    return timerId
}

function myClearInterval(timerId) {
    clearTimeout(timeMap[timerId])
    delete timeMap[id]
}