//// [tests/cases/compiler/thisExpressionOfGenericObject.ts] ////

//// [thisExpressionOfGenericObject.ts]
class MyClass1<T> {
    private obj: MyClass1<string>;
    constructor() {
        () => this;
    }
}


//// [thisExpressionOfGenericObject.js]
class MyClass1 {
    obj;
    constructor() {
        () => this;
    }
}
