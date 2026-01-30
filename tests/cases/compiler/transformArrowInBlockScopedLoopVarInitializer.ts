// @strict: false
// @target: es5, es2015

// https://github.com/Microsoft/TypeScript/issues/11236
while (true)
{
    let local = null;
    var a = () => local; // <-- Lambda should be converted to function()
}