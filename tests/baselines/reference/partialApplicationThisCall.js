//// [partialApplicationThisCall.ts]
const a = {
    b: {
        c: {
            d: {
                e: {
                    hmm: 10,
                    foo(x: number, y: number) { return this.hmm * x * y },
                }
            }
        }
    }
}

const j = a.b.c.d.e.foo(?, 1);


//// [partialApplicationThisCall.js]
var _foo_1;
var a = {
    b: {
        c: {
            d: {
                e: {
                    hmm: 10,
                    foo: function (x, y) { return this.hmm * x * y; }
                }
            }
        }
    }
};
var j = (_foo_1 = a.b.c.d.e.foo, function (_origFuncArg) { return _foo_1(_origFuncArg, 1); });
