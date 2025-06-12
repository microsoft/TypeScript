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
function test(skip) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!skip) {
            yield 1;
        }
        else {
            throw Error('test');
        }
    });
}
