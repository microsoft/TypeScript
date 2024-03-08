//// [tests/cases/compiler/fatarrowfunctionsInFunctionParameterDefaults.ts] ////

//// [fatarrowfunctionsInFunctionParameterDefaults.ts]
function fn(x = () => this, y = x()) {

    // should be 4
    return y;

}

fn.call(4); // Should be 4


//// [fatarrowfunctionsInFunctionParameterDefaults.js]
function fn(x, y) {
    var _this = this;
    if (x === void 0) { x = function () { return _this; }; }
    if (y === void 0) { y = x(); }
    // should be 4
    return y;
}
fn.call(4); // Should be 4
