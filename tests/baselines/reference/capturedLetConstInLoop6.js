//// [tests/cases/compiler/capturedLetConstInLoop6.ts] ////

//// [capturedLetConstInLoop6.ts]
// ====let
for (let x of []) {
    (function() { return x});
    (() => x);
    if (x == 1) {
        break;
    }
    if (x == 2) {
        continue;
    }
}

for (let x in []) {
    (function() { return x});
    (() => x);
    if (x == "1") {
        break;
    }
    if (x == "2") {
        continue;
    }
}


for (let x = 0; x < 1; ++x) {
    (function() { return x});
    (() => x);
    if (x == 1) {
        break;
    }
    if (x == 2) {
        continue;
    }
}

while (1 === 1) {
    let x;
    (function() { return x});
    (() => x);
    if (x == 1) {
        break;
    }
    if (x == 2) {
        continue;
    }
}

do {
    let x;
    (function() { return x});
    (() => x);
    if (x == 1) {
        break;
    }
    if (x == 2) {
        continue;
    }
} while (1 === 1)

for (let y = 0; y < 1; ++y) {
    let x = 1;
    (function() { return x});
    (() => x);
    if (x == 1) {
        break;
    }
    if (x == 2) {
        continue;
    }
}

for (let x = 0, y = 1; x < 1; ++x) {
    (function() { return x + y});
    (() => x + y);
    if (x == 1) {
        break;
    }
    if (x == 2) {
        continue;
    }
}

while (1 === 1) {
    let x, y;
    (function() { return x + y});
    (() => x + y);
    if (x == 1) {
        break;
    }
    if (x == 2) {
        continue;
    }
}

do {
    let x, y;
    (function() { return x + y});
    (() => x + y);
    if (x == 1) {
        break;
    }
    if (x == 2) {
        continue;
    }
} while (1 === 1)

for (let y = 0; y < 1; ++y) {
    let x = 1;
    (function() { return x + y});
    (() => x + y);
    if (x == 1) {
        break;
    }
    if (x == 2) {
        continue;
    }
}

// ====const

for (const x of []) {
    (function() { return x});
    (() => x);
    if (x == 1) {
        break;
    }
    if (x == 2) {
        continue;
    }
}

for (const x in []) {
    (function() { return x});
    (() => x);
    if (x == "1") {
        break;
    }
    if (x == "2") {
        continue;
    }
}


for (const x = 0; x < 1;) {
    (function() { return x});
    (() => x);
    if (x == 1) {
        break;
    }
    if (x == 2) {
        continue;
    }
}

while (1 === 1) {
    const x = 1;
    (function() { return x});
    (() => x);
    if (x == 1) {
        break;
    }
    if (x == 2) {
        continue;
    }
}

do {
    const x = 1;
    (function() { return x});
    (() => x);
    if (x == 1) {
        break;
    }
    if (x == 2) {
        continue;
    }
} while (1 === 1)

for (const y = 0; y < 1;) {
    const x = 1;
    (function() { return x});
    (() => x);
    if (x == 1) {
        break;
    }
    if (x == 2) {
        continue;
    }
}

for (const x = 0, y = 1; x < 1;) {
    (function() { return x + y});
    (() => x + y);
    if (x == 1) {
        break;
    }
    if (x == 2) {
        continue;
    }
}

while (1 === 1) {
    const x = 1, y = 1;
    (function() { return x + y});
    (() => x + y);
    if (x == 1) {
        break;
    }
    if (x == 2) {
        continue;
    }
}

do {
    const x = 1, y = 1;
    (function() { return x + y});
    (() => x + y);
    if (x == 1) {
        break;
    }
    if (x == 2) {
        continue;
    }
} while (1 === 1)

for (const y = 0; y < 1;) {
    const x = 1;
    (function() { return x + y});
    (() => x + y);
    if (x == 1) {
        break;
    }
    if (x == 2) {
        continue;
    }
}



