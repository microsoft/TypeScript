// @noImplicitReferences: true

// @filename: tsconfig.json
{ "files": "a.ts" }

// @filename: node_modules/@types/jquery/index.d.ts
declare var $: { x: any };

// @filename: a.ts
$.x;
