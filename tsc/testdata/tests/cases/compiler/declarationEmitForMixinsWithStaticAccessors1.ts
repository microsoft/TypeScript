// @declaration: true
// @target: esnext

// Regression test: when a class extends a mixin that returns an intersection,
// the class's anonymous constructor type inherits static accessor properties from the
// intersection. These synthetic properties can have a nil parent symbol when the
// constituent accessor declarations differ. Declaration emit must not crash when
// serializing these properties.

function mix<T extends new (...args: any[]) => any, U extends new (...args: any[]) => any>(
    base1: T, base2: U
): T & U {
    return null as any;
}

class A {
    static get shared(): number { return 1; }
    static set shared(v: number) { }
    x: string = "";
}

class B {
    static get shared(): number { return 2; }
    static set shared(v: number) { }
    y: number = 0;
}

function make() {
    class C extends mix(A, B) {
        z: boolean = true;
    }
    return C;
}

export const MixedClass = make();
