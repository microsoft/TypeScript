// @lib: es5,es6.symbol,es6.proxy,es6.generator,es6.iterable,es6.reflect
// @target: es6

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
