//// [genericClasses4.ts]
// once caused stack overflow
class Vec2_T<A>
{
    constructor(public x: A, public y: A) { }
    fmap<B>(f: (a: A) => B): Vec2_T<B> {
        var x:B = f(this.x);
        var y:B = f(this.y);
        var retval: Vec2_T<B> = new Vec2_T(x, y);
        return retval;
    }
    apply<B>(f: Vec2_T<(a: A) => B>): Vec2_T<B> {
        var x:B = f.x(this.x);
        var y:B = f.y(this.y);
        var retval: Vec2_T<B> = new Vec2_T(x, y);
        return retval;
    }
}

//// [genericClasses4.js]
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
// once caused stack overflow
var Vec2_T = (function () {
    function Vec2_T(x, y) {
        this.x = x;
        this.y = y;
    }
    Vec2_T.prototype.fmap = function (f) {
        var x = f(this.x);
        var y = f(this.y);
        var retval = new Vec2_T(x, y);
        return retval;
    };
    Vec2_T.prototype.apply = function (f) {
        var x = f.x(this.x);
        var y = f.y(this.y);
        var retval = new Vec2_T(x, y);
        return retval;
    };
    __names(Vec2_T.prototype, ["fmap", "apply"]);
    return Vec2_T;
}());
