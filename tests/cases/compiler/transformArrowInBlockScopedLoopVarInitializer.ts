// @target: es5

// https://github.com/Microsoft/TypeScript/issues/11236
while (true)
{
    let local = null;
    var a = () => local; // <-- Lambda should be converted to function()
}