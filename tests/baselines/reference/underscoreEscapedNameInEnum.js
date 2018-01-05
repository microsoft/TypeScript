//// [underscoreEscapedNameInEnum.ts]
enum E {
    "__foo" = 1,
    bar = E["__foo"] + 1
}


//// [underscoreEscapedNameInEnum.js]
var E;
(function (E) {
    E[E["__foo"] = 1] = "__foo";
    E[E["bar"] = 2] = "bar";
})(E || (E = {}));
