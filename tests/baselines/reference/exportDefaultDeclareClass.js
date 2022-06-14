//// [tests/cases/compiler/exportDefaultDeclareClass.ts] ////

//// [a.ts]
export default declare class C {
    public foo: number;
}

//// [b.ts]
import A from "./a"
let a: A;
a.foo


//// [a.js]
"use strict";
exports.__esModule = true;
//// [b.js]
"use strict";
exports.__esModule = true;
var a;
a.foo;
