// @lib: es5,es2015.promise
// @noEmitHelpers: true
// @target: ES5
// @lib: es2015

// mainly to verify indentation of emitted code

function g() { return "g"; }

function* objectLiteral1() {
    const x = {
        a: 1,
        b: yield 2,
        c: 3,
    }
}

function* objectLiteral2() {
    const x = {
        a: 1,
        [g()]: yield 2,
        c: 3,
    }
}

function* objectLiteral3() {
    const x = {
        a: 1,
        b: yield 2,
        [g()]: 3,
        c: 4,
    }
}

function* objectLiteral4() {
    const x = {
        a: 1,
        [g()]: 2,
        b: yield 3,
        c: 4,
    }
}

function* objectLiteral5() {
    const x = {
        a: 1,
        [g()]: yield 2,
        c: 4,
    }
}

function* objectLiteral6() {
    const x = {
        a: 1,
        [yield]: 2,
        c: 4,
    }
}

function* objectLiteral7() {
    const x = {
        a: 1,
        [yield]: yield 2,
        c: 4,
    }
}
