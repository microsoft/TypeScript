//// [tests/cases/compiler/capturedLetConstInLoop7.ts] ////

//// [capturedLetConstInLoop7.ts]
//===let
l0:
for (let x of []) {
    (function() { return x});
    (() => x);
    if (x == 1) {
        break;
    }
    if (x == 1) {
        break l0;
    }
    if (x == 2) {
        continue;
    }
    if (x == 2) {
        continue l0;
    }
}

l00:
for (let x in []) {
    (function() { return x});
    (() => x);
    if (x == "1") {
        break;
    }
    if (x == "1") {
        break l00;
    }
    if (x == "2") {
        continue;
    }
    if (x == "2") {
        continue l00;
    }
}

l1:
for (let x = 0; x < 1; ++x) {
    (function() { return x});
    (() => x);
    if (x == 1) {
        break;
    }
    if (x == 1) {
        break l1;
    }
    if (x == 2) {
        continue;
    }
    if (x == 2) {
        continue l1;
    }
}

l2:
while (1 === 1) {
    let x;
    (function() { return x});
    (() => x);
    if (x == 1) {
        break;
    }
    if (x == 1) {
        break l2;
    }
    if (x == 2) {
        continue;
    }
    if (x == 2) {
        continue l2;
    }
}

l3:
do {
    let x;
    (function() { return x});
    (() => x);
    if (x == 1) {
        break;
    }
    if (x == 1) {
        break l3;
    }
    if (x == 2) {
        continue;
    }
    if (x == 2) {
        continue l3;
    }
} while (1 === 1)

l4:
for (let y = 0; y < 1; ++y) {
    let x = 1;
    (function() { return x});
    (() => x);
    if (x == 1) {
        break;
    }
    if (x == 1) {
        break l4;
    }
    if (x == 2) {
        continue;
    }
    if (x == 2) {
        continue l4;
    }
}

l5:
for (let x = 0, y = 1; x < 1; ++x) {
    (function() { return x + y});
    (() => x + y);
    if (x == 1) {
        break;
    }
    if (x == 1) {
        break l5;
    }
    if (x == 2) {
        continue;
    }
    if (x == 2) {
        continue l5;
    }
}

l6:
while (1 === 1) {
    let x, y;
    (function() { return x + y});
    (() => x + y);
    if (x == 1) {
        break;
    }
    if (x == 1) {
        break l6;
    }
    if (x == 2) {
        continue;
    }
    if (x == 2) {
        continue l6;
    }

}

l7:
do {
    let x, y;
    (function() { return x + y});
    (() => x + y);
    if (x == 1) {
        break;
    }
    if (x == 1) {
        break l7;
    }
    if (x == 2) {
        continue;
    }
    if (x == 2) {
        continue l7;
    }
} while (1 === 1)

l8:
for (let y = 0; y < 1; ++y) {
    let x = 1;
    (function() { return x + y});
    (() => x + y);
    if (x == 1) {
        break;
    }
    if (x == 1) {
        break l8;
    }
    if (x == 2) {
        continue;
    }
    if (x == 2) {
        continue l8;
    }
}

//===const
l0_c:
for (const x of []) {
    (function() { return x});
    (() => x);
    if (x == 1) {
        break;
    }
    if (x == 1) {
        break l0_c;
    }
    if (x == 2) {
        continue;
    }
    if (x == 2) {
        continue l0_c;
    }
}

l00_c:
for (const x in []) {
    (function() { return x});
    (() => x);
    if (x == "1") {
        break;
    }
    if (x == "1") {
        break l00_c;
    }
    if (x == "2") {
        continue;
    }
    if (x == "2") {
        continue l00_c;
    }
}

l1_c:
for (const x = 0; x < 1;) {
    (function() { return x});
    (() => x);
    if (x == 1) {
        break;
    }
    if (x == 1) {
        break l1_c;
    }
    if (x == 2) {
        continue;
    }
    if (x == 2) {
        continue l1_c;
    }
}

l2_c:
while (1 === 1) {
    const x = 1;
    (function() { return x});
    (() => x);
    if (x == 1) {
        break;
    }
    if (x == 1) {
        break l2_c;
    }
    if (x == 2) {
        continue;
    }
    if (x == 2) {
        continue l2_c;
    }
}

l3_c:
do {
    const x = 1;
    (function() { return x});
    (() => x);
    if (x == 1) {
        break;
    }
    if (x == 1) {
        break l3_c;
    }
    if (x == 2) {
        continue;
    }
    if (x == 2) {
        continue l3_c;
    }
} while (1 === 1)

