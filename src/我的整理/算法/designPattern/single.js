/**
单例模式的定义：保证一个类仅有一个实例，并提供一个访问它的全局访问点。
实现的方法为先判断实例存在与否，如果存在则直接返回，如果不存在就创建了再返回，这就确保了一个类只有一个实例对象。
适用场景：一个单一对象。比如：弹窗，无论点击多少次，弹窗只应该被创建一次。。 
 */


class User {
    constructor(name) {
        this.name = name
    }

    getName() {
        return this.name
    }

    setName(name) {
        this.name = name
    }
}

const createUser = (function() {
    let instance = null
    return function(name) {
        if (!instance) {
            instance = new User(name)
        }
        return instance
    }
})()

const a = createUser('a')
const b = createUser('b')

console.log('a :>> ', a);
console.log('b :>> ', b);
console.log('a ===b :>> ', a ===b);