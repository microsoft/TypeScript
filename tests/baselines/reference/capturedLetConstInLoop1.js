//// [capturedLetConstInLoop1.ts]
declare function use(x: any): any;

//==== let
for (let x in {}) {
    (function() { return x});
    (() => x);
}

for (let x of []) {
    (function() { return x});
    (() => x);
}

for (let x = 0; x < 1; ++x) {
    (function() { return x});
    (() => x);
}

while (1 === 1) {
    let x;
    (function() { return x});
    (() => x);
}

do {
    let x;
    (function() { return x});
    (() => x);
} while (1 === 1)

for (let y = 0; y < 1; ++y) {
    let x = 1;
    (function() { return x});
    (() => x);
}

for (let x = 0, y = 1; x < 1; ++x) {
    (function() { return x + y});
    (() => x + y);
}

while (1 === 1) {
    let x, y;
    (function() { return x + y});
    (() => x + y);
}

do {
    let x, y;
    (function() { return x + y});
    (() => x + y);
} while (1 === 1)

for (let y = 0; y < 1; ++y) {
    let x = 1;
    (function() { return x + y});
    (() => x + y);
}

for (let y = (use(() => y), 0); y < 1; ++y) {
}

for (let y = 0; use(() => y), y < 1; ++y) {
}

for (let y = 0; y < 1; use(() => y), ++y) {
}

for (let y = (use(() => y), 0); use(() => y), y < 1; use(() => y), ++y) {
    use(() => y);
}

//=========const
for (const x in {}) {
    (function() { return x});
    (() => x);
}

for (const x of []) {
    (function() { return x});
    (() => x);
}

for (const x = 0; x < 1;) {
    (function() { return x});
    (() => x);
}

while (1 === 1) {
    const x = 1;
    (function() { return x});
    (() => x);
}

do {
    const x = 1;
    (function() { return x});
    (() => x);
} while (1 === 1)

for (const y = 0; y < 1;) {
    const x = 1;
    (function() { return x});
    (() => x);
}

for (const x = 0, y = 1; x < 1;) {
    (function() { return x + y});
    (() => x + y);
}

while (1 === 1) {
    const x = 1, y = 1;
    (function() { return x + y});
    (() => x + y);
}

do {
    const x = 1, y = 1;
    (function() { return x + y});
    (() => x + y);
} while (1 === 1)

for (const y = 0; y < 1;) {
    const x = 1;
    (function() { return x + y});
    (() => x + y);
}

// https://github.com/Microsoft/TypeScript/issues/20594
declare const sobj: { [x: string]: any };
for (let sx in sobj) {
    (() => sobj[sx]);
}
declare const iobj: { [x: number]: any };
for (let ix in iobj) {
    (() => iobj[ix]);
}

