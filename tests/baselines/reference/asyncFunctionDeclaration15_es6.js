//// [tests/cases/conformance/async/es6/functionDeclarations/asyncFunctionDeclaration15_es6.ts] ////

//// [asyncFunctionDeclaration15_es6.ts]
declare class Thenable { then(): void; }
declare let a: any;
declare let obj: { then: string; };
declare let thenable: Thenable;
async function fn1() { } // valid: Promise<void>
async function fn2(): { } { } // error
async function fn3(): any { } // error
async function fn4(): number { } // error
async function fn5(): PromiseLike<void> { } // error
async function fn6(): Thenable { } // error
async function fn7() { return; } // valid: Promise<void>
async function fn8() { return 1; } // valid: Promise<number>
async function fn9() { return null; } // valid: Promise<any>
async function fn10() { return undefined; } // valid: Promise<any>
async function fn11() { return a; } // valid: Promise<any>
async function fn12() { return obj; } // valid: Promise<{ then: string; }>
async function fn13() { return thenable; } // error
async function fn14() { await 1; } // valid: Promise<void>
async function fn15() { await null; } // valid: Promise<void>
async function fn16() { await undefined; } // valid: Promise<void>
async function fn17() { await a; } // valid: Promise<void>
async function fn18() { await obj; } // valid: Promise<void>
async function fn19() { await thenable; } // error


//// [asyncFunctionDeclaration15_es6.js]
function fn1() {
    return __awaiter(this, void 0, void 0, function* () { });
} // valid: Promise<void>
function fn2() {
    return __awaiter(this, void 0, void 0, function* () { });
} // error
function fn3() {
    return __awaiter(this, void 0, void 0, function* () { });
} // error
function fn4() {
    return __awaiter(this, void 0, void 0, function* () { });
} // error
function fn5() {
    return __awaiter(this, void 0, void 0, function* () { });
} // error
function fn6() {
    return __awaiter(this, void 0, void 0, function* () { });
} // error
function fn7() {
    return __awaiter(this, void 0, void 0, function* () { return; });
} // valid: Promise<void>
function fn8() {
    return __awaiter(this, void 0, void 0, function* () { return 1; });
} // valid: Promise<number>
function fn9() {
    return __awaiter(this, void 0, void 0, function* () { return null; });
} // valid: Promise<any>
function fn10() {
    return __awaiter(this, void 0, void 0, function* () { return undefined; });
} // valid: Promise<any>
function fn11() {
    return __awaiter(this, void 0, void 0, function* () { return a; });
} // valid: Promise<any>
function fn12() {
    return __awaiter(this, void 0, void 0, function* () { return obj; });
} // valid: Promise<{ then: string; }>
function fn13() {
    return __awaiter(this, void 0, void 0, function* () { return thenable; });
} // error
function fn14() {
    return __awaiter(this, void 0, void 0, function* () { yield 1; });
} // valid: Promise<void>
function fn15() {
    return __awaiter(this, void 0, void 0, function* () { yield null; });
} // valid: Promise<void>
function fn16() {
    return __awaiter(this, void 0, void 0, function* () { yield undefined; });
} // valid: Promise<void>
function fn17() {
    return __awaiter(this, void 0, void 0, function* () { yield a; });
} // valid: Promise<void>
function fn18() {
    return __awaiter(this, void 0, void 0, function* () { yield obj; });
} // valid: Promise<void>
function fn19() {
    return __awaiter(this, void 0, void 0, function* () { yield thenable; });
} // error
