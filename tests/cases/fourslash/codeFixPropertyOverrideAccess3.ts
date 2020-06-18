/// <reference path='fourslash.ts' />

// @strict: true

// @Filename: foo.ts
//// import { A } from './source'
//// class B extends A {
////     get x() { return 2 }
//// }
// @Filename: source.ts
//// export class A {
////     x = 1
//// }

verify.codeFix({
    description: `Generate 'get' and 'set' accessors`,
    newFileContent: {
        '/tests/cases/fourslash/source.ts': `export class A {
    private _x = 1;
    public get x() {
        return this._x;
    }
    public set x(value) {
        this._x = value;
    }
}`},
    index: 0
})
