//// [tests/cases/compiler/optionalSetterParam.ts] ////

//// [optionalSetterParam.ts]
class foo {

    public set bar(param?:any) { }
}


//// [optionalSetterParam.js]
var foo = /** @class */ (function () {
    function foo() {
    }
    Object.defineProperty(foo.prototype, "bar", {
        set: function (param) { },
        enumerable: false,
        configurable: true
    });
    return foo;
}());
