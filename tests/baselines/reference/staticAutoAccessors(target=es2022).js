//// [tests/cases/conformance/classes/propertyMemberDeclarations/staticAutoAccessors.ts] ////

//// [staticAutoAccessors.ts]
// https://github.com/microsoft/TypeScript/issues/53752

class A {
    // uses class reference
    static accessor x = 1;

    // uses 'this'
    accessor y = 2;
}



//// [staticAutoAccessors.js]
// https://github.com/microsoft/TypeScript/issues/53752
class A {
    static #x_accessor_storage = 1;
    // uses class reference
    static get x() { return A.#x_accessor_storage; }
    static set x(value) { A.#x_accessor_storage = value; }
    #y_accessor_storage = 2;
    // uses 'this'
    get y() { return this.#y_accessor_storage; }
    set y(value) { this.#y_accessor_storage = value; }
}
