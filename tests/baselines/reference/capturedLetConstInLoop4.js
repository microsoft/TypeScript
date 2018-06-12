//// [capturedLetConstInLoop4.ts]
//======let
export function exportedFoo() {
    return v0 + v00 + v1 + v2 + v3 + v4 + v5 + v6 + v7 + v8;
}

for (let x of []) {
    var v0 = x;
    (function() { return x + v0});
    (() => x);    
}

for (let x in []) {
    var v00 = x;
    (function() { return x + v00});
    (() => x);    
}

for (let x = 0; x < 1; ++x) {
    var v1 = x;
    (function() { return x + v1});
    (() => x);
}

while (1 === 1) {
    let x;
    var v2 = x;
    (function() { return x + v2});
    (() => x);
}

do {
    let x;
    var v3 = x;
    (function() { return x + v3});
    (() => x);
} while (1 === 1)

for (let y = 0; y < 1; ++y) {
    let x = 1;
    var v4 = x;
    (function() { return x + v4});
    (() => x);
}

for (let x = 0, y = 1; x < 1; ++x) {
    var v5 = x;
    (function() { return x + y + v5});
    (() => x + y);
}

while (1 === 1) {
    let x, y;
    var v6 = x;
    (function() { return x + y + v6});
    (() => x + y);
}

do {
    let x, y;
    var v7 = x;
    (function() { return x + y + v7});
    (() => x + y);
} while (1 === 1)

for (let y = 0; y < 1; ++y) {
    let x = 1;
    var v8 = x;
    (function() { return x + y + v8});
    (() => x + y);
}

//======const
export function exportedFoo2() {
    return v0_c + v00_c + v1_c + v2_c + v3_c + v4_c + v5_c + v6_c + v7_c + v8_c;
}

for (const x of []) {
    var v0_c = x;
    (function() { return x + v0_c});
    (() => x);    
}

for (const x in []) {
    var v00_c = x;
    (function() { return x + v00});
    (() => x);    
}

for (const x = 0; x < 1;) {
    var v1_c = x;
    (function() { return x + v1_c});
    (() => x);
}

while (1 === 1) {
    const x =1;
    var v2_c = x;
    (function() { return x + v2_c});
    (() => x);
}

do {
    const x = 1;
    var v3_c = x;
    (function() { return x + v3_c});
    (() => x);
} while (1 === 1)

for (const y = 0; y < 1;) {
    const x = 1;
    var v4_c = x;
    (function() { return x + v4_c});
    (() => x);
}

for (const x = 0, y = 1; x < 1;) {
    var v5_c = x;
    (function() { return x + y + v5_c});
    (() => x + y);
}

while (1 === 1) {
    const x = 1, y = 1;
    var v6_c = x;
    (function() { return x + y + v6_c});
    (() => x + y);
}

do {
    const x = 1, y = 1;
    var v7_c = x;
    (function() { return x + y + v7_c});
    (() => x + y);
} while (1 === 1)

for (const y = 0; y < 1;) {
    const x = 1;
    var v8_c = x;
    (function() { return x + y + v8_c});
    (() => x + y);
}


