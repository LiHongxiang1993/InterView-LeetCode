/**
 * 
最长连续序列
给定一个未排序的整数数组 nums ，找出数字连续的最长序列（不要求序列元素在原数组中连续）的长度。

请你设计并实现时间复杂度为 O(n) 的算法解决此问题。
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
 var longestConsecutive = function(nums) {
    if (!nums || nums.length === 0) {
        return 0
    }
    nums.sort((a, b) => a - b)
    nums = Array.from(new Set(nums))
    let result = 1
    let count = 1
    for(let i = 0; i < nums.length - 1; i++) {
        if (nums[i+1] - nums[i] === 1) {
            count++
        } else {
            count = 1
        }
        result = Math.max(result, count)
    }
    return result
};