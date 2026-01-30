//// [tests/cases/compiler/thisExpressionOfGenericObject.ts] ////

//// [thisExpressionOfGenericObject.ts]
class MyClass1<T> {
    private obj: MyClass1<string>;
    constructor() {
        () => this;
    }
}


//// [thisExpressionOfGenericObject.js]
"use strict";
var MyClass1 = /** @class */ (function () {
    function MyClass1() {
        var _this = this;
        (function () { return _this; });
    }
    return MyClass1;
}());
