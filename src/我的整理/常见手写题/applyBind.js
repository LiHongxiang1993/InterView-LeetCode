const { delete } = require("vue/types/umd");

Function.prototype.myApply = function (context, args) {
  let symbol = Symbol();
  context[symbol] = this;
  let result = context[symbol](args);
  delete context[symbol];
  return result;
}


Function.prototype.myBind = function(context) {
  let self = this
  let args = Array.from(arguments).slice(1)
  return function () {
      const newArgs = Array.from(arguments)
      return self.apply(context, args.concat(newArgs))
  }
}
Function.prototype.myApply1 = function (context, args) {
  let symbol = Symbol()
  context[symbol] = this
  const result = context[symbol](...args)
  delete context[symbol]
  return result
}

function myNew(func, ...args) {
  const obj = Object.create(func.prototype);
  func.apply(obj, args);
  return obj;
}


function Person(name, age) {
  this.name = name;
  this.age = age;
}

let person = myNew(Person, 'li', 22);

console.log('person :>> ', person);

function myApply(context, arr) {
  let symbol = Symbol();
  context[symbol] = this;
  let res = context[symbol](...arr);
  delete context[symbol];
  return res;
}

Function.prototype.myBind = function () {
  let self = this;
  let context = [].shift.call(arguments);
  let args1 = [].slice.call(arguments);
  return function () {
    let args2 = [].slice.call[arguments];
    return self.apply(context, args1.concat(args2));
  }
  
}