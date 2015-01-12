//// [computedPropertyNames7.ts]
enum E {
    member
}
var v = {
    [E.member]: 0
}

//// [computedPropertyNames7.js]
var E;
(function (E) {
    E[E["member"] = 0] = "member";
})(E || (E = {}));
var v = {
    [0 /* member */]: 0
};
