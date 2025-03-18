//// [tests/cases/conformance/statements/VariableStatements/usingDeclarations/usingDeclarationsNamedEvaluationDecoratorsAndClassFields.ts] ////

//// [usingDeclarationsNamedEvaluationDecoratorsAndClassFields.ts]
export {};

declare var dec: any;

using C1 = class {
    static [Symbol.dispose]() {}
};

using C2 = class {
    static x = 1;
    static [Symbol.dispose]() {}
};

using C3 = @dec class {
    static [Symbol.dispose]() {}
};

using C4 = @dec class {
    static x = 1;
    static [Symbol.dispose]() {}
};


//// [usingDeclarationsNamedEvaluationDecoratorsAndClassFields.js]
using C1 = class {
    static [Symbol.dispose]() { }
};
using C2 = class {
    static x = 1;
    static [Symbol.dispose]() { }
};
using C3 = 
@dec
class {
    static [Symbol.dispose]() { }
};
using C4 = 
@dec
class {
    static x = 1;
    static [Symbol.dispose]() { }
};
export {};
