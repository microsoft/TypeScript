//// [tests/cases/compiler/blockScopedBindingsReassignedInLoop4.ts] ////

//// [blockScopedBindingsReassignedInLoop4.ts]
function f1() {
    for (let x = 1, y = 2; x < y; ++x, --y) {
        let a = () => x++ + y++;
        if (x == 1) {
            return 1;
        }
        else {
            y = 5;
        }
    }
}

//// [blockScopedBindingsReassignedInLoop4.js]
function f1() {
    var _loop_1 = function (x, y) {
        var a = function () { return x++ + y++; };
        if (x == 1) {
            return { value: 1 };
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
        if (typeof state_1 === "object")
            return state_1.value;
    }
}
