//// [tests/cases/compiler/objectInstantiationFromUnionSpread.ts] ////

//// [objectInstantiationFromUnionSpread.ts]
// #40995

interface Success {
  isSuccess: true;
}

interface Fail {
  isSuccess: false;
}

type Item = Success | Fail;

function f1(a: Item[]) {
  a.map(item => ({ ...item })).filter(value => {});
}

function f2<T>(a: Item[]) {
  a.map(item => ({ ...item })).filter(value => {});
}


//// [objectInstantiationFromUnionSpread.js]
// #40995
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
function f1(a) {
    a.map(function (item) { return (__assign({}, item)); }).filter(function (value) { });
}
function f2(a) {
    a.map(function (item) { return (__assign({}, item)); }).filter(function (value) { });
}
