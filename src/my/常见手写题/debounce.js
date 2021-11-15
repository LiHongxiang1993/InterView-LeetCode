
// 在事件被触发n秒后再执行回调，如果在这n秒内又被触发，则重新计时。
function debounce(func, delay, immediate) {
    let timer = null
    return function() {
        clearTimeout(timer)
        if (immediate) {
            let callNow = !timer
            timer = setTimeout(() => {
                timer = null
            }, delay);
            if (callNow) {
                func.apply(this, Array.from(arguments))
            }
        } else {
            timer = setTimeout(() => {
                func.apply(this, Array.from(arguments))
            }, delay)
        }
    }
}

// 规定在一个单位时间内，只能触发一次函数。如果这个单位时间内触发多次函数，只有一次生效。
function throttle(func, delay) {
    let flag = true
    return function() {
        if (!flag) return
        flag = false
        setTimeout(() => {
            func.apply(this, Array.from(arguments))
            flag = true
        }, delay)
    }
}

function throttle(func, delay) {
    let pre = 0
    return function() {
        let now = new Date().getTime()
        if (now - pre > delay) {
            func.apply(this, Array.from(arguments))
            pre = now
        }
    }
}