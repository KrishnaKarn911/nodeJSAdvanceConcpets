const { rejects } = require("assert");
const express = require("express");
const app = express();

const { Worker } = require("worker_threads");

const THREAT_COUNT = 4;

app.get("/nonblocking", (req, res) => {
  res.status(200).send("This is non blocking code");
});

// function createWorker() {
//   return new Promise((resolve, reject) => {
//     const worker = new Worker("./worker.js", {
//       workerData: { thread_count: THREAT_COUNT },
//     });

//     worker.on("message", (data) => {
//       resolve(data);
//     });
//     worker.on("error", (error) => {
//       reject("Error occured: " + error);
//     });
//   });
// }

app.get("/blocking", async (req, res) => {
  const worker = new Worker("./worker.js");
  worker.on("message", (data) => {
    res.status(200).send(`Result is ${data}`);
  });
  worker.on("error", (error) => {
    res.status(404).send("Error occured: " + error);
  });
  // const workerPromises = [];
  // for (let i = 0; i < THREAT_COUNT; i++) {
  //   workerPromises.push(createWorker());
  // }
  // const thread_results = await Promise.all(workerPromises);
  // const total =
  //   thread_results[0] +
  //   thread_results[1] +
  //   thread_results[3] +
  //   thread_results[2];
  // res.status(200).send(`Results = ${total}`);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log("The server started and running in port: " + PORT);
});
