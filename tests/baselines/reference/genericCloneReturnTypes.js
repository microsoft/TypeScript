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
var __names = (this && this.__names) || (function() {
    var name = Object.defineProperty ? (function(proto, name) {
        Object.defineProperty(proto[name], 'name', { 
            value: name, configurable: true
        });
    }) : (function(proto, name) {
        proto[name].name = name;
    });
    return function (proto, keys) {
        for (var i = keys.length - 1; i >= 0; i--) {
            name(proto, keys[i])
        }
    };
})();
var Bar = (function () {
    function Bar(x) {
        this.size = x;
    }
    Bar.prototype.clone = function () {
        return new Bar(this.size);
    };
    __names(Bar.prototype, ["clone"]);
    return Bar;
}());
var b;
var b2 = b.clone();
var b3;
b = b2;
b = b3;
