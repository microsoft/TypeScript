//// [tests/cases/conformance/emitter/esnext/forAwait/emitter.forAwait.esnext.ts] ////

//// [file1.ts]
async function f1() {
    let y: any;
    for await (const x of y) {
    }
}
//// [file2.ts]
async function f2() {
    let x: any, y: any;
    for await (x of y) {
    }
}
//// [file3.ts]
async function* f3() {
    let y: any;
    for await (const x of y) {
    }
}
//// [file4.ts]
async function* f4() {
    let x: any, y: any;
    for await (x of y) {
    }
}

//// [file1.js]
async function f1() {
    let y;
    for await (const x of y) {
    }
}
//// [file2.js]
async function f2() {
    let x, y;
    for await (x of y) {
    }
}
//// [file3.js]
async function* f3() {
    let y;
    for await (const x of y) {
    }
}
//// [file4.js]
async function* f4() {
    let x, y;
    for await (x of y) {
    }
}
