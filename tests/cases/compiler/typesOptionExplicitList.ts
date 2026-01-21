// @traceResolution: true
// @noImplicitReferences: true
// @currentDirectory: /

// @filename: /tsconfig.json
{ "compilerOptions": { "types": ["jquery"] } }

// @filename: /node_modules/@types/jquery/index.d.ts
declare var $: { x: number };

// @filename: /node_modules/@types/lodash/index.d.ts
declare var _: { map: any };

// @filename: /app.ts
// With "types": ["jquery"], only jquery is included
$.x;

// lodash is not included, so this should error
_.map;
