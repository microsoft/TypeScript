//// [tests/cases/compiler/privateFieldsInClassExpressionDeclaration.ts] ////

//// [privateFieldsInClassExpressionDeclaration.ts]
export const ClassExpression = class {
    #context = 0;
    #method() { return 42; }
    public value = 1;
};

// Additional test with static private fields
export const ClassExpressionStatic = class {
    static #staticPrivate = "hidden";
    #instancePrivate = true;
    public exposed = "visible";
};

//// [privateFieldsInClassExpressionDeclaration.js]
export const ClassExpression = class {
    #context = 0;
    #method() { return 42; }
    value = 1;
};
// Additional test with static private fields
export const ClassExpressionStatic = class {
    static #staticPrivate = "hidden";
    #instancePrivate = true;
    exposed = "visible";
};


//// [privateFieldsInClassExpressionDeclaration.d.ts]
export declare const ClassExpression: {
    new (): {
        "__#private@#context": number;
        "__#private@#method"(): number;
        value: number;
    };
};
export declare const ClassExpressionStatic: {
    new (): {
        "__#private@#instancePrivate": boolean;
        exposed: string;
    };
    "__#private@#staticPrivate": string;
};
