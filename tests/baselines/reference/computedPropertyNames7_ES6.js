//// [computedPropertyNames7_ES6.ts]
enum E {
    member
}
var v = {
    [E.member]: 0
}

//// [computedPropertyNames7_ES6.js]
var E = E || (E = {});
(function (E) {
    E[E["member"] = 0] = "member";
})(E);
var v = {
    [E.member]: 0
};
