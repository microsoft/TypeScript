//// [privateNameWeakMapCollision.ts]
function test() {
    let WeakMap;
    class C {
        #x;
    }
}



//// [privateNameWeakMapCollision.js]
function test() {
    var _x;
    var WeakMap;
    var C = /** @class */ (function () {
        function C() {
            _x.set(this, void 0);
        }
        return C;
    }());
    _x = new WeakMap();
}
