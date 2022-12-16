//// [tests/cases/compiler/externalModuleResolution.ts] ////

//// [foo.d.ts]
declare module M1 {
    export var X:number;
}
export = M1

//// [foo.ts]
module M2 {
    export var Y = 1;
}
export = M2

//// [consumer.ts]
import x = require('./foo');
x.Y // .ts should be picked

//// [foo.js]
"use strict";
var M2;
(function (M2) {
    M2.Y = 1;
})(M2 || (M2 = {}));
module.exports = M2;
//// [consumer.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var x = require("./foo");
x.Y; // .ts should be picked
