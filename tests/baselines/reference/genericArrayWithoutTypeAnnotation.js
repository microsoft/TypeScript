//// [genericArrayWithoutTypeAnnotation.ts]
interface IFoo<T>{
}
class Bar {
    public getBar(foo: IFoo[]) {
    }
}


//// [genericArrayWithoutTypeAnnotation.js]
var Bar = /** @class */ (function () {
    function Bar() {
    }
    Bar.prototype.getBar = function (foo) {
    };
    return Bar;
}());
