//// [tests/cases/compiler/blockScopedBindingsReassignedInLoop2.ts] ////

//// [blockScopedBindingsReassignedInLoop2.ts]
for (let x = 1, y = 2; x < y; ++x, --y) {
    let a = () => x++ + y++;
    if (x == 1) {
        break;
    }
    else {
        y = 5;
    }
}

for (let x = 1, y = 2; x < y; ++x, --y) {
    let a = () => x++ + y++;
    if (x == 1) {
        continue;
    }
    else {
        y = 5;
    }
}

loop:
for (let x = 1, y = 2; x < y; ++x, --y) {
    let a = () => x++ + y++;
    if (x == 1) {
        break loop;
    }
    else {
        y = 5;
    }
}

loop:
for (let x = 1, y = 2; x < y; ++x, --y) {
    let a = () => x++ + y++;
    if (x == 1) {
        continue loop;
    }
    else {
        y = 5;
    }
}

//// [blockScopedBindingsReassignedInLoop2.js]
var _loop_1 = function (x, y) {
    var a = function () { return x++ + y++; };
    if (x == 1) {
        return out_x_1 = x, out_y_1 = y, "break";
    }
    else {
        y = 5;
    }
    out_x_1 = x;
    out_y_1 = y;
};
var out_x_1, out_y_1;
for (var x = 1, y = 2; x < y; ++x, --y) {
    var state_1 = _loop_1(x, y);
    x = out_x_1;
    y = out_y_1;
    if (state_1 === "break")
        break;
}
var _loop_2 = function (x, y) {
    var a = function () { return x++ + y++; };
    if (x == 1) {
        return out_x_2 = x, out_y_2 = y, "continue";
    }
    else {
        y = 5;
    }
    out_x_2 = x;
    out_y_2 = y;
};
var out_x_2, out_y_2;
for (var x = 1, y = 2; x < y; ++x, --y) {
    _loop_2(x, y);
    x = out_x_2;
    y = out_y_2;
}
var _loop_3 = function (x, y) {
    var a = function () { return x++ + y++; };
    if (x == 1) {
        return out_x_3 = x, out_y_3 = y, "break-loop";
    }
    else {
        y = 5;
    }
    out_x_3 = x;
    out_y_3 = y;
};
var out_x_3, out_y_3;
loop: for (var x = 1, y = 2; x < y; ++x, --y) {
    var state_2 = _loop_3(x, y);
    x = out_x_3;
    y = out_y_3;
    switch (state_2) {
        case "break-loop": break loop;
    }
}
var _loop_4 = function (x, y) {
    var a = function () { return x++ + y++; };
    if (x == 1) {
        return out_x_4 = x, out_y_4 = y, "continue-loop";
    }
    else {
        y = 5;
    }
    out_x_4 = x;
    out_y_4 = y;
};
var out_x_4, out_y_4;
loop: for (var x = 1, y = 2; x < y; ++x, --y) {
    var state_3 = _loop_4(x, y);
    x = out_x_4;
    y = out_y_4;
    switch (state_3) {
        case "continue-loop": continue loop;
    }
}
