//// [tests/cases/compiler/blockScopedEnumVariablesUseBeforeDef.ts] ////

//// [blockScopedEnumVariablesUseBeforeDef.ts]
function foo1() {
    return E.A
    enum E { A }
}

function foo2() {
    return E.A
    const enum E { A }
}

const config = {
    a: AfterObject.A,
};

const enum AfterObject {
    A = 2,
}


//// [blockScopedEnumVariablesUseBeforeDef.js]
function foo1() {
    return E.A;
    var E;
    (function (E) {
        E[E["A"] = 0] = "A";
    })(E || (E = {}));
}
function foo2() {
    return 0 /* E.A */;
}
var config = {
    a: 2 /* AfterObject.A */,
};
