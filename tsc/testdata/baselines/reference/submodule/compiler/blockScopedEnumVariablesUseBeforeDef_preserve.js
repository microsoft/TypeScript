//// [tests/cases/compiler/blockScopedEnumVariablesUseBeforeDef_preserve.ts] ////

//// [blockScopedEnumVariablesUseBeforeDef_preserve.ts]
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


//// [blockScopedEnumVariablesUseBeforeDef_preserve.js]
function foo1() {
    return E.A;
    let E;
    (function (E) {
        E[E["A"] = 0] = "A";
    })(E || (E = {}));
}
function foo2() {
    return E.A;
    let E;
    (function (E) {
        E[E["A"] = 0] = "A";
    })(E || (E = {}));
}
const config = {
    a: AfterObject.A,
};
var AfterObject;
(function (AfterObject) {
    AfterObject[AfterObject["A"] = 2] = "A";
})(AfterObject || (AfterObject = {}));
