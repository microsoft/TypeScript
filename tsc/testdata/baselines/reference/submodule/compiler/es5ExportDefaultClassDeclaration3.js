//// [tests/cases/compiler/es5ExportDefaultClassDeclaration3.ts] ////

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
class C {
    method() {
        return new C();
    }
}
exports.default = C;
var after = new C();
var t = C;
