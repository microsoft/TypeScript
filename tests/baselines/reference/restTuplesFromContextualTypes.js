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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
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
    for (var _a = 1; _a < arguments.length; _a++) {
        x[_a - 1] = arguments[_a];
    }
}).apply(void 0, t1);
(function (a, b) {
    var x = [];
    for (var _b = 2; _b < arguments.length; _b++) {
        x[_b - 2] = arguments[_b];
    }
}).apply(void 0, t1);
(function (a, b, c) {
    var x = [];
    for (var _c = 3; _c < arguments.length; _c++) {
        x[_c - 3] = arguments[_c];
    }
}).apply(void 0, t1);
f1(function (a, b, c) { });
f1(function () {
    var x = [];
    for (var _d = 0; _d < arguments.length; _d++) {
        x[_d] = arguments[_d];
    }
});
f1(function (a) {
    var x = [];
    for (var _e = 1; _e < arguments.length; _e++) {
        x[_e - 1] = arguments[_e];
    }
});
f1(function (a, b) {
    var x = [];
    for (var _f = 2; _f < arguments.length; _f++) {
        x[_f - 2] = arguments[_f];
    }
});
f1(function (a, b, c) {
    var x = [];
    for (var _g = 3; _g < arguments.length; _g++) {
        x[_g - 3] = arguments[_g];
    }
});
(function (a, b, c) { }).apply(void 0, t2);
(function () {
    var x = [];
    for (var _h = 0; _h < arguments.length; _h++) {
        x[_h] = arguments[_h];
    }
}).apply(void 0, t2);
(function (a) {
    var x = [];
    for (var _j = 1; _j < arguments.length; _j++) {
        x[_j - 1] = arguments[_j];
    }
}).apply(void 0, t2);
(function (a, b) {
    var x = [];
    for (var _k = 2; _k < arguments.length; _k++) {
        x[_k - 2] = arguments[_k];
    }
}).apply(void 0, t2);
(function (a, b, c) {
    var x = [];
    for (var _l = 3; _l < arguments.length; _l++) {
        x[_l - 3] = arguments[_l];
    }
}).apply(void 0, t2);
f2(function (a, b, c) { });
f2(function () {
    var x = [];
    for (var _m = 0; _m < arguments.length; _m++) {
        x[_m] = arguments[_m];
    }
});
f2(function (a) {
    var x = [];
    for (var _o = 1; _o < arguments.length; _o++) {
        x[_o - 1] = arguments[_o];
    }
});
f2(function (a, b) {
    var x = [];
    for (var _p = 2; _p < arguments.length; _p++) {
        x[_p - 2] = arguments[_p];
    }
});
f2(function (a, b, c) {
    var x = [];
    for (var _q = 3; _q < arguments.length; _q++) {
        x[_q - 3] = arguments[_q];
    }
});
(function (a, b, c) { }).apply(void 0, __spreadArrays([1], t3));
(function () {
    var x = [];
    for (var _r = 0; _r < arguments.length; _r++) {
        x[_r] = arguments[_r];
    }
}).apply(void 0, __spreadArrays([1], t3));
(function (a) {
    var x = [];
    for (var _s = 1; _s < arguments.length; _s++) {
        x[_s - 1] = arguments[_s];
    }
}).apply(void 0, __spreadArrays([1], t3));
(function (a, b) {
    var x = [];
    for (var _t = 2; _t < arguments.length; _t++) {
        x[_t - 2] = arguments[_t];
    }
}).apply(void 0, __spreadArrays([1], t3));
(function (a, b, c) {
    var x = [];
    for (var _u = 3; _u < arguments.length; _u++) {
        x[_u - 3] = arguments[_u];
    }
}).apply(void 0, __spreadArrays([1], t3));
f3(function (a, b, c) { });
f3(function () {
    var x = [];
    for (var _v = 0; _v < arguments.length; _v++) {
        x[_v] = arguments[_v];
    }
});
f3(function (a) {
    var x = [];
    for (var _w = 1; _w < arguments.length; _w++) {
        x[_w - 1] = arguments[_w];
    }
});
f3(function (a, b) {
    var x = [];
    for (var _x = 2; _x < arguments.length; _x++) {
        x[_x - 2] = arguments[_x];
    }
});
f3(function (a, b, c) {
    var x = [];
    for (var _y = 3; _y < arguments.length; _y++) {
        x[_y - 3] = arguments[_y];
    }
});
function f4(t) {
    (function () {
        var x = [];
        for (var _z = 0; _z < arguments.length; _z++) {
            x[_z] = arguments[_z];
        }
    }).apply(void 0, t);
    (function (a) {
        var x = [];
        for (var _0 = 1; _0 < arguments.length; _0++) {
            x[_0 - 1] = arguments[_0];
        }
    }).apply(void 0, __spreadArrays([1], t));
    (function (a) {
        var x = [];
        for (var _1 = 1; _1 < arguments.length; _1++) {
            x[_1 - 1] = arguments[_1];
        }
    }).apply(void 0, __spreadArrays([1, 2], t));
    function f(cb) { }
    f(function () {
        var x = [];
        for (var _2 = 0; _2 < arguments.length; _2++) {
            x[_2] = arguments[_2];
        }
    });
    f(function (a) {
        var x = [];
        for (var _3 = 1; _3 < arguments.length; _3++) {
            x[_3 - 1] = arguments[_3];
        }
    });
    f(function (a, b) {
        var x = [];
        for (var _4 = 2; _4 < arguments.length; _4++) {
            x[_4 - 2] = arguments[_4];
        }
    });
}
var g0 = f5(function () { return "hello"; });
var g1 = f5(function (x, y) { return 42; });
var g2 = f5(function (x, y) { return 42; });
var g3 = f5(function (x, y) { return x + y; });
var g4 = f5(function () {
    var args = [];
    for (var _5 = 0; _5 < arguments.length; _5++) {
        args[_5] = arguments[_5];
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
    for (var _6 = 0; _6 < arguments.length; _6++) {
        rest[_6] = arguments[_6];
    }
}(1, ''));
take(function () {
    var rest = [];
    for (var _7 = 0; _7 < arguments.length; _7++) {
        rest[_7] = arguments[_7];
    }
});
var funcUnionTupleNoRest = function (num, strOrErr) {
    return num;
};
var funcUnionTupleRest = function () {
    var params = [];
    for (var _8 = 0; _8 < arguments.length; _8++) {
        params[_8] = arguments[_8];
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
declare type ArgsUnion = [number, string] | [number, Error];
declare type TupleUnionFunc = (...params: ArgsUnion) => number;
declare const funcUnionTupleNoRest: TupleUnionFunc;
declare const funcUnionTupleRest: TupleUnionFunc;
