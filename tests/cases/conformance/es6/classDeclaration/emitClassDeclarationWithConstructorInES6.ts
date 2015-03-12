// @target: es6
class A {
    y: number;
    constructor(x: number) {
    }
    foo(a: any);
    foo() { }
}

class B {
    y: number;
    x: string = "hello";
    _bar: string;

    constructor(x: number, z = "hello", ...args) {
        this.y = 10;
    }
    baz(...args): string;
    baz(z: string, v: number): string {
        return this._bar;
    } 
}


