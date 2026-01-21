//// [tests/cases/compiler/typesOptionDefaultEmpty.ts] ////

//// [index.d.ts]
declare var $: { x: number };

//// [index.d.ts]
declare var _: { map: any };

//// [app.ts]
// With the new default behavior, @types packages are not automatically included
// unless explicitly listed in the types array or imported
const value = 42;


//// [app.js]
// With the new default behavior, @types packages are not automatically included
// unless explicitly listed in the types array or imported
var value = 42;
