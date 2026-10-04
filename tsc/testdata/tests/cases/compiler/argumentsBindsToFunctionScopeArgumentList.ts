// @target: es2015
// @ignoreDeprecations: 6.0
// @strict: false
// @alwaysStrict: true, false
var arguments = 10;
function foo(a) {
    arguments = 10;  /// This shouldnt be of type number and result in error.
}