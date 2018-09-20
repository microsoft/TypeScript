//// [genericTypeUsedWithoutTypeArguments1.ts]
interface Foo<T> { }
class Bar<T> implements Foo { }


//// [genericTypeUsedWithoutTypeArguments1.js]
var Bar = /** @class */ (function () {
    function Bar() {
    }
    return Bar;
}());
