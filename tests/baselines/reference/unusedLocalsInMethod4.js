//// [tests/cases/compiler/unusedLocalsInMethod4.ts] ////

//// [unusedLocalsInMethod4.ts]
function f<T, NonNull extends {}>() {
    let x1: number[]; // should error
    let x2: number[] | null; // should error
    let x3: number[] | undefined; // should not error
    let x4: number[] | undefined | null; // should not error
    let x5!: number[]; // should not error
    let x6: any; // should not error
    let x7: unknown; // should not error
    let x8: T; // should error
    let x9: NonNull; // should error

    function foo() {
        console.log(x1);
        console.log(x2);
        console.log(x3);
        console.log(x4);
        console.log(x5);
        console.log(x6);
        console.log(x7);
        console.log(x8);
        console.log(x9);
    }
    foo();
}

function f2<T, NonNull extends {}>() {
    let x1: number[]; // should error
    let x2: number[] | null; // should error
    let x3: number[] | undefined; // should not error
    let x4: number[] | undefined | null; // should not error
    let x5!: number[]; // should not error
    let x6: any; // should not error
    let x7: unknown; // should not error
    let x8: T; // should error
    let x9: NonNull; // should error

    console.log(x1);
    console.log(x2);
    console.log(x3);
    console.log(x4);
    console.log(x5);
    console.log(x6);
    console.log(x7);
    console.log(x8);
    console.log(x9);
}

function f3() {
    let x: number[];    // should error
    function foo() {
        x.toString();
    }
    foo();
}

function f4() {
    let x: number;  // should error
    return {
        foo() {
            return x.toString();
        }
    };
}

declare let x: number;  // should error
function f5() {
    x.toString();
}
export default {};



//// [unusedLocalsInMethod4.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function f() {
    var x1; // should error
    var x2; // should error
    var x3; // should not error
    var x4; // should not error
    var x5; // should not error
    var x6; // should not error
    var x7; // should not error
    var x8; // should error
    var x9; // should error
    function foo() {
        console.log(x1);
        console.log(x2);
        console.log(x3);
        console.log(x4);
        console.log(x5);
        console.log(x6);
        console.log(x7);
        console.log(x8);
        console.log(x9);
    }
    foo();
}
function f2() {
    var x1; // should error
    var x2; // should error
    var x3; // should not error
    var x4; // should not error
    var x5; // should not error
    var x6; // should not error
    var x7; // should not error
    var x8; // should error
    var x9; // should error
    console.log(x1);
    console.log(x2);
    console.log(x3);
    console.log(x4);
    console.log(x5);
    console.log(x6);
    console.log(x7);
    console.log(x8);
    console.log(x9);
}
function f3() {
    var x; // should error
    function foo() {
        x.toString();
    }
    foo();
}
function f4() {
    var x; // should error
    return {
        foo: function () {
            return x.toString();
        }
    };
}
function f5() {
    x.toString();
}
exports.default = {};
