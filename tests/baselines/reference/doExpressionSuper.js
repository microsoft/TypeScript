//// [doExpressionSuper.ts]
class Parent {
    concat(...args) {
        console.log(this, ...args)
    }
}
class Test extends Parent {
    *b() {
        const a = do {
            yield;
            console.log(super["concat"]);
            console.log(super.concat);
            super.concat(1,2);
            super["concat"](1,2);
            1;
        }
    }
}
[...new Test().b()]
// Correct result:
// [Function: concat]
// [Function: concat]
// Test {} 1 2
// Test {} 1 2


//// [doExpressionSuper.js]
class Parent {
    concat(...args) {
        console.log(this, ...args);
    }
}
class Test extends Parent {
    *b() {
        var _a, _b, _c, _d, _e;
        _b = _f => super[_f];
        _c = () => super.concat;
        _d = (..._g) => super.concat(..._g);
        _e = _h => (..._j) => super[_h](..._j);
        const a = (yield* function* () {
            yield;
            console.log(_b("concat"));
            console.log(_c());
            _d(1, 2);
            _e("concat")(1, 2);
            _a = 1;
        }.call(this), _a);
    }
}
[...new Test().b()];
// Correct result:
// [Function: concat]
// [Function: concat]
// Test {} 1 2
// Test {} 1 2