//// [capturedLetConstInLoop4.js]
System.register([], function (exports_1, context_1) {
    "use strict";
    var v0, v00, v1, v2, v3, v4, v5, v6, v7, v8, v0_c, v00_c, v1_c, v2_c, v3_c, v4_c, v5_c, v6_c, v7_c, v8_c;
    var __moduleName = context_1 && context_1.id;
    //======let
    function exportedFoo() {
        return v0 + v00 + v1 + v2 + v3 + v4 + v5 + v6 + v7 + v8;
    }
    exports_1("exportedFoo", exportedFoo);
    //======const
    function exportedFoo2() {
        return v0_c + v00_c + v1_c + v2_c + v3_c + v4_c + v5_c + v6_c + v7_c + v8_c;
    }
    exports_1("exportedFoo2", exportedFoo2);
    return {
        setters: [],
        execute: function () {
            var _loop_1 = function (x) {
                v0 = x;
                (function () { return x + v0; });
                (function () { return x; });
            };
            for (var _i = 0, _a = []; _i < _a.length; _i++) {
                var x = _a[_i];
                _loop_1(x);
            }
            var _loop_2 = function (x) {
                v00 = x;
                (function () { return x + v00; });
                (function () { return x; });
            };
            for (var x in []) {
                _loop_2(x);
            }
            var _loop_3 = function (x) {
                v1 = x;
                (function () { return x + v1; });
                (function () { return x; });
            };
            for (var x = 0; x < 1; ++x) {
                _loop_3(x);
            }
            var _loop_4 = function () {
                var x;
                v2 = x;
                (function () { return x + v2; });
                (function () { return x; });
            };
            while (1 === 1) {
                _loop_4();
            }
            var _loop_5 = function () {
                var x;
                v3 = x;
                (function () { return x + v3; });
                (function () { return x; });
            };
            do {
                _loop_5();
            } while (1 === 1);
            var _loop_6 = function (y) {
                var x = 1;
                v4 = x;
                (function () { return x + v4; });
                (function () { return x; });
            };
            for (var y = 0; y < 1; ++y) {
                _loop_6(y);
            }
            var _loop_7 = function (x, y) {
                v5 = x;
                (function () { return x + y + v5; });
                (function () { return x + y; });
            };
            for (var x = 0, y = 1; x < 1; ++x) {
                _loop_7(x, y);
            }
            var _loop_8 = function () {
                var x, y;
                v6 = x;
                (function () { return x + y + v6; });
                (function () { return x + y; });
            };
            while (1 === 1) {
                _loop_8();
            }
            var _loop_9 = function () {
                var x, y;
                v7 = x;
                (function () { return x + y + v7; });
                (function () { return x + y; });
            };
            do {
                _loop_9();
            } while (1 === 1);
            var _loop_10 = function (y) {
                var x = 1;
                v8 = x;
                (function () { return x + y + v8; });
                (function () { return x + y; });
            };
            for (var y = 0; y < 1; ++y) {
                _loop_10(y);
            }
            var _loop_11 = function (x) {
                v0_c = x;
                (function () { return x + v0_c; });
                (function () { return x; });
            };
            for (var _b = 0, _c = []; _b < _c.length; _b++) {
                var x = _c[_b];
                _loop_11(x);
            }
            var _loop_12 = function (x) {
                v00_c = x;
                (function () { return x + v00; });
                (function () { return x; });
            };
            for (var x in []) {
                _loop_12(x);
            }
            var _loop_13 = function (x) {
                v1_c = x;
                (function () { return x + v1_c; });
                (function () { return x; });
            };
            for (var x = 0; x < 1;) {
                _loop_13(x);
            }
            var _loop_14 = function () {
                var x = 1;
                v2_c = x;
                (function () { return x + v2_c; });
                (function () { return x; });
            };
            while (1 === 1) {
                _loop_14();
            }
            var _loop_15 = function () {
                var x = 1;
                v3_c = x;
                (function () { return x + v3_c; });
                (function () { return x; });
            };
            do {
                _loop_15();
            } while (1 === 1);
            var _loop_16 = function (y) {
                var x = 1;
                v4_c = x;
                (function () { return x + v4_c; });
                (function () { return x; });
            };
            for (var y = 0; y < 1;) {
                _loop_16(y);
            }
            var _loop_17 = function (x, y) {
                v5_c = x;
                (function () { return x + y + v5_c; });
                (function () { return x + y; });
            };
            for (var x = 0, y = 1; x < 1;) {
                _loop_17(x, y);
            }
            var _loop_18 = function () {
                var x = 1, y = 1;
                v6_c = x;
                (function () { return x + y + v6_c; });
                (function () { return x + y; });
            };
            while (1 === 1) {
                _loop_18();
            }
            var _loop_19 = function () {
                var x = 1, y = 1;
                v7_c = x;
                (function () { return x + y + v7_c; });
                (function () { return x + y; });
            };
            do {
                _loop_19();
            } while (1 === 1);
            var _loop_20 = function (y) {
                var x = 1;
                v8_c = x;
                (function () { return x + y + v8_c; });
                (function () { return x + y; });
            };
            for (var y = 0; y < 1;) {
                _loop_20(y);
            }
        }
    };
});
