//// [genericCloneReturnTypes.js]
var Bar = (function () {
    function Bar(x) {
        this.size = x;
    }
    Bar.prototype.clone = function () {
        return new Bar(this.size);
    };
    return Bar;
})();

var b;

var b2 = b.clone();
var b3;
b = b2;
b = b3;
