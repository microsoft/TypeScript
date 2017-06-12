//// [genericCloneReturnTypes.ts]
class Bar<T> {

    public size: number;
    public t: T;

    constructor(x: number) {

        this.size = x;

    }

    public clone() {

        return new Bar<T>(this.size);

    }

}

var b: Bar<number>;

var b2 = b.clone();
var b3: Bar<string>;
b = b2;
b = b3;

//// [genericCloneReturnTypes.js]
var Bar = (function () {
    function Bar(x) {
        this.size = x;
    }
    var proto_1 = Bar.prototype;
    proto_1.clone = function () {
        return new Bar(this.size);
    };
    return Bar;
}());
var b;
var b2 = b.clone();
var b3;
b = b2;
b = b3;
