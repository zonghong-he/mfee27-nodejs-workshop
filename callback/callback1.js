function doWork(job, timer) {
    return new Promise((resolve, reject) => {
        // reject("error")
        setTimeout(() => {
            let date = new Date()
            resolve(`完成${job},時間: ${date.toTimeString()}`)
            console.log(`完成${job},時間: ${date.toTimeString()}`);
        }, timer);
    })

}

let date = new Date()
console.log(date.toTimeString())


// doWork("eat", 1000).then(() => {
//     return doWork("bush", 3000)
// })
// .then(() => {
//     return doWork("sleep", 5000)
// }).catch((err)=>{
//     console.log(err)
// })

async function test(){
    await doWork("test",1000)
}

