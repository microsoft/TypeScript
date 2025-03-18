//// [tests/cases/compiler/thisInSuperCall3.ts] ////

//// [thisInSuperCall3.ts]
class Base { 
    constructor(a: any) {}
}

class Foo extends Base {
    public x: number = 0;

    constructor() {
        super(this);
    }
}


//// [thisInSuperCall3.js]
class Base {
    constructor(a) { }
}
class Foo extends Base {
    x = 0;
    constructor() {
        super(this);
    }
}
