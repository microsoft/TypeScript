// @target: es2015
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
// @filename: file5.ts
// https://github.com/Microsoft/TypeScript/issues/21363
async function f5() {
    let y: any;
    outer: for await (const x of y) {
        continue outer;
    }
}
// @filename: file6.ts
// https://github.com/Microsoft/TypeScript/issues/21363
async function* f6() {
    let y: any;
    outer: for await (const x of y) {
        continue outer;
    }
}