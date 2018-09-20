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

// Repro from #25288

declare var tuple: [number, string];
(function foo(a, b){}(...tuple));

// Repro from #25289

declare function take(cb: (a: number, b: string) => void): void;

(function foo(...rest){}(1, ''));
take(function(...rest){});


//// [restTuplesFromContextualTypes.js]
"use strict";
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
(function (a, b, c) { }).apply(void 0, [1].concat(t3));
(function () {
    var x = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        x[_i] = arguments[_i];
    }
}).apply(void 0, [1].concat(t3));
(function (a) {
    var x = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        x[_i - 1] = arguments[_i];
    }
}).apply(void 0, [1].concat(t3));
(function (a, b) {
    var x = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        x[_i - 2] = arguments[_i];
    }
}).apply(void 0, [1].concat(t3));
(function (a, b, c) {
    var x = [];
    for (var _i = 3; _i < arguments.length; _i++) {
        x[_i - 3] = arguments[_i];
    }
}).apply(void 0, [1].concat(t3));
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
    }).apply(void 0, [1].concat(t));
    (function (a) {
        var x = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            x[_i - 1] = arguments[_i];
        }
    }).apply(void 0, [1, 2].concat(t));
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


//// [restTuplesFromContextualTypes.d.ts]
declare const t1: [number, boolean, string];
declare function f1(cb: (...args: typeof t1) => void): void;
declare const t2: [number, boolean, ...string[]];
declare function f2(cb: (...args: typeof t2) => void): void;
declare const t3: [boolean, ...string[]];
declare function f3(cb: (x: number, ...args: typeof t3) => void): void;
declare function f4<T extends any[]>(t: T): void;
declare var tuple: [number, string];
declare function take(cb: (a: number, b: string) => void): void;
