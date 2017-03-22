/// <reference path='fourslash.ts' />

class A {
    foo() {
        return class { x: number; }
    }
    bar() {
        return new class { x: number; }
    }
}
class B<X> {
    foo() {
        return class {
            x: X;
        }
    }
}


class D extends A { }

verify.rangeAfterCodeFix(`
    f(a: number, b: string): boolean;
    f(a: number, b: string): this;
    f(a: string, b: number): Function;
    f(a: string): Function;
    f(a: any, b?: any) {
        throw new Error("Method not implemented.");
    }
    foo(): number {
        throw new Error("Method not implemented.");
    }
`);
