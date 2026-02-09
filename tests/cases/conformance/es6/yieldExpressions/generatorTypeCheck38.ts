// @strict: false
// @ignoreDeprecations: 6.0
// @alwaysStrict: true, false
//@target: ES6
var yield;
function* g() {
    yield 0;
    var v: typeof yield;
}