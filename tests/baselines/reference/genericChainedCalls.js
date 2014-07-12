//// [genericChainedCalls.js]
var r1 = v1.func(function (num) {
    return num.toString();
}).func(function (str) {
    return str.length;
}).func(function (num) {
    return num.toString();
});

var s1 = v1.func(function (num) {
    return num.toString();
});
var s2 = s1.func(function (str) {
    return str.length;
});
var s3 = s2.func(function (num) {
    return num.toString();
});
