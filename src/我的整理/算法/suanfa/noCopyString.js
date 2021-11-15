
var lengthOfLongestSubstring = function(s) {
    if(!s) {
        return 0;
    }
    let result = 1;
    let map = new Map();
    let left = 0;
    for(let i = 0; i < s.length; i++) {
        if (map.has(s[i])) {
            left = Math.max(left, map.get(s[i]) + 1);
        }
        map.set(s[i], i);
        result = Math.max(result, i - left + 1);
    }
    return result;
};

let n = lengthOfLongestSubstring('pwwkew')
console.log('n :>> ', n);