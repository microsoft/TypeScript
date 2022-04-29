//// [classFunctionMerging.ts]
// We allow ambient classes and functions to merge, this way callable classes
// which are also namespaces can be represented in declaration files
declare function Foo (x: number): Foo.Inst;
declare class Foo {
    constructor(x: string);
}
declare namespace Foo {
    export type Inst = number;
}

const a = new Foo("");
const b = Foo(12);

//// [classFunctionMerging.js]
var a = new Foo("");
var b = Foo(12);
