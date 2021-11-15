/**
 * 
对于下标 ii，下雨后水能到达的最大高度等于下标 ii 两边的最大高度的最小值，
下标 ii 处能接的雨水量等于下标 ii 处的水能到达的最大高度减去 height[i]。
 */
var trap = function(height) {
    const n = height.length;
    if (n == 0) {
        return 0;
    }

    const leftMax = new Array(n).fill(0);
    leftMax[0] = height[0];
    for (let i = 1; i < n; ++i) {
        leftMax[i] = Math.max(leftMax[i - 1], height[i]);
    }

    const rightMax = new Array(n).fill(0);
    rightMax[n - 1] = height[n - 1];
    for (let i = n - 2; i >= 0; --i) {
        rightMax[i] = Math.max(rightMax[i + 1], height[i]);
    }

    let ans = 0;
    for (let i = 0; i < n; ++i) {
        ans += Math.min(leftMax[i], rightMax[i]) - height[i];
        console.log('ans :>> ', ans);
    }
    return ans;
};

const res = trap([0,1,0,2,1,0,1,3,2,1,2,1])
console.log('res :>> ', res);