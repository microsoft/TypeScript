// Function typed arguments with multiple signatures must be passed an implementation that matches all of them
// Inferences are made quadratic-pairwise to and from these overload sets

module NonGenericParameter {
    var a: {
        (x: boolean): boolean;
        (x: string): string;
    }

    function foo4(cb: typeof a) {
        return cb;
    }

    var r3 = foo4(<T, U>(x: T) => { var r: U; return r }); // ok
}

module GenericParameter {
    function foo5<T>(cb: { (x: T): string; (x: number): T }) {
        return cb;
    }

    var r6 = foo5(<T>(x: T) => x); // ok

    function foo6<T>(cb: { (x: T): string; (x: T, y?: T): string }) {
        return cb;
    }

    var r10 = foo6(<T>(x: T, y: T) => ''); // error

    function foo7<T>(x:T, cb: { (x: T): string; (x: T, y?: T): string }) {
        return cb;
    }

    var r13 = foo7(1, <T>(x: T) => x); // ok
    var a: { <T>(x: T): number; <T>(x: number): T; }
    var r14 = foo7(1, a); // ok
}