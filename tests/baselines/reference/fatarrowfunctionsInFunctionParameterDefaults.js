//// [fatarrowfunctionsInFunctionParameterDefaults.ts]
function fn(x = () => this, y = x()) {

    // should be 4
    return y;

}

fn.call(4); // Should be 4


//// [fatarrowfunctionsInFunctionParameterDefaults.js]
function fn() {
    var _this = this;
    var x = (arguments[0] === void 0) ? function () { return _this; } : arguments[0];
    var y = (arguments[1] === void 0) ? x() : arguments[1];
    // should be 4
    return y;
}
fn.call(4); // Should be 4
