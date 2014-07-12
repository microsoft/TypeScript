//// [fatarrowfunctionsInFunctionParameterDefaults.ts]
function fn(x = () => this, y = x()) {

    // should be 4
    return y;

}

fn.call(4); // Should be 4


//// [fatarrowfunctionsInFunctionParameterDefaults.js]
function fn(x, y) {
    var _this = this;
    if (typeof x === "undefined") { x = function () {
        return _this;
    }; }
    if (typeof y === "undefined") { y = x(); }
    // should be 4
    return y;
}

fn.call(4); // Should be 4
