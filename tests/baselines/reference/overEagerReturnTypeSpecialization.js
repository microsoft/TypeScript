//// [overEagerReturnTypeSpecialization.js]
//Note: Below simpler repro

var r1 = v1.func(function (num) {
    return num.toString();
}).func(function (str) {
    return str.length;
});

var r2 = v1.func(function (num) {
    return num.toString();
}).func(function (str) {
    return str.length;
});
