//// [tests/cases/conformance/statements/VariableStatements/usingDeclarations/usingDeclarationsInFor.ts] ////

//// [usingDeclarationsInFor.ts]
for (using d1 = { [Symbol.dispose]() {} }, d2 = null, d3 = undefined;;) {
}


//// [usingDeclarationsInFor.js]
"use strict";
for (using d1 = { [Symbol.dispose]() { } }, d2 = null, d3 = undefined;;) {
}
