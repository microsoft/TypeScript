// @strict: false
// @ignoreDeprecations: 6.0
// @alwaysStrict: true, false
// @target: es5, es2015

function f() {
    var _arguments = 10;
    var a = (arguments) => () => _arguments;
}