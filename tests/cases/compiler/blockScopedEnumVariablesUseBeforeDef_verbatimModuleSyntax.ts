// @target: ES5
// @verbatimModuleSyntax: true

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
