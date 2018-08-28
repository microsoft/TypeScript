//// [indexedAccessWithFreshObjectLiteral.ts]
function foo (id: string) {
    return {
        a: 1,
        b: "",
        c: true
    }[id]
}

function bar (id: 'a' | 'b') {
    return {
        a: 1,
        b: "",
        c: false
    }[id]
}

function baz () {
    const a = {
        a: 1,
        b: "",
        c: false
    }
    for (var k in a) {
        const c = a[k]
    }
}


//// [indexedAccessWithFreshObjectLiteral.js]
"use strict";
function foo(id) {
    return {
        a: 1,
        b: "",
        c: true
    }[id];
}
function bar(id) {
    return {
        a: 1,
        b: "",
        c: false
    }[id];
}
function baz() {
    var a = {
        a: 1,
        b: "",
        c: false
    };
    for (var k in a) {
        var c = a[k];
    }
}
