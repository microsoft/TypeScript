//// [tests/cases/conformance/statements/VariableStatements/usingDeclarations/usingDeclarationsTopLevelOfModule.3.ts] ////

//// [usingDeclarationsTopLevelOfModule.3.ts]
export { y };

using z = { [Symbol.dispose]() {} };

if (false) {
    var y = 1;
}

function f() {
    console.log(y, z);
}



//// [usingDeclarationsTopLevelOfModule.3.js]
export { y };
using z = { [Symbol.dispose]() { } };
if (false) {
    var y = 1;
}
function f() {
    console.log(y, z);
}
