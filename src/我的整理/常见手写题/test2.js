// es5实现继承
function create(proto) {
  function F() { }
  F.prototype = proto;
  return new F();
}

function Parent(name) {
  this.name = name;
}

Parent.prototype.sayName = function () {
  console.log('this.name :>> ', this.name);
}

function Child(age, name) {
  Parent.call(this, name);
  this.age = age;
}

Child.prototype = create(Parent.prototype);

Child.prototype.constructor = Child;

Child.prototype.sayAge = function () {
  console.log('this.age :>> ', this.age);
}

let child = new Child(12, 'jack');
child.sayName();
child.sayAge();

// instanceOf 实现
function isInstanceOf(obj, klass) {
  let prototype = klass.prototype;
  let proto = obj._proto_;
  while (true) {
    if (proto === null) return false;
    if (proto === prototype) return true;
    proto = proto._proto_;
  }
}

// js分为函数对象和普通对象，每个对象都拥有_proto_属性，只有函数对象拥有 prototype属性

// 属性_proto_是一个对象，它有两个属性，constructor与_proto_

// 原型对象prototype有一个默认的 constructor属性，用于记录实例是由哪个构造函数创建

// Object、Function、Array、Boolean、Number、String等都是js内置的函数

// Object.assign实现
Object.defineProperty(Object, 'assign', {
  value: function (target, ...args) {
    if (target == null) {
      return new TypeError('cannot convert');
    }
    // 将目标对象统一转为引用数据类型
    const to = Object(target);
    for (let i = 0; i < args.length; i++) {
      let sourceObj = args[i];
      if (sourceObj != null) {
        for (let key in sourceObj) {
          // hasOwnProperty方法会忽略从原型链上继承到的属性
          if (Object.prototype.hasOwnProperty.call(sourceObj, key)) {
            to[key] = sourceObj[key];
          }
        }
      }
    }
    return to;
  },
  writable: true,
  configurable: true,
  enumerable: false
})

