// const fs = require('node:fs/promises');



// (async()=>{   
// const fileHandle = await fs.open('test.txt', 'w');
// console.time('process')
// for(let i=0; i<1000000; i++){
//     await fileHandle.write(`${i} `)
// }
// console.timeEnd('process')

// })()


const fs = require('fs');


(async()=>{

fs.open('test.txt', 'w', (err, fd)=>{
    console.time('process')
for(let i = 0; i<1000000; i++){
    fs.writeSync(fd, `${i} `)
}
console.timeEnd('process')
})

})()
