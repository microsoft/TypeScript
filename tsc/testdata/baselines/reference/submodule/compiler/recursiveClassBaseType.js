//// [tests/cases/compiler/recursiveClassBaseType.ts] ////

//// [recursiveClassBaseType.ts]
// Repro from #44281

declare const p: <T>(fn: () => T) => T;

declare const Base: <T>(val: T) => { new(): T };

class C extends Base({ x: p<C[]>(() => []) }) { }

// Repro from #44359

abstract class Base1 {
    abstract root(): Derived1;
}

class Derived1 extends class extends Base1 {
    root() {
        return undefined as any;
    }
}
{ }


//// [recursiveClassBaseType.js]
class C extends Base({ x: p(() => []) }) {
}
// Repro from #44359
class Base1 {
}
class Derived1 extends class extends Base1 {
    root() {
        return undefined;
    }
} {
}


//// [recursiveClassBaseType.d.ts]
declare const p: <T>(fn: () => T) => T;
declare const Base: <T>(val: T) => {
    new (): T;
};
declare const C_base: new () => {
    x: C[];
};
declare class C extends C_base {
}
declare abstract class Base1 {
    abstract root(): Derived1;
}
declare const Derived1_base: {
    new (): {
        root(): any;
    };
};
declare class Derived1 extends Derived1_base {
}