l4_c:
for (const y = 0; y < 1;) {
    const x = 1;
    (function() { return x});
    (() => x);
    if (x == 1) {
        break;
    }
    if (x == 1) {
        break l4_c;
    }
    if (x == 2) {
        continue;
    }
    if (x == 2) {
        continue l4_c;
    }
}

l5_c:
for (const x = 0, y = 1; x < 1;) {
    (function() { return x + y});
    (() => x + y);
    if (x == 1) {
        break;
    }
    if (x == 1) {
        break l5_c;
    }
    if (x == 2) {
        continue;
    }
    if (x == 2) {
        continue l5_c;
    }
}

l6_c:
while (1 === 1) {
    const x = 1, y = 1;
    (function() { return x + y});
    (() => x + y);
    if (x == 1) {
        break;
    }
    if (x == 1) {
        break l6_c;
    }
    if (x == 2) {
        continue;
    }
    if (x == 2) {
        continue l6_c;
    }

}

l7_c:
do {
    const x = 1, y = 1;
    (function() { return x + y});
    (() => x + y);
    if (x == 1) {
        break;
    }
    if (x == 1) {
        break l7_c;
    }
    if (x == 2) {
        continue;
    }
    if (x == 2) {
        continue l7_c;
    }
} while (1 === 1)

l8_c:
for (const y = 0; y < 1;) {
    const x = 1;
    (function() { return x + y});
    (() => x + y);
    if (x == 1) {
        break;
    }
    if (x == 1) {
        break l8_c;
    }
    if (x == 2) {
        continue;
    }
    if (x == 2) {
        continue l8_c;
    }
}

