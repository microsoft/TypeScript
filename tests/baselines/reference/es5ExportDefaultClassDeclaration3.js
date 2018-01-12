//// [es5ExportDefaultClassDeclaration3.ts]
var before: C = new C();

export default class C {
    method(): C {
        return new C();
    }
}

var after: C = new C();

var t: typeof C = C;



//// [es5ExportDefaultClassDeclaration3.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var before = new C();
var C = /** @class */ (function () {
    function C() {
    }
    C.prototype.method = function () {
        return new C();
    };
    return C;
}());
exports.default = C;
var after = new C();
var t = C;


//// [es5ExportDefaultClassDeclaration3.d.ts]
export default class C {
    method(): C;
}
