//// [tests/cases/compiler/transformArrowInBlockScopedLoopVarInitializer.ts] ////

//// [transformArrowInBlockScopedLoopVarInitializer.ts]
// https://github.com/Microsoft/TypeScript/issues/11236
while (true)
{
    let local = null;
    var a = () => local; // <-- Lambda should be converted to function()
}

//// [transformArrowInBlockScopedLoopVarInitializer.js]
while (true) {
    let local = null;
    var a = () => local;
}
