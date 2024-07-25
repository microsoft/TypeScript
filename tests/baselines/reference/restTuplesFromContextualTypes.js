//// [tests/cases/conformance/types/rest/restTuplesFromContextualTypes.ts] ////

//// [restTuplesFromContextualTypes.ts]
declare const t1: [number, boolean, string];

(function (a, b, c){})(...t1);
(function (...x){})(...t1);
(function (a, ...x){})(...t1);
(function (a, b, ...x){})(...t1);
(function (a, b, c, ...x){})(...t1);

declare function f1(cb: (...args: typeof t1) => void): void;

f1((a, b, c) => {})
f1((...x) => {})
f1((a, ...x) => {})
f1((a, b, ...x) => {})
f1((a, b, c, ...x) => {})

declare const t2: [number, boolean, ...string[]];

(function (a, b, c){})(...t2);
(function (...x){})(...t2);
(function (a, ...x){})(...t2);
(function (a, b, ...x){})(...t2);
(function (a, b, c, ...x){})(...t2);

declare function f2(cb: (...args: typeof t2) => void): void;

f2((a, b, c) => {})
f2((...x) => {})
f2((a, ...x) => {})
f2((a, b, ...x) => {})
f2((a, b, c, ...x) => {})

declare const t3: [boolean, ...string[]];

(function (a, b, c){})(1, ...t3);
(function (...x){})(1, ...t3);
(function (a, ...x){})(1, ...t3);
(function (a, b, ...x){})(1, ...t3);
(function (a, b, c, ...x){})(1, ...t3);

declare function f3(cb: (x: number, ...args: typeof t3) => void): void;

f3((a, b, c) => {})
f3((...x) => {})
f3((a, ...x) => {})
f3((a, b, ...x) => {})
f3((a, b, c, ...x) => {})

function f4<T extends any[]>(t: T) {
    (function(...x){})(...t);
    (function(a, ...x){})(1, ...t);
    (function(a, ...x){})(1, 2, ...t);
    function f(cb: (x: number, ...args: T) => void) {}
    f((...x) => {});
    f((a, ...x) => {});
    f((a, b, ...x) => {});
}

declare function f5<T extends any[], U>(f: (...args: T) => U): (...args: T) => U;

let g0 = f5(() => "hello");
let g1 = f5((x, y) => 42);
let g2 = f5((x: number, y) => 42);
let g3 = f5((x: number, y: number) => x + y);
let g4 = f5((...args) => true);

declare function pipe<A extends any[], B, C>(f: (...args: A) => B, g: (x: B) => C): (...args: A) => C;

let g5 = pipe(() => true, b => 42);
let g6 = pipe(x => "hello", s => s.length);
let g7 = pipe((x, y) => 42, x => "" + x);
let g8 = pipe((x: number, y: string) => 42, x => "" + x);

// Repro from #25288

declare var tuple: [number, string];
(function foo(a, b){}(...tuple));

// Repro from #25289

declare function take(cb: (a: number, b: string) => void): void;

(function foo(...rest){}(1, ''));
take(function(...rest){});

// Repro from #29833

type ArgsUnion = [number, string] | [number, Error];
type TupleUnionFunc = (...params: ArgsUnion) => number;

const funcUnionTupleNoRest: TupleUnionFunc = (num, strOrErr) => {
  return num;
};

const funcUnionTupleRest: TupleUnionFunc = (...params) => {
  const [num, strOrErr] = params;
  return num;
};


