//// [tests/cases/compiler/generatorTransformFinalLabel.ts] ////

//// [generatorTransformFinalLabel.ts]
async function test(skip: boolean) {
    if (!skip) {
        await 1
    }
    else {
        throw Error('test')
    }
}

//// [generatorTransformFinalLabel.js]
async function test(skip) {
    if (!skip) {
        await 1;
    }
    else {
        throw Error('test');
    }
}
