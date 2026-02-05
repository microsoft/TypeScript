//// [tests/cases/compiler/staticMustPrecedePublic.ts] ////

//// [staticMustPrecedePublic.ts]
class Outer {
    static public intI: number;
    static private stringF: string;
}


//// [staticMustPrecedePublic.js]
"use strict";
class Outer {
    static intI;
    static stringF;
}
