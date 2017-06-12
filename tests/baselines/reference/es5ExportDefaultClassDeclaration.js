//// [es5ExportDefaultClassDeclaration.ts]
export default class C {
    method() { }
}


//// [es5ExportDefaultClassDeclaration.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var C = (function () {
    function C() {
    }
    var proto_1 = C.prototype;
    proto_1.method = function () { };
    return C;
}());
exports.default = C;


//// [es5ExportDefaultClassDeclaration.d.ts]
export default class C {
    method(): void;
}
