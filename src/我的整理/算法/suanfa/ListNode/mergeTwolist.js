var sortList = function(head) {
    return mergeSortRec(head)
};

var mergeSortRec = function (head) {
   if(!head || !head.next) {
       return head
   }

   // 获取中间节点
   let middle = findMiddle(head)
   // 分裂成两个链表
   let temp = middle.next
   middle.next = null
   let left = head, right = temp
   // 继续分裂（递归分裂）
   left = mergeSortRec(left)
   right = mergeSortRec(right)
   // 合并两个有序链表
   return mergeTwoLists(left, right)
}



var findMiddle = function(head) {
   let fast = head, slow = head
   while(fast && fast.next && fast.next.next) {
       slow = slow.next
       fast = fast.next.next
   }
   return slow

}
var mergeTwoList = function (l1, l2) {
   let pre = new ListNode(-1);
   let cur = pre;
   while(l1 && l2) {
       if (l1.val < l2.val) {
           cur.next = l1;
           l1 = l1.next;
       } else {
           cur.next = l2;
           l2 = l2.next;
       }
       cur = cur.next;
   }
   cur.next = l1 || l2;
   return pre.next;
}