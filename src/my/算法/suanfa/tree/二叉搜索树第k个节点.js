/**
 * 
 给定一棵结点数为 n 二叉搜索树，请找出其中的第 k 小的TreeNode结点。
 */

function findNode(root, k) {
    if (root==null || k<=0) {
        return null
    }
    let count = 0
    let stack = []
    let node = root
    while (!stack.isEmpty() || node !== null){
        if (node !== null) {
            stack.push(node)
            node=node.left
        } else {
            node = stack.pop()
            count++
            if (count ===k) {
                return node
            }
            node = node.right
        }
    }
    return null
}