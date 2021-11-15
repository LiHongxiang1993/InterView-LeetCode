Function.prototype.myApply = function (contex, args) {
    const symbol = Symbol()
    contex[symbol] = this
    const result = contex[symbol](...args)
    delete context[symbol]
    return result
}

Function.prototype.myCall = function (context) {
    const symbol = Symbol()
    contex[symbol]= this
    const args = Array.from(arguments).slice(1)
    const result = contex[symbol](...args)
    delete contex[symbol]
    return result
}

Function.prototype.myBind = function(context) {
    let self = this
    let args = Array.from(arguments).slice(1)
    return function () {
        const newArgs = Array.from(arguments)
        return self.apply(context, args.concat(newArgs))
    }
}

Function.prototype.myNew = function (func, ...args) {
    const obj = Object.create(func.prototype)
    func.apply(obj, args)
    return obj
}

function Person(name, age) {
    this.name = name
    this.age = age
}

const obj = Function.myNew(Person, 'lichen', 22)

console.log('obj :>> ', obj);

function loadImageAsync(url) {
    return new Promise((resolve, reject) => {
        const image = new Image()
        image.onload = function () {
            resolve(image)
        }
        image.onerror = function () {
            reject(new Error('load failed'))
        }
        image.src = url
    })
}

