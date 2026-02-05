//// [tests/cases/compiler/fatarrowfunctionsInFunctionParameterDefaults.ts] ////

//// [fatarrowfunctionsInFunctionParameterDefaults.ts]
function fn(x = () => this, y = x()) {

    // should be 4
    return y;

}

fn.call(4); // Should be 4


//// [fatarrowfunctionsInFunctionParameterDefaults.js]
"use strict";
function fn(x = () => this, y = x()) {
    // should be 4
    return y;
}
fn.call(4); // Should be 4
