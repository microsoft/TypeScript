// @target: es2018
// @module: esnext
// @lib: esnext
// @noTypesAndSymbols: true
// @useDefineForClassFields: *

class C1 {
    constructor() {}
}

class C2 extends C1 {
    y = 1;
    constructor() {
        super();
        using d17 = { [Symbol.dispose]() {} };
    }
}