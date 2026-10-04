// @target: es2015
// @noImplicitAny: true
// @suppressImplicitAnyIndexErrors: true
var a: object = {};

for (var key in a) {
    var value = a[key];
}
