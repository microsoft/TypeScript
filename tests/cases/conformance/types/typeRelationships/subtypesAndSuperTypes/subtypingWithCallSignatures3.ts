// checking subtype relations for function types as it relates to contextual signature instantiation
// error cases, so function calls will all result in 'any'

module Errors {
    class Base { foo: string; }
    class Derived extends Base { bar: string; }
    class Derived2 extends Derived { baz: string; }
    class OtherDerived extends Base { bing: string; }

    declare function foo2(a2: (x: number) => string[]): typeof a2;
    declare function foo2(a2: any): any;

    declare function foo7(a2: (x: (arg: Base) => Derived) => (r: Base) => Derived2): typeof a2;
    declare function foo7(a2: any): any;

    declare function foo8(a2: (x: (arg: Base) => Derived, y: (arg2: Base) => Derived) => (r: Base) => Derived): typeof a2;
    declare function foo8(a2: any): any;

    declare function foo10(a2: (...x: Base[]) => Base): typeof a2;
    declare function foo10(a2: any): any;

    declare function foo11(a2: (x: { foo: string }, y: { foo: string; bar: string }) => Base): typeof a2;
    declare function foo11(a2: any): any;

    declare function foo12(a2: (x: Array<Base>, y: Array<Derived2>) => Array<Derived>): typeof a2;
    declare function foo12(a2: any): any;

    declare function foo15(a2: (x: { a: string; b: number }) => number): typeof a2;
    declare function foo15(a2: any): any;

    declare function foo16(a2: {
        // type of parameter is overload set which means we can't do inference based on this type
        (x: {
            (a: number): number;
            (a?: number): number;
        }): number[];
        (x: {
            (a: boolean): boolean;
            (a?: boolean): boolean;
        }): boolean[];
    }): typeof a2;
    declare function foo16(a2: any): any;

    declare function foo17(a2: {
        (x: {
            <T extends Derived>(a: T): T;
            <T extends Base>(a: T): T;
        }): any[];
        (x: {
            <T extends Derived2>(a: T): T;
            <T extends Base>(a: T): T;
        }): any[];
    }): typeof a2;
    declare function foo17(a2: any): any;

    var r1 = foo2(<T, U>(x: T) => <U[]>null); // any
    var r1a = [(x: number) => [''], <T, U>(x: T) => <U[]>null];
    var r1b = [<T, U>(x: T) => <U[]>null, (x: number) => ['']];

    var r2arg = <T extends Base, U extends Derived, V extends Derived2>(x: (arg: T) => U) => (r: T) => <V>null;
    var r2arg2 = (x: (arg: Base) => Derived) => (r: Base) => <Derived2>null;
    var r2 = foo7(r2arg); // any
    var r2a = [r2arg2, r2arg];
    var r2b = [r2arg, r2arg2];

    var r3arg = <T extends Base, U extends Derived>(x: (arg: T) => U, y: (arg2: { foo: number; }) => U) => (r: T) => <U>null;
    var r3arg2 = (x: (arg: Base) => Derived, y: (arg2: Base) => Derived) => (r: Base) => <Derived>null;
    var r3 = foo8(r3arg); // any
    var r3a = [r3arg2, r3arg];
    var r3b = [r3arg, r3arg2];

    var r4arg = <T extends Derived>(...x: T[]) => <T>null;
    var r4arg2 = (...x: Base[]) => <Base>null;
    var r4 = foo10(r4arg); // any
    var r4a = [r4arg2, r4arg];
    var r4b = [r4arg, r4arg2];

    var r5arg = <T extends Derived>(x: T, y: T) => <T>null;
    var r5arg2 = (x: { foo: string }, y: { foo: string; bar: string }) => <Base>null;
    var r5 = foo11(r5arg); // any
    var r5a = [r5arg2, r5arg];
    var r5b = [r5arg, r5arg2];

    var r6arg = (x: Array<Base>, y: Array<Derived2>) => <Array<Derived>>null;
    var r6arg2 = <T extends Array<Derived2>>(x: Array<Base>, y: Array<Base>) => <T>null;
    var r6 = foo12(r6arg); // (x: Array<Base>, y: Array<Derived2>) => Array<Derived>
    var r6a = [r6arg2, r6arg];
    var r6b = [r6arg, r6arg2];

    var r7arg = <T>(x: { a: T; b: T }) => <T>null;
    var r7arg2 = (x: { a: string; b: number }) => 1;
    var r7 = foo15(r7arg); // any
    var r7a = [r7arg2, r7arg];
    var r7b = [r7arg, r7arg2];

    var r7arg3 = <T extends Base>(x: { a: T; b: T }) => 1;
    var r7c = foo15(r7arg3); // (x: { a: string; b: number }) => number): number;
    var r7d = [r7arg2, r7arg3];
    var r7e = [r7arg3, r7arg2];

    var r8arg = <T>(x: (a: T) => T) => <T[]>null;
    var r8 = foo16(r8arg); // any

    var r9arg = <T>(x: (a: T) => T) => <any[]>null;
    var r9 = foo17(r9arg); // (x: { <T extends Derived >(a: T): T; <T extends Base >(a: T): T; }): any[]; (x: { <T extends Derived2>(a: T): T; <T extends Base>(a: T): T; }): any[];
}

module WithGenericSignaturesInBaseType {
    declare function foo2(a2: <T>(x: T) => T[]): typeof a2;
    declare function foo2(a2: any): any;
    var r2arg2 = <T>(x: T) => [''];
    var r2 = foo2(r2arg2); // <T>(x:T) => T[] since we can infer from generic signatures now

    declare function foo3(a2: <T>(x: T) => string[]): typeof a2;
    declare function foo3(a2: any): any;
    var r3arg2 = <T>(x: T) => <T[]>null;
    var r3 = foo3(r3arg2); // any
}