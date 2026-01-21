//// [tests/cases/compiler/typesOptionExplicitList.ts] ////

//// [index.d.ts]
declare var $: { x: number };

//// [index.d.ts]
declare var _: { map: any };

//// [app.ts]
// With "types": ["jquery"], only jquery is included
$.x;

// lodash is not included, so this should error
_.map;


//// [app.js]
// With "types": ["jquery"], only jquery is included
$.x;
// lodash is not included, so this should error
_.map;
