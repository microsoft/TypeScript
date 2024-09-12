const entry = import.meta.resolve("./worker")
const worker = new Worker(entry, {type: "module"});
worker.addEventListener("message", console.log);
