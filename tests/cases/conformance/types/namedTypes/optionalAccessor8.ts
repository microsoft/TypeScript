// @target: es2015
// @strict: true
// @exactOptionalPropertyTypes: true, false

export class C {
    get foo?(): number { return 1; }
    set foo?(value: number) {}
}

declare let x: {
    foo: number | undefined;
}

let y: C = x;
