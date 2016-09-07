// @lib: es5,es2015.promise
// @noEmitHelpers: true
// @target: ES5
declare var x, y, z, a, b, c;

async function tryCatch0() {
    var x, y;
    try {
        x;
    }
    catch (e) {
        y;
    }
}

async function tryCatch1() {
    var x, y;
    try {
        await x;
    }
    catch (e) {
        y;
    }
}

async function tryCatch2() {
    var x, y;
    try {
        x;
    }
    catch (e) {
        await y;
    }
}

async function tryCatch3(): Promise<Function> {
    var x, y;
    try {
        await x;
    }
    catch (e) {
        return () => e;
    }
}
async function tryFinally0() {
    var x, y;
    try {
        x;
    }
    finally {
        y;
    }
}

async function tryFinally1() {
    var x, y;
    try {
        await x;
    }
    finally {
        y;
    }
}

async function tryFinally2() {
    var x, y;
    try {
        x;
    }
    finally {
        await y;
    }
}

async function tryCatchFinally0() {
    var x, y, z;
    try {
        x;
    }
    catch (e) {
        y;
    }
    finally {
        z;
    }
}

async function tryCatchFinally1() {
    var x, y, z;
    try {
        await x;
    }
    catch (e) {
        y;
    }
    finally {
        z;
    }
}

async function tryCatchFinally2() {
    var x, y, z;
    try {
        x;
    }
    catch (e) {
        await y;
    }
    finally {
        z;
    }
}

async function tryCatchFinally3() {
    var x, y, z;
    try {
        x;
    }
    catch (e) {
        y;
    }
    finally {
        await z;
    }
}