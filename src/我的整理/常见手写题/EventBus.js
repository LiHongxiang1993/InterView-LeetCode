class EventBus {
    constructor() {
        this.cache = {}
    }

    on(eventName, fn) {
        if (this.cache[eventName]) {
            this.cache[eventName].push(fn)
        } else {
            this.cache[eventName] = [fn]
        }
    }

    emit(eventName) {
        if (this.cache[eventName]) {
            // 创建副本，如果回调函数内继续注册相同事件，会造成死循环
            const tasks = this.cache[eventName].slice()
            for(let task of tasks) {
                task()
            }
        }
    }

    emit(name, once = false) {
        if (this.cache[name]) {
          // 创建副本，如果回调函数内继续注册相同事件，会造成死循环
          const tasks = this.cache[name].slice()
          for (let fn of tasks) {
            fn();
          }
          if (once) {
            delete this.cache[name]
          }
        }
    }
    
    off(name, fn) {
        const tasks = this.cache[name]
        if (tasks) {
          const index = tasks.findIndex((f) => f === fn || f.callback === fn)
          if (index >= 0) {
            tasks.splice(index, 1)
          }
        }
    }
}