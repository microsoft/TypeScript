// @noEmit: true
// @allowJs: true
// @checkJs: true
// @Filename: foo.js

/**
 * @callback FunctionReturningPromise
 * @returns {Promise<number>}
 */

/** @type {FunctionReturningPromise} */
function testPromise1() {
    console.log("Nope");
}

/** @type {FunctionReturningPromise} */
async function testPromise2() {
    return "asd";
}

var testPromise3 = /** @type {FunctionReturningPromise} */ function() {
    console.log("test")
}

/** @type {FunctionReturningPromise} */
var testPromise4 = function() {
    console.log("test")
}

/**
 * @callback FunctionReturningNever
 * @returns {never}
 */

/** @type {FunctionReturningNever} */
function testNever1() {

}

/** @type {FunctionReturningNever} */
async function testNever2() {
    return "asd";
}

var testNever3 = /** @type {FunctionReturningNever} */ function() {
    console.log("test")
}

/** @type {FunctionReturningNever} */
var testNever4 = function() {
    console.log("test")
}