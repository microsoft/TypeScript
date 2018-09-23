//// [blockScopedEnumVariablesUseBeforeDef.ts]
function foo1() {
    return E.A
    enum E { A }
}

function foo2() {
    return E.A
    const enum E { A }
}

//// [blockScopedEnumVariablesUseBeforeDef.js]
function foo1() {
    return E.A;
    var E = E || (E = {});
    (function (E) {
        E[E["A"] = 0] = "A";
    })(E);
}
function foo2() {
    return 0 /* A */;
}
