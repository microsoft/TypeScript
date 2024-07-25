//// [tests/cases/compiler/privateNameWeakMapCollision.ts] ////

//// [privateNameWeakMapCollision.ts]
function test() {
    let WeakMap;
    let WeakSet;
    class C {
        #x;
    }
}


//// [privateNameWeakMapCollision.js]
function test() {
    var _C_x;
    let WeakMap;
    let WeakSet;
    class C {
        constructor() {
            _C_x.set(this, void 0);
        }
    }
    _C_x = new WeakMap();
}
