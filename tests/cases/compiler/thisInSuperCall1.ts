// @target: es2015
// @strict: false
class Base { 
    constructor(a: any) {}
}

class Foo extends Base {
    constructor(public x: number) {
        super(this);
    }
}
