//// [tests/cases/compiler/booleanFilterAnyArray.ts] ////

//// [booleanFilterAnyArray.ts]
interface Bullean { }
interface BulleanConstructor {
    new(v1?: any): Bullean;
    <T>(v2?: T): v2 is T;
}

interface Ari<T> {
    filter<S extends T>(cb1: (value: T) => value is S): T extends any ? Ari<any> : Ari<S>;
    filter(cb2: (value: T) => unknown): Ari<T>;
}
declare var Bullean: BulleanConstructor;
declare let anys: Ari<any>;
var xs: Ari<any>;
var xs = anys.filter(Bullean)

declare let realanys: any[];
var ys: any[];
var ys = realanys.filter(Boolean)

var foo = [{ name: 'x' }]
var foor: Array<{name: string}>
var foor = foo.filter(x => x.name)
var foos: Array<boolean>
var foos = [true, true, false, null].filter((thing): thing is boolean => thing !== null)


/// [Declarations] ////



//// [booleanFilterAnyArray.d.ts]
interface Bullean {
}
interface BulleanConstructor {
    new (v1?: any): Bullean;
    <T>(v2?: T): v2 is T;
}
interface Ari<T> {
    filter<S extends T>(cb1: (value: T) => value is S): T extends any ? Ari<any> : Ari<S>;
    filter(cb2: (value: T) => unknown): Ari<T>;
}
declare var Bullean: BulleanConstructor;
declare let anys: Ari<any>;
declare var xs: Ari<any>;
declare var xs: Ari<any>;
declare let realanys: any[];
declare var ys: any[];
declare var ys: any[];
declare var foo: invalid;
declare var foor: Array<{
    name: string;
}>;
declare var foor: Array<{
    name: string;
}>;
declare var foos: Array<boolean>;
declare var foos: Array<boolean>;

/// [Errors] ////

booleanFilterAnyArray.ts(20,11): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.


==== booleanFilterAnyArray.ts (1 errors) ====
    interface Bullean { }
    interface BulleanConstructor {
        new(v1?: any): Bullean;
        <T>(v2?: T): v2 is T;
    }
    
    interface Ari<T> {
        filter<S extends T>(cb1: (value: T) => value is S): T extends any ? Ari<any> : Ari<S>;
        filter(cb2: (value: T) => unknown): Ari<T>;
    }
    declare var Bullean: BulleanConstructor;
    declare let anys: Ari<any>;
    var xs: Ari<any>;
    var xs = anys.filter(Bullean)
    
    declare let realanys: any[];
    var ys: any[];
    var ys = realanys.filter(Boolean)
    
    var foo = [{ name: 'x' }]
              ~~~~~~~~~~~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
    var foor: Array<{name: string}>
    var foor = foo.filter(x => x.name)
    var foos: Array<boolean>
    var foos = [true, true, false, null].filter((thing): thing is boolean => thing !== null)
    