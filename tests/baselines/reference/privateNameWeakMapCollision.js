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
    let WeakMap;
    class C {
        constructor() {
            _x.set(this, void 0);
        }
    }
    _x = new WeakMap();
}
