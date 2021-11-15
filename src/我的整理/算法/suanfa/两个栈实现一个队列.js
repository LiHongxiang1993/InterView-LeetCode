
/**
 * 用两个栈实现一个队列。队列的声明如下，请实现它的两个函数 appendTail 和 deleteHead ，
 * 分别完成在队列尾部插入整数和在队列头部删除整数的功能。(若队列中没有元素，deleteHead 操作返回 -1 )

 */

var CQueue = function() {
    this.stack1 = [];
    this.stack2 = [];
};

CQueue.prototype.appendTail = function(value) {
    this.stack1.push(value);
};

CQueue.prototype.deleteHead = function() {
    while (!stack1.isEmpty()) {
        let node = stack1.pop();
        stack2.push(node);
    }
    let first = stack2.pop();
    while (!stack2.isEmpty()) {
        let node=stack2.pop();
        stack1.push(node);
    }
    return first;  
};
