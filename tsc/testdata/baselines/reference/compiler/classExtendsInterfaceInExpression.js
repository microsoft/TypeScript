//// [tests/cases/compiler/classExtendsInterfaceInExpression.ts] ////

//// [classExtendsInterfaceInExpression.ts]
interface A {}

function factory(a: any): {new(): Object} {
  return null;
}

class C extends factory(A) {}


//// [classExtendsInterfaceInExpression.js]
"use strict";
function factory(a) {
    return null;
}
class C extends factory(A) {
}
