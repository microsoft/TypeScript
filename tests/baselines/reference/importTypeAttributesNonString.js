//// [tests/cases/compiler/importTypeAttributesNonString.ts] ////

//// [wat.mts]
export const x = 1;

//// [mod.mts]
// Import type with function expression (should error)
type T1 = typeof import("./wat.mjs", {
  assert: {
    a: (() => {
      console.log("why can you write js here????");
    })(),
  }
});

// Import type with number literal (should error)
type T2 = typeof import("./wat.mjs", {
  assert: { field: 0 }
});

// Import type with template literal (should error)
type T3 = typeof import("./wat.mjs", {
  assert: { field: `a` }
});

// Import type with regex (should error)
type T4 = typeof import("./wat.mjs", {
  assert: { field: /a/g }
});

// Import type with array (should error)
type T5 = typeof import("./wat.mjs", {
  assert: { field: ["a"] }
});

// Import type with object (should error)
type T6 = typeof import("./wat.mjs", {
  assert: { field: { a: 0 } }
});

// Import type with method call (should error)
type T7 = typeof import("./wat.mjs", {
  assert: { field: 0..toString() }
});

// Import type with valid string literal (should work)
type T8 = typeof import("./wat.mjs", {
  assert: { type: "json" }
});

// Import type with 'with' keyword and valid string (should work)
type T9 = typeof import("./wat.mjs", {
  with: { type: "json" }
});

// Import type with 'with' keyword and invalid expression (should error)
type T10 = typeof import("./wat.mjs", {
  with: { field: 123 }
});


//// [wat.mjs]
export const x = 1;
//// [mod.mjs]
export {};
