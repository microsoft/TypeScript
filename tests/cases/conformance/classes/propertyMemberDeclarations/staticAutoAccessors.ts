// @target: es2022,es2017
// @noTypesAndSymbols: true
// https://github.com/microsoft/TypeScript/issues/53752

class A {
    // uses class reference
    static accessor x = 1;

    // uses 'this'
    accessor y = 2;
}

