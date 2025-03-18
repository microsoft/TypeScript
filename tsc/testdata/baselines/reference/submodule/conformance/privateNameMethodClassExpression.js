//// [tests/cases/conformance/classes/members/privateNames/privateNameMethodClassExpression.ts] ////

//// [privateNameMethodClassExpression.ts]
const C = class {
    #field = this.#method();
    #method() { return 42; }
    static getInstance() { return new C(); }
    getField() { return this.#field };
}

console.log(C.getInstance().getField());
C.getInstance().#method; // Error
C.getInstance().#field; // Error



//// [privateNameMethodClassExpression.js]
const C = class {
    #field = this.#method();
    #method() { return 42; }
    static getInstance() { return new C(); }
    getField() { return this.#field; }
    ;
};
console.log(C.getInstance().getField());
C.getInstance().#method;
C.getInstance().#field;
