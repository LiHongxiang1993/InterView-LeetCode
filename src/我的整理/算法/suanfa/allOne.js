

class ListNode{
    constructor(val, key){
        this.val = val;
        this.key = key;
        this.pre = null;
        this.next = null;
    }
}

class DLinkList{
    constructor(){
        this.head = new ListNode(null, null);
        this.tail = new ListNode(null, null);
        this.head.next = this.tail;
        this.tail.pre = this.head;
        this.size = 0;
    }
    addAtHead(val, key){
        let newListNode = new ListNode(val, key);
        this.head.next.pre = newListNode;
        newListNode.pre = this.head;
        newListNode.next = this.head.next;
        this.head.next = newListNode;
        this.size++;
        return newListNode;
    }
    addAtTail(val, key){
        let newListNode = new ListNode(val, key);
        this.tail.pre.next = newListNode;
        newListNode.pre = this.tail.pre;
        newListNode.next = this.tail;
        this.tail.pre = newListNode;
        this.size++;
        return newListNode;
    }
    deleteNode(node){
        node.pre.next = node.next;
        node.next.pre = node.pre;
        this.size--;
    }
}


/**
 * Initialize your data structure here.
 */
var AllOne = function() {
    //存储key到链表节点地址的映射 value => node;
    this.map = new Map();
    //存储同一value值的到链表的头尾节点地址的映射数组value => [head, tail];
    this.valMap = new Map();
    //维护递增的双向链表
    this.list = new DLinkList();
};

/**
 *  inc()
 *  查key映射表
 *      1.如果有的话通过value映射表获取当前的头尾节点数组，在尾节点处加入该节点；
 *        如果移除的节点是尾节点，同时更新当前尾节点（头尾节点相同移除当前映射关系）；
 *        当前数值加1, 然后更新当前值的value映射表更新，如果有更新其头节点，如果没有创建，头尾节点都指向当前节点
 *      2.没有key的话做添加操作 
 */
AllOne.prototype.inc = function(key) {
    if(this.map.has(key)){
        let node = this.map.get(key),
            thisNodeArray = this.valMap.get(node.val);
        node.val += 1;
        //如果当前节点不是尾节点，插入尾节点之后
        if(node != thisNodeArray[1]){
            let temp = thisNodeArray[1];
            node.next.pre = node.pre;
            node.pre.next = node.next;
            temp.next.pre = node;
            node.next = temp.next;
            temp.next = node;
            node.pre = temp;
        }
        //有且只有一个节点 head == node == tail;
        if(thisNodeArray[0] == thisNodeArray[1]){
            this.valMap.delete(node.val);
        }else{
            //node是头节点 head == node
            if(node == thisNodeArray[0]){
                thisNodeArray[0] = thisNodeArray[0].next;
            }
            //node是尾节点 node == tail
            if(node == thisNodeArray[1]){
                thisNodeArray[1] = thisNodeArray[1].pre;
            }
        }
        if(this.valMap.has(node.val)){
            this.valMap.get(node.val)[0] = node;
        }else{
            this.valMap.set(node.val, [node, node]);
        }
    }else{
        let newNode = this.list.addAtHead(1, key);
        //新加入的节点都在之前节点的前面
        if(this.valMap.has(1)){
            this.valMap.get(1)[0] = newNode;
        }else{
            this.valMap.set(1, [newNode, newNode]);
        }
        this.map.set(key, newNode);
    }
};

/**
 *  dec()和inc()的操作基本相反
 */
AllOne.prototype.dec = function(key) {
    if(this.map.has(key)){
        let node =  this.map.get(key),
            thisNodeArray = this.valMap.get(node.val);
        node.val -= 1;
        if(node.val == 0){
            this.list.deleteNode(node);
            this.map.delete(key);
            //节点唯一
            if(thisNodeArray[0] == thisNodeArray[1]){
                this.valMap.delete(node.val);
            }else{
                //node是头节点 head == node
                if(node == thisNodeArray[0]){
                    thisNodeArray[0] = thisNodeArray[0].next;
                }
                //node是尾节点 node == tail
                if(node == thisNodeArray[1]){
                    thisNodeArray[1] = thisNodeArray[1].pre;
                }
            }
        }else{
            if(node != thisNodeArray[0]){
                let temp = thisNodeArray[0];
                node.pre.next = node.next;
                node.next.pre = node.pre;
                temp.pre.next = node;
                node.pre = temp.pre;
                temp.pre = node;
                node.next = temp;
            }
            if(thisNodeArray[0] == thisNodeArray[1]){
                this.valMap.delete(node.val);
            }else{
                //node是头节点 head == node
                if(node == thisNodeArray[0]){
                    thisNodeArray[0] = thisNodeArray[0].next;
                }
                //node是尾节点 node == tail
                if(node == thisNodeArray[1]){
                    thisNodeArray[1] = thisNodeArray[1].pre;
                }
            }
            if(this.valMap.has(node.val)){
                this.valMap.get(node.val)[1] = node;
            }else{
                this.valMap.set(node.val, [node, node]);
            }
        }
    }
};

/**
 * Returns one of the keys with maximal value.
 * @return {string}
 */
AllOne.prototype.getMaxKey = function() {
    if(this.map.size == 0){
        return '';
    }
    return this.list.tail.pre.key;
};

/**
 * Returns one of the keys with Minimal value.
 * @return {string}
 */
AllOne.prototype.getMinKey = function() {
    if(this.map.size == 0){
        return '';
    }
    return this.list.head.next.key;
};

/**
 * Your AllOne object will be instantiated and called as such:
 * var obj = new AllOne()
 * obj.inc(key)
 * obj.dec(key)
 * var param_3 = obj.getMaxKey()
 * var param_4 = obj.getMinKey()
 */
