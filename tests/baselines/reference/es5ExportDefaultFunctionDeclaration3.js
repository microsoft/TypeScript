//// [es5ExportDefaultFunctionDeclaration3.ts]

var before: typeof func = func();

export default function func(): typeof func {
    return func;
}

var after: typeof func = func();

//// [es5ExportDefaultFunctionDeclaration3.js]
"use strict";
var before = func();
function func() {
    return func;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = func;
var after = func();


//// [es5ExportDefaultFunctionDeclaration3.d.ts]
export default function func(): typeof func;
