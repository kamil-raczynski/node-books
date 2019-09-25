setTimeout(() => console.log("timeout"), 0);
Promise.resolve(1).then(() => console.log("promise")); //
process.nextTick(() => console.log("nextTick"));