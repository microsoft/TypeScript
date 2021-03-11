//// [tests/cases/compiler/tsxResolveExternalModuleExportsTypes.ts] ////

//// [index.d.ts]
declare var a: a.Foo;
declare namespace a {
    interface Foo {}
}
export = a;

//// [index.d.ts]
import * as a from 'a';
declare module 'a' {
    namespace Test {}

    interface Foo {
        Test: null;
    }
}

//// [foo.tsx]
import { Test } from 'a';
const Foo = (<h1></h1>);


//// [foo.jsx]
var Foo = (<h1></h1>);
export {};
