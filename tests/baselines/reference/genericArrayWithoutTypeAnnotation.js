//// [genericArrayWithoutTypeAnnotation.ts]
interface IFoo<T>{
}
class Bar {
    public getBar(foo: IFoo[]) {
    }
}


//// [genericArrayWithoutTypeAnnotation.js]
var Bar = (function () {
    function Bar() {
    }
    var proto_1 = Bar.prototype;
    proto_1.getBar = function (foo) {
    };
    return Bar;
}());
