const obserList = new Set()

const observe = fun => obserList.add(fun)

const observable = obj => new Proxy(obj, {
    set: (target, key, value, receiver) => {
        const result = Reflect.set(target, key, value, receiver)
        obserList.forEach(fun => fun())
        return result
    }
})

const person = observable({
    name: 'li',
    age: 22
})

function print() {
    console.log('person.name :>> ', person.name);
}

observe(print)

person.name = 'chen'