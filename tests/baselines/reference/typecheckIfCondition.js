//// [typecheckIfCondition.js]
// both uses of module should be an undefined symbol
function myWrapper() {
    if (!module.exports)
        module.exports = "";
    var x = null;
}
