//// [es5ExportDefaultClassDeclaration.ts]

export default class C {
    method() { }
}


//// [es5ExportDefaultClassDeclaration.js]
"use strict";
var C = (function () {
    function C() {
    }
    C.prototype.method = function () { };
    return C;
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = C;


//// [es5ExportDefaultClassDeclaration.d.ts]
export default class C {
    method(): void;
}
