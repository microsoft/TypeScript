//// [tests/cases/compiler/superAccessCastedCall.ts] ////

//// [superAccessCastedCall.ts]
class Foo {
    bar(): void {}
}

class Bar extends Foo {
    x: Number;

    constructor() {
        super();
        this.x = 2;
    }

    bar() {
        super.bar();
        (super.bar as any)();
    }
} 

let b = new Bar();
b.bar()

//// [superAccessCastedCall.js]
class Foo {
    bar() { }
}
class Bar extends Foo {
    x;
    constructor() {
        super();
        this.x = 2;
    }
    bar() {
        super.bar();
        super.bar();
    }
}
let b = new Bar();
b.bar();
