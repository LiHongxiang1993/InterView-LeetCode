/**
 * 
其中 lson 和rson 分别代表 xx 节点的左孩子和右孩子。初看可能会感觉条件判断有点复杂，
我们来一条条看，(lson && rson)说明左子树和右子树均包含 p 节点或 q 节点，
如果左子树包含的是 p 节点，那么右子树只能包含 q 节点，反之亦然，因为 p 节点和 q 节点都是不同且唯一的节点，
因此如果满足这个判断条件即可说明 x 就是我们要找的最近公共祖先。
再来看第二条判断条件，这个判断条件即是考虑了 x 恰好是 p 节点或 q 节点
且它的左子树或右子树有一个包含了另一个节点的情况，因此如果满足这个判断条件亦可说明 x 就是我们要找的最近公共祖先

你可能会疑惑这样找出来的公共祖先深度是否是最大的。
其实是最大的，因为我们是自底向上从叶子节点开始更新的，
所以在所有满足条件的公共祖先中一定是深度最大的祖先先被访问到
 */


var lowestCommonAncestor = function(root, p, q) {
    let ans;
    const dfs = (root, p, q) => {
        if (root === null) return false;
        const lson = dfs(root.left, p, q);
        const rson = dfs(root.right, p, q);
        if ((lson && rson) || ((root.val === p.val || root.val === q.val) && (lson || rson))) {
            ans = root;
        } 
        return lson || rson || (root.val === p.val || root.val === q.val);
    }
    dfs(root, p, q);
    return ans;
};
