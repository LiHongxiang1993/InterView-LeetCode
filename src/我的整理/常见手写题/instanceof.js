
// instanceof 用于检测 构造函数的prototype属性是否出现在某个实例对象的原型链上
function myInstanceof(left, right) {
    if (typeof left !== 'object' || left == null) {
        return false
    }
    let proto = Reflect.getPrototypeOf(left)
    while(true) {
        if (proto === null) {
            return false
        }
        if (proto === right.prototype) {
            return true
        }
        proto = Reflect.getPrototypeOf(proto)
    }
}

// 寄生组合继承

function Parent() {
    this.name = 'parent'
}

function Child() {
    Parent.call(this)
    this.type = 'child'
}

Child.prototype = Object.create(Parent.prototype)
Child.prototype.constructor = Child


// ====================================================
Child._proto_ = Function.prototype // Child 本质上是Function的实例
Object._proto_ = Function.prototype

Child.prototype._proto_ = Object.prototype // Child.prototype本质也是普通对象
Object.prototype._proto_ = null // 原型链到此为止