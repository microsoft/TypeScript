//// [lateBoundClassMemberAssignmentJS2.js]
const _sym = "my-fake-sym";
export class MyClass {
    constructor() {
        this[_sym] = "ok";
    }

    method() {
        this[_sym] = "yep";
        const x = this[_sym];
    }
}



//// [lateBoundClassMemberAssignmentJS2.d.ts]
export class MyClass {
    method(): void;
    "my-fake-sym": string;
}
