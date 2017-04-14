//// [ambientGetters.ts]
declare class A {
    get length() : number;
}

declare class B {
    get length() { return 0; }
}

//// [ambientGetters.js]
