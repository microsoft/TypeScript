// Function typed arguments with multiple signatures must be passed an implementation that matches all of them
// Inferences are made quadratic-pairwise to and from these overload sets

module NonGenericParameter {
    var a: {
        new(x: boolean): boolean;
        new(x: string): string;
    }

    function foo4(cb: typeof a) {
        return cb;
    }

    var b: { new <T, U>(x: T): U }
    var r3 = foo4(b); // ok
}

module GenericParameter {
    function foo5<T>(cb: { new(x: T): string; new(x: number): T }) {
        return cb;
    }

    var a: { new <T>(x: T): T };
    var r6 = foo5(a); // ok

    function foo6<T>(cb: { new(x: T): string; new(x: T, y?: T): string }) {
        return cb;
    }

    var b: { new <T>(x: T, y: T): string };
    var r10 = foo6(b); // error

    function foo7<T>(x:T, cb: { new(x: T): string; new(x: T, y?: T): string }) {
        return cb;
    }

    var r13 = foo7(1, a); // ok
    var c: { new<T>(x: T): number; new<T>(x: number): T; }
    var r14 = foo7(1, c); // ok
}