//// [tests/cases/compiler/declarationEmitExpressionInExtends2.ts] ////

//// [declarationEmitExpressionInExtends2.ts]
class C<T, U> {
    x: T;
    y: U;
}

function getClass<T>(c: T) {
    return C;
}

class MyClass extends getClass(2) <string, number> {
}

//// [declarationEmitExpressionInExtends2.js]
class C {
    x;
    y;
}
function getClass(c) {
    return C;
}
class MyClass extends getClass(2) {
}


//// [declarationEmitExpressionInExtends2.d.ts]
declare class C<T, U> {
    x: T;
    y: U;
}
declare function getClass<T>(c: T): typeof C;
declare const MyClass_base: typeof C;
declare class MyClass extends MyClass_base<string, number> {
}
