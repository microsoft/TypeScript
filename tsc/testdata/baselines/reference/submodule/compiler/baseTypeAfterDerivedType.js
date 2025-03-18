//// [tests/cases/compiler/baseTypeAfterDerivedType.ts] ////

//// [baseTypeAfterDerivedType.ts]
interface Derived extends Base {
    method(...args: any[]): void;
}

interface Base {
    method(...args: any[]): void;
}

class Derived2 implements Base2 {
    method(...args: any[]): void { }
}

interface Base2 {
    method(...args: any[]): void;
}


//// [baseTypeAfterDerivedType.js]
class Derived2 {
    method(...args) { }
}
