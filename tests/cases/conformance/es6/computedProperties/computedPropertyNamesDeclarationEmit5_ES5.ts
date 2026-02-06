// @strict: false
// @target: es5, es2015
// @declaration: true
var v = {
    ["" + ""]: 0,
    ["" + ""]() { },
    get ["" + ""]() { return 0; },
    set ["" + ""](x) { }
}