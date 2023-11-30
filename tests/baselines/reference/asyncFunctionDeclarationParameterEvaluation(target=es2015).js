//// [tests/cases/conformance/async/asyncFunctionDeclarationParameterEvaluation.ts] ////

//// [asyncFunctionDeclarationParameterEvaluation.ts]
// https://github.com/microsoft/TypeScript/issues/40410
async function f1(x, y = z) {}
async function f2({[z]: x}) {}
async function f3(x = z) { return async () => arguments; }
async function f4(x = z) { return async () => async () => arguments; }
async function f5(x = z, ...args) { }
async function f6(x = z, ...args) { return async () => arguments; }
async function f7(x = z, ...args) { return async () => async () => arguments; }
async function f8() { return async (x = z) => arguments; }
async function f9() { return async (x = z) => async () => arguments; }
async function f10(x = z) { return async () => async function () { return async () => arguments; }; }
function f11() { return async (x = z) => arguments; }
function f12() { return async (x = z) => async () => arguments; }
function f() {
    const a1 = async (x, y = z) => {};
    const a2 = async ({[z]: x}) => {};
    const a3 = async (x = z) => { return async () => arguments; };
    const a4 = async (x = z) => { return async () => async () => arguments; };
    const a5 = async (x = z, ...args) => { };
    const a6 = async (x = z, ...args) => { return async () => arguments; };
    const a7 = async (x = z, ...args) => { return async () => async () => arguments; };
    const a8 = async () => { return async (x = z) => arguments; };
    const a9 = async () => { return async (x = z) => async () => arguments; };
    const a10 = async (x = z) => { return async () => async function () { return async () => arguments; }; };
}

//// [asyncFunctionDeclarationParameterEvaluation.js]
// https://github.com/microsoft/TypeScript/issues/40410
function f1(x_1) {
    return __awaiter(this, arguments, void 0, function* (x, y = z) { });
}
function f2(_a) {
    return __awaiter(this, arguments, void 0, function* ({ [z]: x }) { });
}
function f3() {
    var arguments_1 = arguments;
    return __awaiter(this, arguments, void 0, function* (x = z) { return () => __awaiter(this, void 0, void 0, function* () { return arguments_1; }); });
}
function f4() {
    var arguments_2 = arguments;
    return __awaiter(this, arguments, void 0, function* (x = z) { return () => __awaiter(this, void 0, void 0, function* () { return () => __awaiter(this, void 0, void 0, function* () { return arguments_2; }); }); });
}
function f5() {
    return __awaiter(this, arguments, void 0, function* (x = z, ...args) { });
}
function f6() {
    var arguments_3 = arguments;
    return __awaiter(this, arguments, void 0, function* (x = z, ...args) { return () => __awaiter(this, void 0, void 0, function* () { return arguments_3; }); });
}
function f7() {
    var arguments_4 = arguments;
    return __awaiter(this, arguments, void 0, function* (x = z, ...args) { return () => __awaiter(this, void 0, void 0, function* () { return () => __awaiter(this, void 0, void 0, function* () { return arguments_4; }); }); });
}
function f8() {
    var arguments_5 = arguments;
    return __awaiter(this, void 0, void 0, function* () { return (...args_1) => __awaiter(this, [...args_1], void 0, function* (x = z) { return arguments_5; }); });
}
function f9() {
    var arguments_6 = arguments;
    return __awaiter(this, void 0, void 0, function* () { return (...args_1) => __awaiter(this, [...args_1], void 0, function* (x = z) { return () => __awaiter(this, void 0, void 0, function* () { return arguments_6; }); }); });
}
function f10() {
    return __awaiter(this, arguments, void 0, function* (x = z) { return () => __awaiter(this, void 0, void 0, function* () { return function () {
        var arguments_7 = arguments;
        return __awaiter(this, void 0, void 0, function* () { return () => __awaiter(this, void 0, void 0, function* () { return arguments_7; }); });
    }; }); });
}
function f11() { return (...args_1) => {
    var arguments_8 = arguments;
    return __awaiter(this, [...args_1], void 0, function* (x = z) { return arguments_8; });
}; }
function f12() { return (...args_1) => {
    var arguments_9 = arguments;
    return __awaiter(this, [...args_1], void 0, function* (x = z) { return () => __awaiter(this, void 0, void 0, function* () { return arguments_9; }); });
}; }
function f() {
    const a1 = (x_1, ...args_1) => __awaiter(this, [x_1, ...args_1], void 0, function* (x, y = z) { });
    const a2 = (_a) => __awaiter(this, [_a], void 0, function* ({ [z]: x }) { });
    const a3 = (...args_2) => {
        var arguments_10 = arguments;
        return __awaiter(this, [...args_2], void 0, function* (x = z) { return () => __awaiter(this, void 0, void 0, function* () { return arguments_10; }); });
    };
    const a4 = (...args_2) => __awaiter(this, [...args_2], void 0, function* (x = z) { return () => __awaiter(this, void 0, void 0, function* () { return () => __awaiter(this, void 0, void 0, function* () { return arguments_10; }); }); });
    const a5 = (...args_3) => __awaiter(this, [...args_3], void 0, function* (x = z, ...args) { });
    const a6 = (...args_4) => __awaiter(this, [...args_4], void 0, function* (x = z, ...args) { return () => __awaiter(this, void 0, void 0, function* () { return arguments_10; }); });
    const a7 = (...args_5) => __awaiter(this, [...args_5], void 0, function* (x = z, ...args) { return () => __awaiter(this, void 0, void 0, function* () { return () => __awaiter(this, void 0, void 0, function* () { return arguments_10; }); }); });
    const a8 = () => __awaiter(this, void 0, void 0, function* () { return (...args_6) => __awaiter(this, [...args_6], void 0, function* (x = z) { return arguments_10; }); });
    const a9 = () => __awaiter(this, void 0, void 0, function* () { return (...args_7) => __awaiter(this, [...args_7], void 0, function* (x = z) { return () => __awaiter(this, void 0, void 0, function* () { return arguments_10; }); }); });
    const a10 = (...args_8) => __awaiter(this, [...args_8], void 0, function* (x = z) { return () => __awaiter(this, void 0, void 0, function* () { return function () {
        var arguments_11 = arguments;
        return __awaiter(this, void 0, void 0, function* () { return () => __awaiter(this, void 0, void 0, function* () { return arguments_11; }); });
    }; }); });
}
