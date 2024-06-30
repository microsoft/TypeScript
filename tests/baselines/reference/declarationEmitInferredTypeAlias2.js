//// [tests/cases/compiler/declarationEmitInferredTypeAlias2.ts] ////

//// [0.ts]
{
    type Data = string | boolean;
    let obj: Data = true;
}
export { }

//// [1.ts]
let v = "str" || true;
function bar () {
    return v;
}
export { v, bar }

//// [0.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
{
    var obj = true;
}
//// [1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.v = void 0;
exports.bar = bar;
var v = "str" || true;
exports.v = v;
function bar() {
    return v;
}


//// [0.d.ts]
export {};
//// [1.d.ts]
declare let v: string | boolean;
declare function bar(): string | boolean;
export { v, bar };
