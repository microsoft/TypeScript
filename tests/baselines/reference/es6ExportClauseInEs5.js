//// [tests/cases/compiler/es6ExportClauseInEs5.ts] ////

//// [server.ts]
class c {
}
interface i {
}
module m {
    export var x = 10;
}
var x = 10;
module uninstantiated {
}
export { c };
export { c as c2 };
export { i, m as instantiatedModule };
export { uninstantiated };
export { x };

//// [server.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = exports.instantiatedModule = exports.c2 = exports.c = void 0;
var c = /** @class */ (function () {
    function c() {
    }
    return c;
}());
exports.c = c;
exports.c2 = c;
var m;
(function (m) {
    m.x = 10;
})(m || (exports.instantiatedModule = m = {}));
var x = 10;
exports.x = x;


//// [server.d.ts]
declare class c {
}
interface i {
}
declare namespace m {
    var x: number;
}
declare var x: number;
declare namespace uninstantiated {
}
export { c };
export { c as c2 };
export { i, m as instantiatedModule };
export { uninstantiated };
export { x };
