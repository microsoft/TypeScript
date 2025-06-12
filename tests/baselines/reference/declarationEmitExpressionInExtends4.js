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


//// [declarationEmitExpressionInExtends4.d.ts]
declare function getSomething(): {
    new (): {};
};
declare const C_base: {
    new (): {};
};
declare class C extends C_base<number, string> {
}
declare const C2_base: any;
declare class C2 extends C2_base<number, string> {
}
declare class C3 extends SomeUndefinedFunction {
}
