//// [tests/cases/compiler/jsFileCompilationWithMapFileAsJsWithOutDir.ts] ////

//// [a.ts]
class c {
}

//// [b.js.map]
function foo() {
}

//// [b.js]
function bar() {
}

//// [a.js]
"use strict";
class c {
}
//# sourceMappingURL=a.js.map
//// [b.js]
"use strict";
function bar() {
}
//# sourceMappingURL=b.js.map