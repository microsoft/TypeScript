//// [optionalSetterParam.ts]
class foo {

    public set bar(param?:any) { }
}


//// [optionalSetterParam.js]
var foo = (function () {
    function foo() {
    }
    Object.defineProperty(foo.prototype, "bar", {
        set: function (param) { },
        enumerable: true,
        configurable: true
    });
    return foo;
}());
