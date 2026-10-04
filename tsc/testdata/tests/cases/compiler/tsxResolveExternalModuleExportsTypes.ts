// @target: es2015
// @module: ES2015
// @jsx: preserve

// @Filename: /node_modules/@types/a/index.d.ts
declare var a: a.Foo;
declare namespace a {
    interface Foo {}
}
export = a;

// @Filename: /node_modules/@types/b/index.d.ts
import * as a from 'a';
declare module 'a' {
    namespace Test {}

    interface Foo {
        Test: null;
    }
}

// @Filename: foo.tsx
/// <reference path="/.lib/react.d.ts" />
import { Test } from 'a';
const Foo = (<h1></h1>);
