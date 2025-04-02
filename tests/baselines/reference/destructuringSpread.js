//// [tests/cases/conformance/es6/destructuring/destructuringSpread.ts] ////

//// [destructuringSpread.ts]
const { x } = {
  ...{},
  x: 0
};

const { y } = {
  y: 0,
  ...{}
};

const { z, a, b } = {
  z: 0,
  ...{ a: 0, b: 0 }
};

const { c, d, e, f, g } = {
  ...{
    ...{
      ...{
        c: 0,
      },
      d: 0
    },
    e: 0
  },
  f: 0
};


//// [destructuringSpread.js]
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var x = __assign({}, { x: 0 }).x;
var y = __assign({ y: 0 }, {}).y;
var _a = __assign({ z: 0 }, { a: 0, b: 0 }), z = _a.z, a = _a.a, b = _a.b;
var _b = __assign(__assign({}, __assign(__assign({}, __assign({
    c: 0,
}, { d: 0 })), { e: 0 })), { f: 0 }), c = _b.c, d = _b.d, e = _b.e, f = _b.f, g = _b.g;
