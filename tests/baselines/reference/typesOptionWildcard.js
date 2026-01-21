//// [tests/cases/compiler/typesOptionWildcard.ts] ////

//// [index.d.ts]
declare var $: { x: number };

//// [index.d.ts]
declare var _: { map: any };

//// [app.ts]
// With "types": ["*"], all @types packages are automatically included
// This is the opt-in to the old behavior
$.x;
_.map;


//// [app.js]
// With "types": ["*"], all @types packages are automatically included
// This is the opt-in to the old behavior
$.x;
_.map;
