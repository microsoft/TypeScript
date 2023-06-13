//// [tests/cases/conformance/types/never/neverTypeErrors1.ts] ////

//// [neverTypeErrors1.ts]
function f1() {
    let x: never;
    x = 1;
    x = "abc";
    x = false;
    x = undefined;
    x = null;
    x = {};
    x();
}

function f2(): never {
    return;
}

function f3(): never {
    return 1;
}

function f4(): never {
}

for (const n of f4()) {}
for (const n in f4()) {}

function f5() {
    let x: never[] = [];  // Ok
}

// Repro from #46032

interface A {
    foo: "a";
}

interface B {
    foo: "b";
}

type Union = A & B;

function func(): { value: Union[] } {
    return {
        value: [],
    };
}


//// [neverTypeErrors1.js]
function f1() {
    var x;
    x = 1;
    x = "abc";
    x = false;
    x = undefined;
    x = null;
    x = {};
    x();
}
function f2() {
    return;
}
function f3() {
    return 1;
}
function f4() {
}
for (var _i = 0, _a = f4(); _i < _a.length; _i++) {
    var n = _a[_i];
}
for (var n in f4()) { }
function f5() {
    var x = []; // Ok
}
function func() {
    return {
        value: [],
    };
}
