//// [tests/cases/compiler/blockScopedBindingsReassignedInLoop6.ts] ////

//// [blockScopedBindingsReassignedInLoop6.ts]
function f1() {
    for (let [x, y] = [1, 2]; x < y; ++x, --y) {
        let a = () => x++ + y++;
        if (x == 1)
            break;
        else if (y == 2)
            y = 5;
        else
            return;
    }
}

function f2() {
    for (let [{a: x, b: {c: y}}] = [{a: 1, b: {c: 2}}]; x < y; ++x, --y) {
        let a = () => x++ + y++;
        if (x == 1)
            break;
        else if (y == 2)
            y = 5;
        else
            return;
    }
}







//// [blockScopedBindingsReassignedInLoop6.js]
function f1() {
    var _loop_1 = function (x, y) {
        var a = function () { return x++ + y++; };
        if (x == 1)
            return out_x_1 = x, out_y_1 = y, "break";
        else if (y == 2)
            y = 5;
        else
            return { value: void 0 };
        out_x_1 = x;
        out_y_1 = y;
    };
    var out_x_1, out_y_1;
    for (var _a = [1, 2], x = _a[0], y = _a[1]; x < y; ++x, --y) {
        var state_1 = _loop_1(x, y);
        x = out_x_1;
        y = out_y_1;
        if (typeof state_1 === "object")
            return state_1.value;
        if (state_1 === "break")
            break;
    }
}
function f2() {
    var _loop_2 = function (x, y) {
        var a = function () { return x++ + y++; };
        if (x == 1)
            return out_x_2 = x, out_y_2 = y, "break";
        else if (y == 2)
            y = 5;
        else
            return { value: void 0 };
        out_x_2 = x;
        out_y_2 = y;
    };
    var out_x_2, out_y_2;
    for (var _a = [{ a: 1, b: { c: 2 } }][0], x = _a.a, y = _a.b.c; x < y; ++x, --y) {
        var state_2 = _loop_2(x, y);
        x = out_x_2;
        y = out_y_2;
        if (typeof state_2 === "object")
            return state_2.value;
        if (state_2 === "break")
            break;
    }
}
