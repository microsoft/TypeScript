//// [optionalAccessor8.ts]
export class C {
    get foo?(): number { return 1; }
    set foo?(value: number) {}
}

declare let x: {
    foo: number | undefined;
}

let y: C = x;


//// [optionalAccessor8.js]
export class C {
    get foo() { return 1; }
    set foo(value) { }
}
let y = x;
