
// 组合继承

function SuperType(name) {
    this.name = name
    this.colors = ['red']
}

SuperType.prototype.sayName = function() {
    console.log('this.name :>> ', this.name);
}
function SubType(name, age) {
    // 借用构造函数实现对实例属性的继承
    SuperType.call(this, name)
    this.age = age
}

// 借用原型链实现对原型属性和方法的继承
SubType.prototype = new SuperType()
SubType.prototype.constructor = SubType
