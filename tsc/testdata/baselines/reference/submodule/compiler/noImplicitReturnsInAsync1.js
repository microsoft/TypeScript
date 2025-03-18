//// [tests/cases/compiler/noImplicitReturnsInAsync1.ts] ////

//// [noImplicitReturnsInAsync1.ts]
async function test(isError: boolean = false) {
    if (isError === true) {
        return;
    }
    let x = await Promise.resolve("The test is passed without an error.");
}

//// [noImplicitReturnsInAsync1.js]
async function test(isError = false) {
    if (isError === true) {
        return;
    }
    let x = await Promise.resolve("The test is passed without an error.");
}
