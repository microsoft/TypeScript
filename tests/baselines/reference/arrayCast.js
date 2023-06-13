//// [tests/cases/compiler/arrayCast.ts] ////

//// [arrayCast.ts]
// Should fail. Even though the array is contextually typed with { id: number }[], it still
// has type { foo: string }[], which is not assignable to { id: number }[].
<{ id: number; }[]>[{ foo: "s" }];

// Should succeed, as the {} element causes the type of the array to be {}[]
<{ id: number; }[]>[{ foo: "s" }, {}]; 

//// [arrayCast.js]
// Should fail. Even though the array is contextually typed with { id: number }[], it still
// has type { foo: string }[], which is not assignable to { id: number }[].
[{ foo: "s" }];
// Should succeed, as the {} element causes the type of the array to be {}[]
[{ foo: "s" }, {}];
