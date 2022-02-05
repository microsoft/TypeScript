//// [optionalAccessor6.ts]
class C {
    get x?() { return '' }
    set x?(value: string) {}
}


//// [optionalAccessor6.js]
class C {
    get x() { return ''; }
    set x(value) { }
}


//// [optionalAccessor6.d.ts]
declare class C {
    get x?(): string;
    set x?(value: string);
}
