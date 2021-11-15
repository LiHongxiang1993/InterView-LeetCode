let LRUCache = function(capacity) {
    this.capacity =capacity;
    this.stack = [];
    this.secretKey = {};
}

LRUCache.prototype.get = function(key) {
    if (key in this.secretKey) {
        this.stack.splice(this.stack.indexOf(this.key), 1);
        this.stack.unshift(key);
        return this.secretKey[key];
    }  
    return -1;
}

LRUCache.prototype.put = function(key, value) {
    if (key in this.secretKey) {
        this.secretKey[key] = value;
        this.stack.splice(this.stack.indexOf(key), 1);
        this.stack.unshift(key);
    }
    else if (this.stack.length < this.capacity) {
        this.secretKey[key] = value;
        this.stack.unshift(key);
    } else {
        delete this.secretKeyp[this.stack.pop()];
        this.secretKey[key] = value;
        this.stack.unshift(key);
    }
}

// 一个Map对象在迭代时会根据对象中元素的插入顺序来进行
// 新添加的元素会被插入到map的末尾，整个栈倒序查看
class LRUCache{
    constructor(capacity) {
        this.capacity = capacity;
        this.secretKey = new Map();
    }

    get(key) {
        if (this.secretKey.has(key)) {
            let value = this.secretKey.get(key);
            this.secretKey.delete(key);
            this.secretKey.set(key, value);
            return value;
        } else {
            return -1;
        }
    }

    set(key, value) {
        if (this.secretKey.has(key)) {
            this.secretKey.delete(key);
            this.secretKey.set(key, value);
        } else if (this.secretKey.size() < this.capacity) {
            this.secretKey.set(key, value);
        } else {
            this.secretKey.set(key, value);
            //  删除map的第一个元素，即为最长未使用的
            this.secretKey.delete(this.secretKey.keys().next().value)
        }
    }
}


var LRUCache = function(capacity) {
    this.map = new Map()
    this.capacity = capacity
};

/** 
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function(key) {
    if (this.map.has(key)) {
        const value = this.map.get(key)
        this.map.delete(key)
        this.map.set(key, value)
        return value
    }
    return -1
};

/** 
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function(key, value) {
    if (this.map.has(key)) {
        this.map.delete(key)
    } else {
        if (this.map.size === this.capacity) {
            // 获取到Map中第一个数据的key值，即最近最少访问的key，删之
            const delKey = this.cache.keys().next().value;
            this.map.delete(delKey);
        }
    }
    this.map.set(key, value)
}