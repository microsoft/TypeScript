//// [tests/cases/conformance/async/es5/functionDeclarations/asyncFunctionDeclaration15_es5.ts] ////

//// [asyncFunctionDeclaration15_es5.ts]
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


//// [asyncFunctionDeclaration15_es5.js]
async function fn1() { }
async function fn2() { }
async function fn3() { }
async function fn4() { }
async function fn5() { }
async function fn6() { }
async function fn7() { return; }
async function fn8() { return 1; }
async function fn9() { return null; }
async function fn10() { return undefined; }
async function fn11() { return a; }
async function fn12() { return obj; }
async function fn13() { return thenable; }
async function fn14() { await 1; }
async function fn15() { await null; }
async function fn16() { await undefined; }
async function fn17() { await a; }
async function fn18() { await obj; }
async function fn19() { await thenable; }
