//// [awaitAndYieldInProperty.ts]
async function* test(x: Promise<string>) {
    class C {
        [await x] = await x;
        static [await x] = await x;

        [yield 1] = yield 2;
        static [yield 3] = yield 4;
    }

    return class {
        [await x] = await x;
        static [await x] = await x;

        [yield 1] = yield 2;
        static [yield 3] = yield 4;
    }
}

//// [awaitAndYieldInProperty.js]
async function* test(x) {
    var _a, _b, _c, _d, _e;
    let C = /** @class */ (() => {
        var _e, _f, _g, _h;
        class C {
            constructor() {
                this[_e] = await x;
                this[_g] = yield 2;
            }
        }
        _e = await x, _f = await x, _g = yield 1, _h = yield 3;
        C[_f] = await x;
        C[_h] = yield 4;
        return C;
    })();
    return _e = class {
            constructor() {
                this[_a] = await x;
                this[_c] = yield 2;
            }
        },
        _a = await x,
        _b = await x,
        _c = yield 1,
        _d = yield 3,
        _e[_b] = await x,
        _e[_d] = yield 4,
        _e;
}