//// [capturedLetConstInLoop1.js]
var _loop_1 = function (x) {
    (function () { return x; });
    (function () { return x; });
};
//==== let
for (var x in {}) {
    _loop_1(x);
}
var _loop_2 = function (x) {
    (function () { return x; });
    (function () { return x; });
};
for (var _i = 0, _a = []; _i < _a.length; _i++) {
    var x = _a[_i];
    _loop_2(x);
}
var _loop_3 = function (x) {
    (function () { return x; });
    (function () { return x; });
};
for (var x = 0; x < 1; ++x) {
    _loop_3(x);
}
var _loop_4 = function () {
    var x;
    (function () { return x; });
    (function () { return x; });
};
while (1 === 1) {
    _loop_4();
}
var _loop_5 = function () {
    var x;
    (function () { return x; });
    (function () { return x; });
};
do {
    _loop_5();
} while (1 === 1);
var _loop_6 = function (y) {
    var x = 1;
    (function () { return x; });
    (function () { return x; });
};
for (var y = 0; y < 1; ++y) {
    _loop_6(y);
}
var _loop_7 = function (x, y) {
    (function () { return x + y; });
    (function () { return x + y; });
};
for (var x = 0, y = 1; x < 1; ++x) {
    _loop_7(x, y);
}
var _loop_8 = function () {
    var x, y;
    (function () { return x + y; });
    (function () { return x + y; });
};
while (1 === 1) {
    _loop_8();
}
var _loop_9 = function () {
    var x, y;
    (function () { return x + y; });
    (function () { return x + y; });
};
do {
    _loop_9();
} while (1 === 1);
var _loop_10 = function (y) {
    var x = 1;
    (function () { return x + y; });
    (function () { return x + y; });
};
for (var y = 0; y < 1; ++y) {
    _loop_10(y);
}
var _loop_init_1 = function () {
    var y = (use(function () { return y; }), 0);
    out_y_1 = y;
};
var out_y_1;
_loop_init_1();
for (var y = out_y_1; y < 1; ++y) {
}
var _loop_11 = function (y) {
    if (inc_1)
        ++y;
    else
        inc_1 = true;
    if (!(use(function () { return y; }), y < 1))
        return "break";
};
var inc_1 = false;
for (var y = 0;;) {
    var state_1 = _loop_11(y);
    if (state_1 === "break")
        break;
}
var _loop_12 = function (y) {
    if (inc_2)
        use(function () { return y; }), ++y;
    else
        inc_2 = true;
};
var inc_2 = false;
for (var y = 0; y < 1;) {
    _loop_12(y);
}
var _loop_init_2 = function () {
    var y = (use(function () { return y; }), 0);
    out_y_2 = y;
};
var _loop_13 = function (y) {
    if (inc_3)
        use(function () { return y; }), ++y;
    else
        inc_3 = true;
    if (!(use(function () { return y; }), y < 1))
        return out_y_2 = y, "break";
    use(function () { return y; });
};
var out_y_2, inc_3 = false;
_loop_init_2();
for (var y = out_y_2;;) {
    var state_2 = _loop_13(y);
    if (state_2 === "break")
        break;
}
var _loop_14 = function (x) {
    (function () { return x; });
    (function () { return x; });
};
//=========const
for (var x in {}) {
    _loop_14(x);
}
var _loop_15 = function (x) {
    (function () { return x; });
    (function () { return x; });
};
for (var _b = 0, _c = []; _b < _c.length; _b++) {
    var x = _c[_b];
    _loop_15(x);
}
var _loop_16 = function (x) {
    (function () { return x; });
    (function () { return x; });
};
for (var x = 0; x < 1;) {
    _loop_16(x);
}
var _loop_17 = function () {
    var x = 1;
    (function () { return x; });
    (function () { return x; });
};
while (1 === 1) {
    _loop_17();
}
var _loop_18 = function () {
    var x = 1;
    (function () { return x; });
    (function () { return x; });
};
do {
    _loop_18();
} while (1 === 1);
var _loop_19 = function (y) {
    var x = 1;
    (function () { return x; });
    (function () { return x; });
};
for (var y = 0; y < 1;) {
    _loop_19(y);
}
var _loop_20 = function (x, y) {
    (function () { return x + y; });
    (function () { return x + y; });
};
for (var x = 0, y = 1; x < 1;) {
    _loop_20(x, y);
}
var _loop_21 = function () {
    var x = 1, y = 1;
    (function () { return x + y; });
    (function () { return x + y; });
};
while (1 === 1) {
    _loop_21();
}
var _loop_22 = function () {
    var x = 1, y = 1;
    (function () { return x + y; });
    (function () { return x + y; });
};
do {
    _loop_22();
} while (1 === 1);
var _loop_23 = function (y) {
    var x = 1;
    (function () { return x + y; });
    (function () { return x + y; });
};
for (var y = 0; y < 1;) {
    _loop_23(y);
}
var _loop_24 = function (sx) {
    (function () { return sobj[sx]; });
};
for (var sx in sobj) {
    _loop_24(sx);
}
var _loop_25 = function (ix) {
    (function () { return iobj[ix]; });
};
for (var ix in iobj) {
    _loop_25(ix);
}
