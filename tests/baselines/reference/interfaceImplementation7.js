//// [tests/cases/compiler/interfaceImplementation7.ts] ////

//// [interfaceImplementation7.ts]
interface i1{ name(): { s: string; }; }
interface i2{ name(): { n: number; }; }

interface i3 extends i1, i2 { }
interface i4 extends i1, i2 { name(): { s: string; n: number; }; }

class C1 implements i4 {
    public name(): string { return ""; }
}


//// [interfaceImplementation7.js]
class C1 {
    name() { return ""; }
}
