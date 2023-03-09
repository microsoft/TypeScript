//// [tests/cases/compiler/externalModuleResolution2.ts] ////

//// [foo.ts]
module M2 {
    export var X = 1;
}
export = M2

//// [foo.d.ts]
declare module M1 {
    export var Y:number;
}
export = M1


//// [consumer.ts]
import x = require('./foo');
x.X // .ts should be picked

//// [foo.js]
"use strict";
var M2;
(function (M2) {
    M2.X = 1;
})(M2 || (M2 = {}));
module.exports = M2;
//// [consumer.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var x = require("./foo");
x.X; // .ts should be picked
