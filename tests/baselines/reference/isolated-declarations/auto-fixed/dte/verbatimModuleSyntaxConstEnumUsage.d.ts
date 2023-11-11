//// [tests/cases/conformance/externalModules/verbatimModuleSyntaxConstEnumUsage.ts] ////

//// [foo.ts]
export enum Foo {
    a = 1,
    b,
    c,
}

//// [bar.ts]
import {Foo} from './foo.js';

export enum Bar {
    a = Foo.a,
    c = Foo.c,
    e = 5,
}

/// [Declarations] ////



//// [/.src/bar.d.ts]
export declare enum Bar {
    a,
    c,
    e = 5
}

//// [/.src/foo.d.ts]
export declare enum Foo {
    a = 1,
    b = 2,
    c = 3
}
/// [Errors] ////

bar.ts(4,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
bar.ts(5,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.


==== foo.ts (0 errors) ====
    export enum Foo {
        a = 1,
        b,
        c,
    }
    
==== bar.ts (2 errors) ====
    import {Foo} from './foo.js';
    
    export enum Bar {
        a = Foo.a,
        ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
        c = Foo.c,
        ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
        e = 5,
    }