/**
 * 装饰者模式的定义：在不改变对象自身的基础上，在程序运行期间给对象动态地添加方法。

例如：现有4种型号的自行车分别被定义成一个单独的类，如果给每辆自行车都加上前灯、尾灯、铃铛这3个配件，
如果用类继承的方式，需要创建4*3=12个子类。但如果通过装饰者模式，只需要创建3个类。
装饰者模式适用的场景：原有方法维持不变，在原有方法上再挂载其他方法来满足现有需求；
函数的解耦，将函数拆分成多个可复用的函数，再将拆分出来的函数挂载到某个函数上，实现相同的效果但增强了复用性。
 */

Function.prototype.before = function (beforeFunc) {
    const self = this
    return function() { // 返回原函数和新函数的代理函数
        beforeFunc.apply(this, arguments) // 执行新函数
        return self.apply(this, arguments) // 执行原函数
    }
}

Function.prototype.after = function (afterFunc) {
    const self = this
    return function () {
        const result = self.apply(this, arguments)
        afterFunc.apply(this, arguments)
        return result
    }
}

var func = function() {
    console.log('2');
}
//func1和func3为挂载函数
var func1 = function() {
    console.log('1');
}
var func3 = function() {
    console.log('3');
}
func = func.before(func1).after(func3);
func();
