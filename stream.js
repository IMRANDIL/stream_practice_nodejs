// const fs = require('node:fs/promises');



// (async()=>{   
// const fileHandle = await fs.open('test.txt', 'w');
// console.time('process')
// for(let i=0; i<1000000; i++){
//     await fileHandle.write(`${i} `)
// }
// console.timeEnd('process')

// })()


// const fs = require('fs');


// (async()=>{

// fs.open('test.txt', 'w', (err, fd)=>{
//     console.time('process')
// for(let i = 0; i<1000000; i++){
//     fs.writeSync(fd, `${i} `)
// }
// console.timeEnd('process')
// })

// })()




//streams gpt way>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


// const fs = require('node:fs/promises');

// let i = 0;
// const totalRecords = 1000000;
// const batchSize = 10000; // Adjust this as needed

// const writeStream = async (stream) => {
//   while (i < totalRecords) {
//     for (let j = 0; j < batchSize && i < totalRecords; j++) {
//       const buff = Buffer.from(` ${i} `, 'utf-8');
//       i++;
//       if (!stream.write(buff)) {
//         // If the stream is not writable, pause and wait for 'drain' event
//         await new Promise((resolve) => stream.once('drain', resolve));
//       }
//     }
//   }
// };

// (async () => {
//   console.time('process');
//   const fileHandle = await fs.open('test.txt', 'w');
//   const stream = fileHandle.createWriteStream();

//   stream.on('finish', () => {
//     console.timeEnd('process');
//     fileHandle.close()
//   });

//   await writeStream(stream);
//   stream.end(); // Close the stream when done writing
// })();





//streams starts now>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

const fs = require('node:fs/promises');

(async()=>{   
    console.time('process')
const fileHandle = await fs.open('test.txt', 'w');

const stream = fileHandle.createWriteStream();
let i =0;

const writeStream = ()=>{
    while( i<1000000){
        const buff = Buffer.from(` ${i} `, 'utf-8');
      
        if (i === 999999){
           return stream.end(buff)
        }
        if(!stream.write(buff)) break;
       

        i++;
       
        
    }
}

writeStream();

stream.on('drain', ()=>{
    writeStream()
})

stream.on('finish', ()=>{
    console.timeEnd('process')
    fileHandle.close()
})


})()