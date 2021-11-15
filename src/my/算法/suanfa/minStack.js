let MinStack = function() {
    this.stack = []
    this.min_stack = [Infinity]
}

MinStack.prototype.push = function(val) {
    this.stack.push(val)
    this.min_stack.push(Math.min(val, this.getMin()))
}

MinStack.prototype.pop = function() {
    const value = this.stack.pop()
    this.min_stack.pop()
    return value
}

MinStack.prototype.top = function() {
    return this.stack[this.stack.length - 1]
}


MinStack.prototype.getMin = function() {
    return this.min_stack[this.min_stack.length - 1]
}