//// [tests/cases/compiler/declarationEmitExpressionInExtends4.ts] ////

//// [declarationEmitExpressionInExtends4.ts]
function getSomething() {
    return class D { }
}

class C extends getSomething()<number, string> {

}

class C2 extends SomeUndefinedFunction()<number, string> {

}


class C3 extends SomeUndefinedFunction {

}

//// [declarationEmitExpressionInExtends4.js]
function getSomething() {
    return class D {
    };
}
class C extends getSomething() {
}
class C2 extends SomeUndefinedFunction() {
}
class C3 extends SomeUndefinedFunction {
}
