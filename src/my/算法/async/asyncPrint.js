




const awaitPrint = (a) => new Promise(function(resolve, reject){
    setTimeout(() => {
        console.log('a :>> ', a);
        resolve(a);
    }, 1000);
});


function serialPrint(arr) {
    arr.reduce((task, curItem) => task.then(val => awaitPrint(curItem)), Promise.resolve(0));
}

(async () => {
    console.log('running :>> ', 'running');
    serialPrint([1, 2, 3]);
    console.log('end :>> ', 'end');
})()