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
        var _f, _g, _h, _j;
        class C {
            constructor() {
                this[_f] = await x;
                this[_h] = yield 2;
            }
        }
        _f = await x, _g = await x, _h = yield 1, _j = yield 3;
        C[_g] = await x;
        C[_j] = yield 4;
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
