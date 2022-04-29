//// [modularizeLibrary_UsingES5LibAndES6FeatureLibs.ts]
var s = Symbol();
var t = {};
var p = new Proxy(t, {});

Reflect.ownKeys({});

function* idGen() {
    let i = 10;
    while (i < 20) {
        yield i + 2;
    }
}


//// [modularizeLibrary_UsingES5LibAndES6FeatureLibs.js]
var s = Symbol();
var t = {};
var p = new Proxy(t, {});
Reflect.ownKeys({});
function* idGen() {
    let i = 10;
    while (i < 20) {
        yield i + 2;
    }
}
