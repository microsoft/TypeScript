//// [tests/cases/conformance/statements/VariableStatements/usingDeclarations/usingDeclarations.12.ts] ////

//// [usingDeclarations.12.ts]
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

//// [usingDeclarations.12.js]
class C1 {
    constructor() { }
}
class C2 extends C1 {
    y = 1;
    constructor() {
        super();
        using d17 = { [Symbol.dispose]() { } };
    }
}
