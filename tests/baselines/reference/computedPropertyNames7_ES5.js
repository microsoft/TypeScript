//// [computedPropertyNames7_ES5.ts]
enum E {
    member
}
var v = {
    [E.member]: 0
}

//// [computedPropertyNames7_ES5.js]
var _a;
var E;
(function (E) {
    E[E["member"] = 0] = "member";
})(E || (E = {}));
var v = (_a = {},
    _a[E.member] = 0,
    _a);
