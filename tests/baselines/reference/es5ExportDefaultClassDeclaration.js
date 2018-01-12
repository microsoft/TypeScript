//// [es5ExportDefaultClassDeclaration.ts]
export default class C {
    method() { }
}


//// [es5ExportDefaultClassDeclaration.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var C = /** @class */ (function () {
    function C() {
    }
    C.prototype.method = function () { };
    return C;
}());
exports.default = C;


//// [es5ExportDefaultClassDeclaration.d.ts]
export default class C {
    method(): void;
}