//// [capturedLetConstInLoop7.js]
var _loop_1 = function (x) {
    (function () { return x; });
    (function () { return x; });
    if (x == 1) {
        return "break";
    }
    if (x == 1) {
        return "break-l0";
    }
    if (x == 2) {
        return "continue";
    }
    if (x == 2) {
        return "continue-l0";
    }
};
//===let
l0: for (var _i = 0, _a = []; _i < _a.length; _i++) {
    var x = _a[_i];
    var state_1 = _loop_1(x);
    if (state_1 === "break")
        break;
    switch (state_1) {
        case "break-l0": break l0;
        case "continue-l0": continue l0;
    }
}
var _loop_2 = function (x) {
    (function () { return x; });
    (function () { return x; });
    if (x == "1") {
        return "break";
    }
    if (x == "1") {
        return "break-l00";
    }
    if (x == "2") {
        return "continue";
    }
    if (x == "2") {
        return "continue-l00";
    }
};
l00: for (var x in []) {
    var state_2 = _loop_2(x);
    if (state_2 === "break")
        break;
    switch (state_2) {
        case "break-l00": break l00;
        case "continue-l00": continue l00;
    }
}
var _loop_3 = function (x) {
    (function () { return x; });
    (function () { return x; });
    if (x == 1) {
        return "break";
    }
    if (x == 1) {
        return "break-l1";
    }
    if (x == 2) {
        return "continue";
    }
    if (x == 2) {
        return "continue-l1";
    }
};
l1: for (var x = 0; x < 1; ++x) {
    var state_3 = _loop_3(x);
    if (state_3 === "break")
        break;
    switch (state_3) {
        case "break-l1": break l1;
        case "continue-l1": continue l1;
    }
}
var _loop_4 = function () {
    var x;
    (function () { return x; });
    (function () { return x; });
    if (x == 1) {
        return "break";
    }
    if (x == 1) {
        return "break-l2";
    }
    if (x == 2) {
        return "continue";
    }
    if (x == 2) {
        return "continue-l2";
    }
};
l2: while (1 === 1) {
    var state_4 = _loop_4();
    if (state_4 === "break")
        break;
    switch (state_4) {
        case "break-l2": break l2;
        case "continue-l2": continue l2;
    }
}
var _loop_5 = function () {
    var x;
    (function () { return x; });
    (function () { return x; });
    if (x == 1) {
        return "break";
    }
    if (x == 1) {
        return "break-l3";
    }
    if (x == 2) {
        return "continue";
    }
    if (x == 2) {
        return "continue-l3";
    }
};
l3: do {
    var state_5 = _loop_5();
    if (state_5 === "break")
        break;
    switch (state_5) {
        case "break-l3": break l3;
        case "continue-l3": continue l3;
    }
} while (1 === 1);
var _loop_6 = function (y) {
    var x = 1;
    (function () { return x; });
    (function () { return x; });
    if (x == 1) {
        return "break";
    }
    if (x == 1) {
        return "break-l4";
    }
    if (x == 2) {
        return "continue";
    }
    if (x == 2) {
        return "continue-l4";
    }
};
l4: for (var y = 0; y < 1; ++y) {
    var state_6 = _loop_6(y);
    if (state_6 === "break")
        break;
    switch (state_6) {
        case "break-l4": break l4;
        case "continue-l4": continue l4;
    }
}
var _loop_7 = function (x, y) {
    (function () { return x + y; });
    (function () { return x + y; });
    if (x == 1) {
        return "break";
    }
    if (x == 1) {
        return "break-l5";
    }
    if (x == 2) {
        return "continue";
    }
    if (x == 2) {
        return "continue-l5";
    }
};
l5: for (var x = 0, y = 1; x < 1; ++x) {
    var state_7 = _loop_7(x, y);
    if (state_7 === "break")
        break;
    switch (state_7) {
        case "break-l5": break l5;
        case "continue-l5": continue l5;
    }
}
var _loop_8 = function () {
    var x, y;
    (function () { return x + y; });
    (function () { return x + y; });
    if (x == 1) {
        return "break";
    }
    if (x == 1) {
        return "break-l6";
    }
    if (x == 2) {
        return "continue";
    }
    if (x == 2) {
        return "continue-l6";
    }
};
l6: while (1 === 1) {
    var state_8 = _loop_8();
    if (state_8 === "break")
        break;
    switch (state_8) {
        case "break-l6": break l6;
        case "continue-l6": continue l6;
    }
}
var _loop_9 = function () {
    var x, y;
    (function () { return x + y; });
    (function () { return x + y; });
    if (x == 1) {
        return "break";
    }
    if (x == 1) {
        return "break-l7";
    }
    if (x == 2) {
        return "continue";
    }
    if (x == 2) {
        return "continue-l7";
    }
};
l7: do {
    var state_9 = _loop_9();
    if (state_9 === "break")
        break;
    switch (state_9) {
        case "break-l7": break l7;
        case "continue-l7": continue l7;
    }
} while (1 === 1);
var _loop_10 = function (y) {
    var x = 1;
    (function () { return x + y; });
    (function () { return x + y; });
    if (x == 1) {
        return "break";
    }
    if (x == 1) {
        return "break-l8";
    }
    if (x == 2) {
        return "continue";
    }
    if (x == 2) {
        return "continue-l8";
    }
};
l8: for (var y = 0; y < 1; ++y) {
    var state_10 = _loop_10(y);
    if (state_10 === "break")
        break;
    switch (state_10) {
        case "break-l8": break l8;
        case "continue-l8": continue l8;
    }
}
var _loop_11 = function (x) {
    (function () { return x; });
    (function () { return x; });
    if (x == 1) {
        return "break";
    }
    if (x == 1) {
        return "break-l0_c";
    }
    if (x == 2) {
        return "continue";
    }
    if (x == 2) {
        return "continue-l0_c";
    }
};
//===const
l0_c: for (var _b = 0, _c = []; _b < _c.length; _b++) {
    var x = _c[_b];
    var state_11 = _loop_11(x);
    if (state_11 === "break")
        break;
    switch (state_11) {
        case "break-l0_c": break l0_c;
        case "continue-l0_c": continue l0_c;
    }
}
var _loop_12 = function (x) {
    (function () { return x; });
    (function () { return x; });
    if (x == "1") {
        return "break";
    }
    if (x == "1") {
        return "break-l00_c";
    }
    if (x == "2") {
        return "continue";
    }
    if (x == "2") {
        return "continue-l00_c";
    }
};
l00_c: for (var x in []) {
    var state_12 = _loop_12(x);
    if (state_12 === "break")
        break;
    switch (state_12) {
        case "break-l00_c": break l00_c;
        case "continue-l00_c": continue l00_c;
    }
}
var _loop_13 = function (x) {
    (function () { return x; });
    (function () { return x; });
    if (x == 1) {
        return "break";
    }
    if (x == 1) {
        return "break-l1_c";
    }
    if (x == 2) {
        return "continue";
    }
    if (x == 2) {
        return "continue-l1_c";
    }
};
l1_c: for (var x = 0; x < 1;) {
    var state_13 = _loop_13(x);
    if (state_13 === "break")
        break;
    switch (state_13) {
        case "break-l1_c": break l1_c;
        case "continue-l1_c": continue l1_c;
    }
}
var _loop_14 = function () {
    var x = 1;
    (function () { return x; });
    (function () { return x; });
    if (x == 1) {
        return "break";
    }
    if (x == 1) {
        return "break-l2_c";
    }
    if (x == 2) {
        return "continue";
    }
    if (x == 2) {
        return "continue-l2_c";
    }
};
l2_c: while (1 === 1) {
    var state_14 = _loop_14();
    if (state_14 === "break")
        break;
    switch (state_14) {
        case "break-l2_c": break l2_c;
        case "continue-l2_c": continue l2_c;
    }
}
var _loop_15 = function () {
    var x = 1;
    (function () { return x; });
    (function () { return x; });
    if (x == 1) {
        return "break";
    }
    if (x == 1) {
        return "break-l3_c";
    }
    if (x == 2) {
        return "continue";
    }
    if (x == 2) {
        return "continue-l3_c";
    }
};
l3_c: do {
    var state_15 = _loop_15();
    if (state_15 === "break")
        break;
    switch (state_15) {
        case "break-l3_c": break l3_c;
        case "continue-l3_c": continue l3_c;
    }
} while (1 === 1);
var _loop_16 = function (y) {
    var x = 1;
    (function () { return x; });
    (function () { return x; });
    if (x == 1) {
        return "break";
    }
    if (x == 1) {
        return "break-l4_c";
    }
    if (x == 2) {
        return "continue";
    }
    if (x == 2) {
        return "continue-l4_c";
    }
};
l4_c: for (var y = 0; y < 1;) {
    var state_16 = _loop_16(y);
    if (state_16 === "break")
        break;
    switch (state_16) {
        case "break-l4_c": break l4_c;
        case "continue-l4_c": continue l4_c;
    }
}
var _loop_17 = function (x, y) {
    (function () { return x + y; });
    (function () { return x + y; });
    if (x == 1) {
        return "break";
    }
    if (x == 1) {
        return "break-l5_c";
    }
    if (x == 2) {
        return "continue";
    }
    if (x == 2) {
        return "continue-l5_c";
    }
};
l5_c: for (var x = 0, y = 1; x < 1;) {
    var state_17 = _loop_17(x, y);
    if (state_17 === "break")
        break;
    switch (state_17) {
        case "break-l5_c": break l5_c;
        case "continue-l5_c": continue l5_c;
    }
}
var _loop_18 = function () {
    var x = 1, y = 1;
    (function () { return x + y; });
    (function () { return x + y; });
    if (x == 1) {
        return "break";
    }
    if (x == 1) {
        return "break-l6_c";
    }
    if (x == 2) {
        return "continue";
    }
    if (x == 2) {
        return "continue-l6_c";
    }
};
l6_c: while (1 === 1) {
    var state_18 = _loop_18();
    if (state_18 === "break")
        break;
    switch (state_18) {
        case "break-l6_c": break l6_c;
        case "continue-l6_c": continue l6_c;
    }
}
var _loop_19 = function () {
    var x = 1, y = 1;
    (function () { return x + y; });
    (function () { return x + y; });
    if (x == 1) {
        return "break";
    }
    if (x == 1) {
        return "break-l7_c";
    }
    if (x == 2) {
        return "continue";
    }
    if (x == 2) {
        return "continue-l7_c";
    }
};
l7_c: do {
    var state_19 = _loop_19();
    if (state_19 === "break")
        break;
    switch (state_19) {
        case "break-l7_c": break l7_c;
        case "continue-l7_c": continue l7_c;
    }
} while (1 === 1);
var _loop_20 = function (y) {
    var x = 1;
    (function () { return x + y; });
    (function () { return x + y; });
    if (x == 1) {
        return "break";
    }
    if (x == 1) {
        return "break-l8_c";
    }
    if (x == 2) {
        return "continue";
    }
    if (x == 2) {
        return "continue-l8_c";
    }
};
l8_c: for (var y = 0; y < 1;) {
    var state_20 = _loop_20(y);
    if (state_20 === "break")
        break;
    switch (state_20) {
        case "break-l8_c": break l8_c;
        case "continue-l8_c": continue l8_c;
    }
}
