//// [throwType_identifier.ts]
declare const name: throw 'please use window.name'
console.log(name, 123, window.name)
export {}

//// [throwType_identifier.js]
"use strict";
exports.__esModule = true;
console.log(name, 123, window.name);
