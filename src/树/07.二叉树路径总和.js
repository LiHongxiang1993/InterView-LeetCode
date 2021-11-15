/**
 * 给你二叉树的根节点 root 和一个表示目标和的整数 targetSum ，判断该树中是否存在 根节点到叶子节点 的路径，这条路径上所有节点值相加等于目标和 targetSum 。
 * 叶子节点 是指没有子节点的节点。
 * https://leetcode-cn.com/problems/path-sum
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} targetSum
 * @return {boolean}
 */
 var hasPathSum = function(root, targetSum) {
    let isExist = false
    const dfs = (node, sum) => {
        if(!node) return 0
        let value = node.val + sum
        if(targetSum === value && (!node.left && !node.right)) isExist = true
        dfs(node.left, value)
        dfs(node.right, value)
    }

    dfs(root, 0)
    return isExist
};

// JZ34 二叉树中和为某一值的路径
var pathSum = function (root, target) {
    let res = [],
        path = [];
    function DFS(root, sum) {
        if (!root) return;
        path.push(root.val);
        sum += root.val
        // 最优解特殊处理，其他节点保持一致。
        if (!root.left && !root.right && sum === target) {
            res.push([...path]);
        }
        DFS(root.left, sum + root.val);
        DFS(root.right, sum + root.val);
        // 向上回溯，stack弹出一个节点
        path.pop();
    }

    DFS(root, 0);
    return res;
};


/**
 * @param {TreeNode} root
 * @param {number} target
 * @return {number[][]}
 */
 var pathSum = function(root, target) {
    const res = [];
    const path = [];

    if(!root) {
        return []
    }

    function findPath(root, target) {
        if(root.left) {
            path.push(root.val);
            findPath(root.left, target - root.val)
            path.pop()
        }
        if(root.right) {
            path.push(root.val);
            findPath(root.right, target - root.val)
            path.pop()
        }
        if(!root.left && !root.right) {
            // 找到了一条路径
            if(target === root.val) {
                path.push(root.val);
                // 注意这里是 path 的拷贝
                res.push(path.slice())
                path.pop();
            }
            return;
        }
    }

    findPath(root, target);

    return res
};
