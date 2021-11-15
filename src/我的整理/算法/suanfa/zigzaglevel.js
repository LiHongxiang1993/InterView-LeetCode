
class TreeNode {
    constructor(val) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
}

function printFromTopToBottom(root) {
    let queue = [];
    if (root == null) {
        return queue;
    }
    let result = [];
    queue.push(root);
    while(queue.length > 0) {
        let node = queue.shift();
        result.push(node.val);
        if (node.left) {
            queue.push(node.left);
        }
        if (node.right) {
            queue.push(node.right);
        }
    }
    return result;
}


  
  const root = {
    val: 1,
    left: {
      val: 2,
      left: { val: 4, left: null, right: null },
      right: null,
    },
    right: {
      val: 3,
      left: null,
      right: { val: 5, left: null, right: null },
    },
  };
  
  function zigzagLevelOrder(root) {
      if (!root) {
          return;
      }
      let nowRoot = [root];
      let rootNumber = 1;
      let result = [];
      while(nowRoot.length > 0) {
          let rootValList = [];
          let nextRoot = [];
          rootNumber++;
          for (let i = 0; i < nowRoot.length; i++) {
            if (rootNumber % 2 === 0) {
                rootValList.push(nowRoot[i].val);
            } else {
                rootValList.unshift(nowRoot[i].val);
            }
            if (nowRoot[i].left) {
                nextRoot.push(nowRoot[i].left);
            }
            if (nowRoot[i].right) {
                nextRoot.push(nowRoot[i].right);
            }
          }
          result.push(rootValList);
          nowRoot = nextRoot;
      }
      return result;
  }
  console.log(zigzagLevelOrder(root));
  let a = 12 % 10;
  console.log('a :>> ', a);

  /**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) { val = x; }
 * }
 */