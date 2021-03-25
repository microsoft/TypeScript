// @noEmit: true
// @allowJs: true
// @checkJs: true
// @Filename: foo.js

/**
 * @callback Func
 * @returns {Promise<number>}
 */

/** @type {Func} */
function test() {
    console.log("Nope");
}

/** @type {Func} */
async function test2() {
    return "asd";
}

var test3 = /** @type {Func} */ function() {
    console.log("test")
}

/** @type {Func} */
var test4 = function() {
    console.log("test")
}