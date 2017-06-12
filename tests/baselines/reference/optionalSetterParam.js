//// [optionalSetterParam.ts]
class foo {

    public set bar(param?:any) { }
}


//// [optionalSetterParam.js]
var foo = (function () {
    function foo() {
    }
    var proto_1 = foo.prototype;
    Object.defineProperty(proto_1, "bar", {
        set: function (param) { },
        enumerable: true,
        configurable: true
    });
    return foo;
}());
