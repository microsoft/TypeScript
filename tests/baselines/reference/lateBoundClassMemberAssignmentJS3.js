//// [tests/cases/conformance/salsa/lateBoundClassMemberAssignmentJS3.ts] ////

//// [lateBoundClassMemberAssignmentJS.js]
const _sym = Symbol("_sym");
export class MyClass {
    constructor() {
        var self = this
        self[_sym] = "ok";
    }

    method() {
        var self = this
        self[_sym] = "yep";
        const x = self[_sym];
    }
}




//// [lateBoundClassMemberAssignmentJS.d.ts]
export class MyClass {
    [_sym]: string;
    method(): void;
}
declare const _sym: unique symbol;
export {};
