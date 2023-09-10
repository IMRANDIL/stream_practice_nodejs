const fs = require('node:fs/promises');
const { Worker, isMainThread, parentPort, workerData } = require('node:worker_threads');

const batchSize = 10000;
const totalRecords = 1000000;
const numWorkers = 4; // Adjust this based on your CPU cores

(async () => {
  if (isMainThread) {
    console.time('process');
    const fileHandle = await fs.open('test.txt', 'w');
    const workers = [];
    let recordsWritten = 0;

    for (let i = 0; i < numWorkers; i++) {
      const start = i * (totalRecords / numWorkers);
      const end = (i + 1) * (totalRecords / numWorkers);
      workers.push(new Worker(__filename, { workerData: { start, end } }));
    }

    for (const worker of workers) {
      worker.on('message', () => {
        recordsWritten += batchSize;
        if (recordsWritten >= totalRecords) {
          fileHandle.close().then(() => {
            console.timeEnd('process');
          });
        }
      });
    }
  } else {
    const { start, end } = workerData;
    const fileHandle = await fs.open('test.txt', 'a');

    for (let i = start; i < end; i += batchSize) {
      const data = [];
      for (let j = i; j < Math.min(i + batchSize, end); j++) {
        data.push(`${j} `);
      }
      await fileHandle.write(Buffer.from(data.join('')));
    }

    await fileHandle.close();
    parentPort.postMessage('done');
  }
})();




