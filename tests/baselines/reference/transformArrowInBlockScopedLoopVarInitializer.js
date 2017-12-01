//// [transformArrowInBlockScopedLoopVarInitializer.ts]
// https://github.com/Microsoft/TypeScript/issues/11236
while (true)
{
    let local = null;
    var a = () => local; // <-- Lambda should be converted to function()
}

//// [transformArrowInBlockScopedLoopVarInitializer.js]
var _loop_1 = function () {
    var local = null;
    a = function () { return local; }; // <-- Lambda should be converted to function()
};
var a;
// https://github.com/Microsoft/TypeScript/issues/11236
while (true) {
    _loop_1();
}
