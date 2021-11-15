
class Dep {
    constructor() {
        this.subs = [];
    }

    notify () {
        for (let i = 0; i < this.subs.length; i++) {
            this.sub[i].update();
        }
    }

    addSub (sub) {
        this.subs.push(sub);
    }
}


class Watcher {
    // new一个Watcher对象，此时它会指向Dep.target，在render过程触发getter，
    // 把Dep.target添加到依赖队列。这样便完成了依赖的收集。数据改变，通知依赖进行update操作。
    constructor () {
        Dep.target = this
    }
    update () {
        console.log("视图更新啦~"); // 更新视图
    }
}

// let dep = new Dep();
// dep.addSub(new Watcher);


function defineReactive (obj, key, val) {
    const dep = new Dep()
    const property = Object.getOwnPropertyDescriptor(obj, key)

    const getter = property && property.get
    const setter = property && property.set
    Object.defineProperty(obj, key, {
        enumerable: true, // 属性可枚举
        configurable: true,  //属性可被修改或删除
        get() {
            const value = getter ? getter.call(obj) : val
            if (Dep.target) {
                dep.addSub(Dep.target); // 依赖采集
            }
            return value
        },
        set(newVal) {
            const value = getter ? getter.call(obj) : val
            if (newVal === value) {
                return
            }
            if (setter) {
                setter.call(obj, newVal)
            } else {
                val = newVal
            }
            dep.notify()
        }
    })
}

// reactive
function reactive(o) {
    if (o && typeof o === 'object') {
      Object.keys(o).forEach(k => {
        defineReactive(o, k, o[k])
      })
    }
    return o
}

// 测试代码
const data = reactive({
    msg: 'aaa'
})
  
  new Watcher(() => {
    console.log('===> effect', data.msg);
  })
  
  setTimeout(() => {
    data.msg = 'hello'
  }, 1000)
