// 6. webpack 的热更新原理大概介绍一下

// 本地起服务，通过文件内容 hash 来判断是否更新，客户端收到更新消息后会取拉取最新代码进行更新

function isVisible(el) {
    const position = el.getBoundingClientRect()
    const clientHeight = document.documentElement.clientHeight
    const topVisible = position.top > 0 && position.top < clientHeight
    const bottomVisible = position.bottom > 0 && position.bottom < clientHeight
    return topVisible || bottomVisible
}

function lazyLoadImage() {
    const images = document.querySelectorAll('img')
    for (const image of images) {
        const realSrc = image.dataset.src
        if (!realSrc) continue
        if(isVisible(image)) {
            image.src = realSrc
            image.dataset.src = ''
        }
    }
}

window.addEventListener('scroll', lazyLoadImage)