//// [intersectionsAndOptionalProperties.ts]
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


//// [intersectionsAndOptionalProperties.js]
"use strict";
x = y; // Error
x = z; // Error
function foo(v) {
    var x;
    x = v; // Error
    x.field = v.field; // Error
}
