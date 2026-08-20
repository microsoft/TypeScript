// @target: ES2015
// @declaration: true

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