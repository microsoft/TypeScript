//// [tests/cases/compiler/es5-asyncFunctionTryStatements.ts] ////

//// [es5-asyncFunctionTryStatements.ts]
declare var x: any, y: any, z: any, a: any, b: any, c: any;

async function tryCatch0() {
    var x: any, y: any;
    try {
        x;
    }
    catch (e) {
        y;
    }
}

async function tryCatch1() {
    var x: any, y: any;
    try {
        await x;
    }
    catch (e) {
        y;
    }
}

async function tryCatch2() {
    var x: any, y: any;
    try {
        x;
    }
    catch (e) {
        await y;
    }
}

async function tryCatch3(): Promise<Function> {
    var x: any, y: any;
    try {
        await x;
    }
    catch (e) {
        return () => e;
    }
}
async function tryFinally0() {
    var x: any, y: any;
    try {
        x;
    }
    finally {
        y;
    }
}

async function tryFinally1() {
    var x: any, y: any;
    try {
        await x;
    }
    finally {
        y;
    }
}

async function tryFinally2() {
    var x: any, y: any;
    try {
        x;
    }
    finally {
        await y;
    }
}

async function tryCatchFinally0() {
    var x: any, y: any, z: any;
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
    var x: any, y: any, z: any;
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
    var x: any, y: any, z: any;
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
    var x: any, y: any, z: any;
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

//// [es5-asyncFunctionTryStatements.js]
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
async function tryCatch3() {
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
