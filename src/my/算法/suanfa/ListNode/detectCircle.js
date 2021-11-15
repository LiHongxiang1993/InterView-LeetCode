
/**
 * 
思路与算法

一个非常直观的思路是：我们遍历链表中的每个节点，并将它记录下来；一旦遇到了此前遍历过的节点，就可以判定链表中存在环。借助哈希表可以很方便地实现。
 */
function detectCircle(head) {
    const visited = new Set()
    while(head !== null) {
        if(visited.has(head)) {
            return head
        }
        visited.add(head)
        head = head.next
    }
    return null
}