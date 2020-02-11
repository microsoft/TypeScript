//// [tryCatchFinallyControlFlow.ts]
// Repro from #34797

function f1() {
    let a: number | null = null;
    try {
        a = 123;
        return a;
    }
    catch (e) {
        throw e;
    }
    finally {
        if (a != null && a.toFixed(0) == "123") { 
        }
    }
}

function f2() {
    let x: 0 | 1 | 2 | 3 = 0;
    try {
        x = 1;
    }
    catch (e) {
        x = 2;
        throw e;
    }
    finally {
        x;  // 0 | 1 | 2
    }
    x;  // 1
}

function f3() {
    let x: 0 | 1 | 2 | 3 = 0;
    try {
        x = 1;
    }
    catch (e) {
        x = 2;
        return;
    }
    finally {
        x;  // 0 | 1 | 2
    }
    x;  // 1
}

function f4() {
    let x: 0 | 1 | 2 | 3 = 0;
    try {
        x = 1;
    }
    catch (e) {
        x = 2;
    }
    finally {
        x;  // 0 | 1 | 2
    }
    x;  // 1 | 2
}

function f5() {
    let x: 0 | 1 | 2 | 3 = 0;
    try {
        x = 1;
        return;
    }
    catch (e) {
        x = 2;
    }
    finally {
        x;  // 0 | 1 | 2
    }
    x;  // 2
}

function f6() {
    let x: 0 | 1 | 2 | 3 = 0;
    try {
        x = 1;
    }
    catch (e) {
        x = 2;
        return;
    }
    finally {
        x;  // 0 | 1 | 2
    }
    x;  // 1
}

function f7() {
    let x: 0 | 1 | 2 | 3 = 0;
    try {
        x = 1;
        return;
    }
    catch (e) {
        x = 2;
        return;
    }
    finally {
        x;  // 0 | 1 | 2
    }
    x;  // Unreachable
}

// Repro from #35644

const main = () => {
    let hoge: string | undefined = undefined;
    try {
        hoge = 'hoge!';
        return;
    }
    catch {
        return;
    }
    finally {
        if (hoge) {
            hoge.length;
        }
        return;
    }
}


//// [tryCatchFinallyControlFlow.js]
"use strict";
// Repro from #34797
function f1() {
    var a = null;
    try {
        a = 123;
        return a;
    }
    catch (e) {
        throw e;
    }
    finally {
        if (a != null && a.toFixed(0) == "123") {
        }
    }
}
function f2() {
    var x = 0;
    try {
        x = 1;
    }
    catch (e) {
        x = 2;
        throw e;
    }
    finally {
        x; // 0 | 1 | 2
    }
    x; // 1
}
function f3() {
    var x = 0;
    try {
        x = 1;
    }
    catch (e) {
        x = 2;
        return;
    }
    finally {
        x; // 0 | 1 | 2
    }
    x; // 1
}
function f4() {
    var x = 0;
    try {
        x = 1;
    }
    catch (e) {
        x = 2;
    }
    finally {
        x; // 0 | 1 | 2
    }
    x; // 1 | 2
}
function f5() {
    var x = 0;
    try {
        x = 1;
        return;
    }
    catch (e) {
        x = 2;
    }
    finally {
        x; // 0 | 1 | 2
    }
    x; // 2
}
function f6() {
    var x = 0;
    try {
        x = 1;
    }
    catch (e) {
        x = 2;
        return;
    }
    finally {
        x; // 0 | 1 | 2
    }
    x; // 1
}
function f7() {
    var x = 0;
    try {
        x = 1;
        return;
    }
    catch (e) {
        x = 2;
        return;
    }
    finally {
        x; // 0 | 1 | 2
    }
    x; // Unreachable
}
// Repro from #35644
var main = function () {
    var hoge = undefined;
    try {
        hoge = 'hoge!';
        return;
    }
    catch (_a) {
        return;
    }
    finally {
        if (hoge) {
            hoge.length;
        }
        return;
    }
};
