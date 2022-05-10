// @strict: true
// @declaration: true

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
