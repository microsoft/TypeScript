//// [tests/cases/compiler/jsFileCompilationEmitDeclarations.ts] ////

//// [a.ts]
class c {
}

//// [b.js]
function foo() {
}


//// [a.js]
"use strict";
class c {
}
//// [b.js]
"use strict";
function foo() {
}


//// [a.d.ts]
declare class c {
}
//// [b.d.ts]
declare function foo(): void;