//// [restTuplesFromContextualTypes.js]
"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
(function (a, b, c) { }).apply(void 0, t1);
(function () {
    var x = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        x[_i] = arguments[_i];
    }
}).apply(void 0, t1);
(function (a) {
    var x = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        x[_i - 1] = arguments[_i];
    }
}).apply(void 0, t1);
(function (a, b) {
    var x = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        x[_i - 2] = arguments[_i];
    }
}).apply(void 0, t1);
(function (a, b, c) {
    var x = [];
    for (var _i = 3; _i < arguments.length; _i++) {
        x[_i - 3] = arguments[_i];
    }
}).apply(void 0, t1);
f1(function (a, b, c) { });
f1(function () {
    var x = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        x[_i] = arguments[_i];
    }
});
f1(function (a) {
    var x = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        x[_i - 1] = arguments[_i];
    }
});
f1(function (a, b) {
    var x = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        x[_i - 2] = arguments[_i];
    }
});
f1(function (a, b, c) {
    var x = [];
    for (var _i = 3; _i < arguments.length; _i++) {
        x[_i - 3] = arguments[_i];
    }
});
(function (a, b, c) { }).apply(void 0, t2);
(function () {
    var x = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        x[_i] = arguments[_i];
    }
}).apply(void 0, t2);
(function (a) {
    var x = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        x[_i - 1] = arguments[_i];
    }
}).apply(void 0, t2);
(function (a, b) {
    var x = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        x[_i - 2] = arguments[_i];
    }
}).apply(void 0, t2);
(function (a, b, c) {
    var x = [];
    for (var _i = 3; _i < arguments.length; _i++) {
        x[_i - 3] = arguments[_i];
    }
}).apply(void 0, t2);
f2(function (a, b, c) { });
f2(function () {
    var x = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        x[_i] = arguments[_i];
    }
});
f2(function (a) {
    var x = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        x[_i - 1] = arguments[_i];
    }
});
f2(function (a, b) {
    var x = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        x[_i - 2] = arguments[_i];
    }
});
f2(function (a, b, c) {
    var x = [];
    for (var _i = 3; _i < arguments.length; _i++) {
        x[_i - 3] = arguments[_i];
    }
});
(function (a, b, c) { }).apply(void 0, __spreadArray([1], t3, false));
(function () {
    var x = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        x[_i] = arguments[_i];
    }
}).apply(void 0, __spreadArray([1], t3, false));
(function (a) {
    var x = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        x[_i - 1] = arguments[_i];
    }
}).apply(void 0, __spreadArray([1], t3, false));
(function (a, b) {
    var x = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        x[_i - 2] = arguments[_i];
    }
}).apply(void 0, __spreadArray([1], t3, false));
(function (a, b, c) {
    var x = [];
    for (var _i = 3; _i < arguments.length; _i++) {
        x[_i - 3] = arguments[_i];
    }
}).apply(void 0, __spreadArray([1], t3, false));
f3(function (a, b, c) { });
f3(function () {
    var x = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        x[_i] = arguments[_i];
    }
});
f3(function (a) {
    var x = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        x[_i - 1] = arguments[_i];
    }
});
f3(function (a, b) {
    var x = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        x[_i - 2] = arguments[_i];
    }
});
f3(function (a, b, c) {
    var x = [];
    for (var _i = 3; _i < arguments.length; _i++) {
        x[_i - 3] = arguments[_i];
    }
});
function f4(t) {
    (function () {
        var x = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            x[_i] = arguments[_i];
        }
    }).apply(void 0, t);
    (function (a) {
        var x = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            x[_i - 1] = arguments[_i];
        }
    }).apply(void 0, __spreadArray([1], t, false));
    (function (a) {
        var x = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            x[_i - 1] = arguments[_i];
        }
    }).apply(void 0, __spreadArray([1, 2], t, false));
    function f(cb) { }
    f(function () {
        var x = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            x[_i] = arguments[_i];
        }
    });
    f(function (a) {
        var x = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            x[_i - 1] = arguments[_i];
        }
    });
    f(function (a, b) {
        var x = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            x[_i - 2] = arguments[_i];
        }
    });
}
var g0 = f5(function () { return "hello"; });
var g1 = f5(function (x, y) { return 42; });
var g2 = f5(function (x, y) { return 42; });
var g3 = f5(function (x, y) { return x + y; });
var g4 = f5(function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return true;
});
var g5 = pipe(function () { return true; }, function (b) { return 42; });
var g6 = pipe(function (x) { return "hello"; }, function (s) { return s.length; });
var g7 = pipe(function (x, y) { return 42; }, function (x) { return "" + x; });
var g8 = pipe(function (x, y) { return 42; }, function (x) { return "" + x; });
(function foo(a, b) { }.apply(void 0, tuple));
(function foo() {
    var rest = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        rest[_i] = arguments[_i];
    }
}(1, ''));
take(function () {
    var rest = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        rest[_i] = arguments[_i];
    }
});
var funcUnionTupleNoRest = function (num, strOrErr) {
    return num;
};
var funcUnionTupleRest = function () {
    var params = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        params[_i] = arguments[_i];
    }
    var num = params[0], strOrErr = params[1];
    return num;
};


//// [restTuplesFromContextualTypes.d.ts]
declare const t1: [number, boolean, string];
declare function f1(cb: (...args: typeof t1) => void): void;
declare const t2: [number, boolean, ...string[]];
declare function f2(cb: (...args: typeof t2) => void): void;
declare const t3: [boolean, ...string[]];
declare function f3(cb: (x: number, ...args: typeof t3) => void): void;
declare function f4<T extends any[]>(t: T): void;
declare function f5<T extends any[], U>(f: (...args: T) => U): (...args: T) => U;
declare let g0: () => string;
declare let g1: (x: any, y: any) => number;
declare let g2: (x: number, y: any) => number;
declare let g3: (x: number, y: number) => number;
declare let g4: (...args: any[]) => boolean;
declare function pipe<A extends any[], B, C>(f: (...args: A) => B, g: (x: B) => C): (...args: A) => C;
declare let g5: () => number;
declare let g6: (x: any) => number;
declare let g7: (x: any, y: any) => string;
declare let g8: (x: number, y: string) => string;
declare var tuple: [number, string];
declare function take(cb: (a: number, b: string) => void): void;
type ArgsUnion = [number, string] | [number, Error];
type TupleUnionFunc = (...params: ArgsUnion) => number;
declare const funcUnionTupleNoRest: TupleUnionFunc;
declare const funcUnionTupleRest: TupleUnionFunc;
