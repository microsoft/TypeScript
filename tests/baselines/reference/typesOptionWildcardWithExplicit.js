//// [tests/cases/compiler/typesOptionWildcardWithExplicit.ts] ////

//// [index.d.ts]
declare var $: { x: number };

//// [index.d.ts]
declare var _: { map: any };

//// [app.ts]
// With "types": ["*", "extra"], all @types packages are automatically included
// plus any explicitly listed types (even if they don't exist in @types)
// This is useful for gradual migration
$.x;
_.map;


//// [app.js]
// With "types": ["*", "extra"], all @types packages are automatically included
// plus any explicitly listed types (even if they don't exist in @types)
// This is useful for gradual migration
$.x;
_.map;
