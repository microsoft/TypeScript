// @noImplicitAny: true
var a: object;

for (var key in a) {
    var value = a[key]; // error
}
