//// [tests/cases/compiler/blockScopedBindingsReassignedInLoop5.ts] ////

//// [blockScopedBindingsReassignedInLoop5.ts]
for (let x = 1, y = 2; x < y; ++x, --y) {
    let a = () => x++ + y++;
    if (x == 1) 
        break;
    else 
        y = 5;
}


//// [blockScopedBindingsReassignedInLoop5.js]
var _loop_1 = function (x, y) {
    var a = function () { return x++ + y++; };
    if (x == 1)
        return out_x_1 = x, out_y_1 = y, "break";
    else
        y = 5;
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
