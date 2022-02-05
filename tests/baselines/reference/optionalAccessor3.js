//// [optionalAccessor3.ts]
interface I {
    get x?(): string;
    set x?(value: string);
}

class C implements I {}


//// [optionalAccessor3.js]
class C {
}
