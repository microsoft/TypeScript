//// [tests/cases/compiler/es5-asyncFunctionPropertyAccess.ts] ////

//// [es5-asyncFunctionPropertyAccess.ts]
declare var x, y, z, a, b, c;

async function propertyAccess0() {
    y = await x.a;
}

async function propertyAccess1() {
    y = (await x).a;
}

async function callExpression0() {
    await x(y, z);
}

//// [es5-asyncFunctionPropertyAccess.js]
function propertyAccess0() {
    return __awaiter(this, void 0, void 0, function* () {
        y = yield x.a;
    });
}
function propertyAccess1() {
    return __awaiter(this, void 0, void 0, function* () {
        y = (yield x).a;
    });
}
function callExpression0() {
    return __awaiter(this, void 0, void 0, function* () {
        yield x(y, z);
    });
}
