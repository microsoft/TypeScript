//// [tests/cases/compiler/declareDottedExtend.ts] ////

//// [declareDottedExtend.ts]
declare namespace A.B
{
    export class C{ }
}

import ab = A.B;

class D extends ab.C{ }

class E extends A.B.C{ }


//// [declareDottedExtend.js]
"use strict";
var ab = A.B;
class D extends ab.C {
}
class E extends A.B.C {
}
