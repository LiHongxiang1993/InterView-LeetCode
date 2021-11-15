
/**
 * 景分析
常见需要短时间请求多个同类型资源的场景就是资源懒加载的时候

如:一个文章列表的中,获取每个展示文章点赞/评论数是单独的一个接口
当一次性需要展示多条新闻,那么就要发起多个查询点赞/评论的请求

后端为了减少处理请求的压力,通常会让一个接口支持同时查询多条数据的能力
考点

怎么确定这个短时间是多久?

其实这里就是考察到了event loop,这个短时间就是指同一个周期内,然后就变成了合并同一个周期内的请求,
如何保证在一个周期内,这里就可以用到防抖,让请求在执行宏任务的时候发出


如何让每个方法拿到自己需要的数据?

这里可以在方法内部用一个map将每个方法的Promise的resolve存起来,每个方法传参的id作为key,
在接口响应后,将对应数据通过key取出,然后从map中取出对应Promise的resolve然后执行resolve(data[id])即可



需要考虑的问题

如果多个请求参数是一样的那么,最终请求的参数只有一个

如 连续调用两次 getArticle(3)
那么 请求的query依旧是 {id:'3'}而不是 {id:'3,3'}
并且这两个请求的方法都需要得到响应


如果这个请求没有被按时响应,不能影响下一次发送
 */
var getArticle = (function () {
    let timer = null;
    let resolveMap = new Map();
    return function (id) {
        return new Promise((resolve) => {
            // 这里用string类型作为key
            const key = `${id}`;
            const resolves = resolveMap.get(key);

            // 不存在则创建,因为可能有重复的id,所以这里value为数组
            if (!resolves) {
                resolveMap.set(key, [resolve]);
            } else {
                // 存在则加入,因为是对象,map里存的引用,所以这里不需要重新执行set
                resolves.push(resolve)
            }

            if (timer) {
                clearTimeout(timer)
            }
            timer = setTimeout(() => {
                // 这里将把请求发出去,需要重置状态
                // 所以将现有的保存下来
                const _resolvesMap = resolveMap

                const keys = [..._resolvesMap.keys()]
                request({
                    url: '/path',
                    query: keys.join(',')
                }).then(res => {
                    const { data } = res
                    // 执行resolve
                    for (const key of keys) {
                        const resolves = _resolvesMap.get(key)
                        const v = data[key]
                        resolves.forEach(r => r(v))
                    }
                })


                // 请求发出后就初始化,以便用于下次请求
                timer = null;
                resolveMap = new Map();
            })
        });
    };
})();
