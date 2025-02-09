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
Object.defineProperty(exports, "__esModule", { value: true });
//// [b.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var a;
a.foo;
