//// [tests/cases/compiler/systemModule7.ts] ////

//// [systemModule7.ts]
// filename: instantiatedModule.ts
export module M {
    var x = 1;
}

// filename: nonInstantiatedModule.ts
export module M {
    interface I {}
}

//// [systemModule7.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.M = void 0;
// filename: instantiatedModule.ts
var M;
// filename: instantiatedModule.ts
(function (M) {
    var x = 1;
})(M || (exports.M = M = {}));
