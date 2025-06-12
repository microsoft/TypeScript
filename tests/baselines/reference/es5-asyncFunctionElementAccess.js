//// [tests/cases/compiler/es5-asyncFunctionElementAccess.ts] ////

//// [es5-asyncFunctionElementAccess.ts]
declare var x, y, z, a, b, c;

async function elementAccess0() {
    z = await x[y];
}

async function elementAccess1() {
    z = (await x)[y];
}

async function elementAccess2() {
    z = x[await y];
}


//// [es5-asyncFunctionElementAccess.js]
function elementAccess0() {
    return __awaiter(this, void 0, void 0, function* () {
        z = yield x[y];
    });
}
function elementAccess1() {
    return __awaiter(this, void 0, void 0, function* () {
        z = (yield x)[y];
    });
}
function elementAccess2() {
    return __awaiter(this, void 0, void 0, function* () {
        z = x[yield y];
    });
}
