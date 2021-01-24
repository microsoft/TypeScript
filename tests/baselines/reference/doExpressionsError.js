//// [doExpressionsError.ts]
// No return
function a() {
    const x = do {
        function ok() {
            return 1;
        }
        return 2; // error on this node
    };
}
// No break / continue across do expr
// Todo:

// No iteration / declaration at the end

;[
    do { var a = 1 },
    do { function x() { } },
    do { const a = 1 },
    do { let a = 1 },
    do { class T {} },
    do { enum T {} },
]

;[
    do { for (const x of []) {} },
    do { for (const x in {}) {} },
    do { for (let i = 0; i < [].length; i++) {} },
    do { while(true) {} },
    do { do {} while(true) }
]
;

// But in non-end position

;[
    do { var a = 1; a },
    do { function x() { }; x },
    do { const a = 1; a },
    do { let a = 1; a },
    do { class T {}; T },
    do { enum T {}; T },
]

;[
    do { for (const x of []) {}; 1 },
    do { for (const x in {}) {}; 1 },
    do { for (let i = 0; i < [].length; i++) {}; 1 },
    do { while(true) {}; 1 },
    do { do {} while(true); 1 }
]

//// [doExpressionsError.js]
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x;
// No return
function a() {
    var _a;
    var x = ((function () {
        function ok() {
            return 1;
        }
        return 2; // error on this node
    })(), _a);
}
// No break / continue across do expr
// Todo:
// No iteration / declaration at the end
;
[
    ((function () { var a = 1; })(), _a),
    ((function () { function x() { } })(), _b),
    ((function () { var a_1 = 1; })(), _c),
    ((function () { var a_2 = 1; })(), _d),
    ((function () { var T = /** @class */ (function () {
        function T() {
        }
        return T;
    }());  })(), _e),
    ((function () { var T; _f = (function (T) {
    })(T || (T = {}));  })(), _f),
];
[
    ((function () { for (var _i = 0, _a = []; _i < _a.length; _i++) {
        var x_1 = _a[_i];
    } })(), _g),
    ((function () { for (var x_2 in {}) { } })(), _h),
    ((function () { for (var i = 0; i < [].length; i++) { } })(), _j),
    ((function () { while (true) { } })(), _k),
    ((function () { do { } while (true); })(), _l)
];
// But in non-end position
;
[
    ((function () { var a = 1; _m = a; })(), _m),
    ((function () { function x() { } ; _o = x; })(), _o),
    ((function () { var a_3 = 1; _p = a_3; })(), _p),
    ((function () { var a_4 = 1; _q = a_4; })(), _q),
    ((function () { var T = /** @class */ (function () {
        function T() {
        }
        return T;
    }());  ; _r = T; })(), _r),
    ((function () { var T; _s = (function (T) {
    })(T || (T = {}));  ; _s = T; })(), _s),
];
[
    ((function () { for (var _i = 0, _a = []; _i < _a.length; _i++) {
        var x_3 = _a[_i];
    } ; _t = 1; })(), _t),
    ((function () { for (var x_4 in {}) { } ; _u = 1; })(), _u),
    ((function () { for (var i = 0; i < [].length; i++) { } ; _v = 1; })(), _v),
    ((function () { while (true) { } ; _w = 1; })(), _w),
    ((function () { do { } while (true); _x = 1; })(), _x)
];
