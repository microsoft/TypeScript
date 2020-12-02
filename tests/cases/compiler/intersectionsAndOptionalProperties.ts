// @strict: true

declare let x: { a?: number, b: string };
declare let y: { a: null, b: string };
declare let z: { a: null } & { b: string };

x = y;  // Error
x = z;  // Error

// Repro from #36604

interface To {
    field?: number;
    anotherField: string;
}

type From =  { field: null } & Omit<To, 'field'>;

function foo(v: From) {
    let x: To;
    x = v;  // Error
    x.field = v.field; // Error
}

// Repro from #38348

const yy: number[] & [number, ...number[]] = [1];
const xx: [number, ...number[]] = yy;
