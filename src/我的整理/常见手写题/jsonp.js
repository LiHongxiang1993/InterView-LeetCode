const { call } = require("file-loader");
const { data } = require("jquery");

function jsonp({ url, params, cb }) {
    return new Promise((resolve, reject) => {
      let script = document.createElement("script");
  
      window[cb] = function(data) {
        resolve(data);
      };
  
      params = { ...params, cb };
  
      let arrs = [];
  
      for (let key in params) {
        arrs.push(`${key}=${params[key]}`);
      }
  
      script.src = `${url}?${arrs.join("&")}`;
  
      document.body.appendChild(script);
    });
}



  jsonp({
    url: "http://localhost:3000/say",
    params: { wd: "haoxl" },
    cb: "show"
  }).then(data => {
    console.log(data);
  });
  
  function jsonp({url, params, cb}) {
      return new Promise((resolve, reject) => {
          let script = document.createElement('script');

          window[cb] = function(data) {
            resolve(data);
          }
          params = {...params, cb};
          let arr = [];
          for(let key in params) {
              arrs.push(`${key}=${params[key]}`);
          }
          script.src= `${url}?${arr.join('&')}`;
          document.body.appendChild(script);
      });
  }

  // 由于<script>元素请求的脚本，直接作为代码运行。
  // 这时，只要浏览器定义了foo函数，该函数就会立即调用。
  // 作为参数的JSON数据被视为JavaScript对象，而不是字符串，因此避免了使用JSON.parse的步骤。
  jsonp({
      url: 'http://localhost:3000/say',
      params: {key: 'value'},
      cb: 'show'
  }).then(data => {
      console.log('data :>> ', data);
  })

  function jsonp(url, params, callback) {
    return new Promise((resolve, reject) => {
      window[callback] = (data) => {
        resolve(data)
      }
      let arr = []
      params = {...params, callback}
      Object.keys(params).forEach(key => {
        arr.push(`${key}=${params[key]}`)
      })
      let script = document.createElement('script')
      script.src = url + '?' + arr.join('&')
      document.body.appendChild(script)
    })
  }