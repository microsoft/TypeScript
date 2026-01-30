//// [tests/cases/compiler/genericArrayWithoutTypeAnnotation.ts] ////

//// [genericArrayWithoutTypeAnnotation.ts]
interface IFoo<T>{
}
class Bar {
    public getBar(foo: IFoo[]) {
    }
}


//// [genericArrayWithoutTypeAnnotation.js]
"use strict";
var Bar = /** @class */ (function () {
    function Bar() {
    }
    Bar.prototype.getBar = function (foo) {
    };
    return Bar;
}());
