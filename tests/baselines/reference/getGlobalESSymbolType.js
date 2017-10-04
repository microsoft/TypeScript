//// [getGlobalESSymbolType.ts]
interface A {
    m(x: string): void;
}

declare class B {
    m(x: string | symbol): void;
}

declare class C extends B implements A {}


//// [getGlobalESSymbolType.js]
