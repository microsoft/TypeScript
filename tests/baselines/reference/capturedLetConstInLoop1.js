//// [capturedLetConstInLoop1.ts]
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
var _loop_11 = function (x) {
    (function () { return x; });
    (function () { return x; });
};
//=========const
for (var x in {}) {
    _loop_11(x);
}
var _loop_12 = function (x) {
    (function () { return x; });
    (function () { return x; });
};
for (var _b = 0, _c = []; _b < _c.length; _b++) {
    var x = _c[_b];
    _loop_12(x);
}
var _loop_13 = function (x) {
    (function () { return x; });
    (function () { return x; });
};
for (var x = 0; x < 1;) {
    _loop_13(x);
}
var _loop_14 = function () {
    var x = 1;
    (function () { return x; });
    (function () { return x; });
};
while (1 === 1) {
    _loop_14();
}
var _loop_15 = function () {
    var x = 1;
    (function () { return x; });
    (function () { return x; });
};
do {
    _loop_15();
} while (1 === 1);
var _loop_16 = function (y) {
    var x = 1;
    (function () { return x; });
    (function () { return x; });
};
for (var y = 0; y < 1;) {
    _loop_16(y);
}
var _loop_17 = function (x, y) {
    (function () { return x + y; });
    (function () { return x + y; });
};
for (var x = 0, y = 1; x < 1;) {
    _loop_17(x, y);
}
var _loop_18 = function () {
    var x = 1, y = 1;
    (function () { return x + y; });
    (function () { return x + y; });
};
while (1 === 1) {
    _loop_18();
}
var _loop_19 = function () {
    var x = 1, y = 1;
    (function () { return x + y; });
    (function () { return x + y; });
};
do {
    _loop_19();
} while (1 === 1);
var _loop_20 = function (y) {
    var x = 1;
    (function () { return x + y; });
    (function () { return x + y; });
};
for (var y = 0; y < 1;) {
    _loop_20(y);
}
