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
    a = 1,
    c = 3,
    e = 5
}

//// [/.src/foo.d.ts]
export declare enum Foo {
    a = 1,
    b = 2,
    c = 3
}
