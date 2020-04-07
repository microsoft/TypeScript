//// [thisPropertyAssignmentCircular.js]
export class Foo {
    constructor() {
        this.foo = "Hello";
    }
    slicey() {
        this.foo = this.foo.slice();
    }
    m() {
        this.foo
    }
}




//// [thisPropertyAssignmentCircular.d.ts]
export class Foo {
    foo: string;
    slicey(): void;
    m(): void;
}
