//// [tests/cases/conformance/jsdoc/typeTagOnFunctionDeclaration5.ts] ////

//// [index.js]
/** @type {{(): { doStuff(arg: number): void };}} */
function fn1() {
    return {
        doStuff(arg) { }
    }
};

/** @type {{(): { doStuff(arg: number): void }; bar: number }} */
function fn2() {
    return {
        doStuff(arg) { }
    }
};

fn2.bar = 10;


//// [index.js]
"use strict";
/** @type {{(): { doStuff(arg: number): void };}} */
function fn1() {
    return {
        doStuff: function (arg) { }
    };
}
;
/** @type {{(): { doStuff(arg: number): void }; bar: number }} */
function fn2() {
    return {
        doStuff: function (arg) { }
    };
}
;
fn2.bar = 10;


//// [index.d.ts]
declare function fn1(): {
    doStuff(arg: number): void;
};
declare function fn2(): {
    doStuff(arg: number): void;
};
declare namespace fn2 {
    let bar: number;
}
