// @target: ES5
// @preserveConstEnums: true

function foo1() {
    return E.A
    enum E { A }
}

function foo2() {
    return E.A
    const enum E { A }
}