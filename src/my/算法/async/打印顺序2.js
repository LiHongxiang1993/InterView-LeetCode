  /**
   * 第二题
   */
// Promise.resolve().then(() => {
//     console.log(1);
// }).catch(() => {
//     console.log(2);
// }).then(val => {
//     console.log(val);
// })


  new Promise((resolve, reject) => {
    console.log('1');
    resolve();
  }).then(() => {
    console.log('2');
    new Promise((resolve, reject) => {
      console.log('3');
      resolve();
    }).then(() => {
      console.log('4');
    }).then(() => {
      console.log('5');
    })
  }).then(() => {
    console.log('6');
  })
  
  new Promise((resolve, reject) => {
    console.log('7');
    resolve()
  }).then(() => {        
    console.log('8');
  })
  
