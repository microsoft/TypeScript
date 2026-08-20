// @target: ES6

// No errors, const declaration is not shadowed
function outer() {
    const x = 0;
    function inner() {
        var x = "inner";
    }
}