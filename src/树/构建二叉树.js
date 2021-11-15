
// 描述
// 给定节点数为 n 二叉树的前序遍历和中序遍历结果，请重建出该二叉树并返回它的头结点。
// 例如输入前序遍历序列{1,2,4,7,3,5,6,8}和中序遍历序列{4,7,2,1,5,3,8,6}，则重建出如下图所示。

// 思路
// 先序遍历和中序遍历中，左、根部分的长度是一样的，所以，只要找到中序遍历的左、根部分，先序遍历的左、根部分也知道了。

// 先序遍历，遍历的第一个元素肯定是根节点，找到根节点在中序遍历中的索引，由于根节点就是一个元素，那么根节点左边的都是左部分，根节点右边的都是右部分。

// 这样，中序遍历的左、根、右部分都找到了，那么，先序遍历的左、根、右部分也求出来了。

// 由于先序遍历的左、右部分内也是先序遍历，所以递归构建即可，中序遍历同理。

const buildTree = (preorder, inorder) => {
    if (preorder.length === 0) return null;
    if (preorder === 1) return new TreeNode(preorder[0]);
    // 先序遍历的第一个就是根节点
    let rootVal = preorder[0];
    // 找到根节点在中序遍历中的索引
    let index = inorder.indexOf(rootVal);
    // 先序左子树
    let preLeft = preorder.slice(1, index + 1);
    // 先序右子树
    let preRight = preorder.slice(index + 1);
    // 中序左子树
    let inLeft = inorder.slice(0, index);
    // 中序右子树
    let inRight = inorder.slice(index + 1);
    // 构建二叉树
    const node = new TreeNode(rootVal);
    // 递归构建左子树
    node.left = buildTree(preLeft, inLeft);
    // 递归构建右子树
    node.right = buildTree(preRight, inRight);
    return node;
};

