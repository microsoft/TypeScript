//// [tests/cases/compiler/thisInSuperCall1.ts] ////

//// [thisInSuperCall1.ts]
class Base { 
    constructor(a: any) {}
}

class Foo extends Base {
    constructor(public x: number) {
        super(this);
    }
}


//// [thisInSuperCall1.js]
class Base {
    constructor(a) { }
}
class Foo extends Base {
    x;
    constructor(x) {
        super(this);
        this.x = x;
    }
}
