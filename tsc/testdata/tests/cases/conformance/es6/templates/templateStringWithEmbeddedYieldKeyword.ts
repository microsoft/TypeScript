// @target: es2015
function* gen {
    // Once this is supported, yield *must* be parenthesized.
    var x = `abc${ yield 10 }def`;
}
