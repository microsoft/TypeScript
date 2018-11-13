//// [es5ExportDefaultClassDeclaration2.ts]
export default class {
    method() { }
}


//// [es5ExportDefaultClassDeclaration2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var default_1 = /** @class */ (function () {
    function default_1() {
    }
    default_1.prototype.method = function () { };
    return default_1;
}());
exports.default = default_1;


//// [es5ExportDefaultClassDeclaration2.d.ts]
export default class {
    method(): void;
}
