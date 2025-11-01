//// [tests/cases/conformance/salsa/lateBoundClassMemberAssignmentJS.ts] ////

//// [lateBoundClassMemberAssignmentJS.js]
const _sym = Symbol("_sym");
export class MyClass {
    constructor() {
        this[_sym] = "ok";
    }

    method() {
        this[_sym] = "yep";
        const x = this[_sym];
    }
}



//// [lateBoundClassMemberAssignmentJS.d.ts]
export class MyClass {
    [_sym]: string;
    method(): void;
}
declare const _sym: unique symbol;
export {};
