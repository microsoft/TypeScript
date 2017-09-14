// @target: es2017
// @lib: esnext
// @filename: file1.ts
async function f1() {
    let y: any;
    for await (const x of y) {
    }
}
// @filename: file2.ts
async function f2() {
    let x: any, y: any;
    for await (x of y) {
    }
}
// @filename: file3.ts
async function* f3() {
    let y: any;
    for await (const x of y) {
    }
}
// @filename: file4.ts
async function* f4() {
    let x: any, y: any;
    for await (x of y) {
    }
}