//// [capturedLetConstInLoop6.js]
var _loop_1 = function (x) {
    (function () { return x; });
    (function () { return x; });
    if (x == 1) {
        return "break";
    }
    if (x == 2) {
        return "continue";
    }
};
// ====let
for (var _i = 0, _a = []; _i < _a.length; _i++) {
    var x = _a[_i];
    var state_1 = _loop_1(x);
    if (state_1 === "break")
        break;
}
var _loop_2 = function (x) {
    (function () { return x; });
    (function () { return x; });
    if (x == "1") {
        return "break";
    }
    if (x == "2") {
        return "continue";
    }
};
for (var x in []) {
    var state_2 = _loop_2(x);
    if (state_2 === "break")
        break;
}
var _loop_3 = function (x) {
    (function () { return x; });
    (function () { return x; });
    if (x == 1) {
        return "break";
    }
    if (x == 2) {
        return "continue";
    }
};
for (var x = 0; x < 1; ++x) {
    var state_3 = _loop_3(x);
    if (state_3 === "break")
        break;
}
var _loop_4 = function () {
    var x;
    (function () { return x; });
    (function () { return x; });
    if (x == 1) {
        return "break";
    }
    if (x == 2) {
        return "continue";
    }
};
while (1 === 1) {
    var state_4 = _loop_4();
    if (state_4 === "break")
        break;
}
var _loop_5 = function () {
    var x;
    (function () { return x; });
    (function () { return x; });
    if (x == 1) {
        return "break";
    }
    if (x == 2) {
        return "continue";
    }
};
do {
    var state_5 = _loop_5();
    if (state_5 === "break")
        break;
} while (1 === 1);
var _loop_6 = function (y) {
    var x = 1;
    (function () { return x; });
    (function () { return x; });
    if (x == 1) {
        return "break";
    }
    if (x == 2) {
        return "continue";
    }
};
for (var y = 0; y < 1; ++y) {
    var state_6 = _loop_6(y);
    if (state_6 === "break")
        break;
}
var _loop_7 = function (x, y) {
    (function () { return x + y; });
    (function () { return x + y; });
    if (x == 1) {
        return "break";
    }
    if (x == 2) {
        return "continue";
    }
};
for (var x = 0, y = 1; x < 1; ++x) {
    var state_7 = _loop_7(x, y);
    if (state_7 === "break")
        break;
}
var _loop_8 = function () {
    var x, y;
    (function () { return x + y; });
    (function () { return x + y; });
    if (x == 1) {
        return "break";
    }
    if (x == 2) {
        return "continue";
    }
};
while (1 === 1) {
    var state_8 = _loop_8();
    if (state_8 === "break")
        break;
}
var _loop_9 = function () {
    var x, y;
    (function () { return x + y; });
    (function () { return x + y; });
    if (x == 1) {
        return "break";
    }
    if (x == 2) {
        return "continue";
    }
};
do {
    var state_9 = _loop_9();
    if (state_9 === "break")
        break;
} while (1 === 1);
var _loop_10 = function (y) {
    var x = 1;
    (function () { return x + y; });
    (function () { return x + y; });
    if (x == 1) {
        return "break";
    }
    if (x == 2) {
        return "continue";
    }
};
for (var y = 0; y < 1; ++y) {
    var state_10 = _loop_10(y);
    if (state_10 === "break")
        break;
}
var _loop_11 = function (x) {
    (function () { return x; });
    (function () { return x; });
    if (x == 1) {
        return "break";
    }
    if (x == 2) {
        return "continue";
    }
};
// ====const
for (var _b = 0, _c = []; _b < _c.length; _b++) {
    var x = _c[_b];
    var state_11 = _loop_11(x);
    if (state_11 === "break")
        break;
}
var _loop_12 = function (x) {
    (function () { return x; });
    (function () { return x; });
    if (x == "1") {
        return "break";
    }
    if (x == "2") {
        return "continue";
    }
};
for (var x in []) {
    var state_12 = _loop_12(x);
    if (state_12 === "break")
        break;
}
var _loop_13 = function (x) {
    (function () { return x; });
    (function () { return x; });
    if (x == 1) {
        return "break";
    }
    if (x == 2) {
        return "continue";
    }
};
for (var x = 0; x < 1;) {
    var state_13 = _loop_13(x);
    if (state_13 === "break")
        break;
}
var _loop_14 = function () {
    var x = 1;
    (function () { return x; });
    (function () { return x; });
    if (x == 1) {
        return "break";
    }
    if (x == 2) {
        return "continue";
    }
};
while (1 === 1) {
    var state_14 = _loop_14();
    if (state_14 === "break")
        break;
}
var _loop_15 = function () {
    var x = 1;
    (function () { return x; });
    (function () { return x; });
    if (x == 1) {
        return "break";
    }
    if (x == 2) {
        return "continue";
    }
};
do {
    var state_15 = _loop_15();
    if (state_15 === "break")
        break;
} while (1 === 1);
var _loop_16 = function (y) {
    var x = 1;
    (function () { return x; });
    (function () { return x; });
    if (x == 1) {
        return "break";
    }
    if (x == 2) {
        return "continue";
    }
};
for (var y = 0; y < 1;) {
    var state_16 = _loop_16(y);
    if (state_16 === "break")
        break;
}
var _loop_17 = function (x, y) {
    (function () { return x + y; });
    (function () { return x + y; });
    if (x == 1) {
        return "break";
    }
    if (x == 2) {
        return "continue";
    }
};
for (var x = 0, y = 1; x < 1;) {
    var state_17 = _loop_17(x, y);
    if (state_17 === "break")
        break;
}
var _loop_18 = function () {
    var x = 1, y = 1;
    (function () { return x + y; });
    (function () { return x + y; });
    if (x == 1) {
        return "break";
    }
    if (x == 2) {
        return "continue";
    }
};
while (1 === 1) {
    var state_18 = _loop_18();
    if (state_18 === "break")
        break;
}
var _loop_19 = function () {
    var x = 1, y = 1;
    (function () { return x + y; });
    (function () { return x + y; });
    if (x == 1) {
        return "break";
    }
    if (x == 2) {
        return "continue";
    }
};
do {
    var state_19 = _loop_19();
    if (state_19 === "break")
        break;
} while (1 === 1);
var _loop_20 = function (y) {
    var x = 1;
    (function () { return x + y; });
    (function () { return x + y; });
    if (x == 1) {
        return "break";
    }
    if (x == 2) {
        return "continue";
    }
};
for (var y = 0; y < 1;) {
    var state_20 = _loop_20(y);
    if (state_20 === "break")
        break;
}
