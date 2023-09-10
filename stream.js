const fs = require('node:fs/promises');



(async()=>{   
const fileHandle = await fs.open('test.txt', 'w');
console.time('process')
for(let i=0; i<1000000; i++){
    await fileHandle.write(Buffer.from(`${i} `))
}
console.timeEnd('process')

})()

