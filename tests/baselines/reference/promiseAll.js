//// [promiseAll.ts]
// https://github.com/microsoft/TypeScript/issues/37856

var p = Promise.all([Promise.reject()]).catch(() => [0]);

//// [promiseAll.js]
// https://github.com/microsoft/TypeScript/issues/37856
var p = Promise.all([Promise.reject()]).catch(() => [0]);
