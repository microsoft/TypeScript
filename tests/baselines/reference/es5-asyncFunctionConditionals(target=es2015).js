//// [tests/cases/compiler/es5-asyncFunctionConditionals.ts] ////

//// [es5-asyncFunctionConditionals.ts]
declare var x, y, z, a, b, c;

async function conditional0() {
    a = (await x) ? y : z;
}

async function conditional1() {
    a = x ? await y : z;
}

async function conditional2() {
    a = x ? y : await z;
}

//// [es5-asyncFunctionConditionals.js]
function conditional0() {
    return __awaiter(this, void 0, void 0, function* () {
        a = (yield x) ? y : z;
    });
}
function conditional1() {
    return __awaiter(this, void 0, void 0, function* () {
        a = x ? yield y : z;
    });
}
function conditional2() {
    return __awaiter(this, void 0, void 0, function* () {
        a = x ? y : yield z;
    });
}
