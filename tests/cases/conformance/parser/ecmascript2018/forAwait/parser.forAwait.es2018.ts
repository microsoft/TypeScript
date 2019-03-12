// @target: es2018
// @lib: esnext
// @noEmit: true
// @filename: topLevelWithDeclIsError.ts
for await (const x of y) {
}
// @filename: topLevelWithExprIsError.ts
for await (x of y) {
}
// @filename: forAwaitInWithDeclIsError.ts
for await (const x in y) {
}
// @filename: forAwaitInWithExprIsError.ts
for await (x in y) {
}
// @filename: inFunctionDeclWithDeclIsError.ts
function f5() {
    let y: any;
    for await (const x of y) {
    }
}
// @filename: inFunctionDeclWithExprIsError.ts
function f6() {
    let x: any, y: any;
    for await (x of y) {
    }
}
// @filename: inAsyncFunctionWithDeclIsOk.ts
async function f7() {
    let y: any;
    for await (const x of y) {
    }
}
// @filename: inAsyncFunctionWithExprIsOk.ts
async function f8() {
    let x: any, y: any;
    for await (x of y) {
    }
}
// @filename: inAsyncGeneratorWithDeclIsOk.ts
async function* f9() {
    let y: any;
    for await (const x of y) {
    }
}
// @filename: inAsyncGeneratorWithExpressionIsOk.ts
async function* f10() {
    let x: any, y: any;
    for await (x of y) {
    }
}
// @filename: inGeneratorWithDeclIsError.ts
function* f11() {
    let y: any;
    for await (const x of y) {
    }
}
// @filename: inGeneratorWithExprIsError.ts
function* f12() {
    let x: any, y: any;
    for await (x of y) {
    }
}
