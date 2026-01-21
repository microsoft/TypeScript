// @traceResolution: true
// @noImplicitReferences: true
// @currentDirectory: /

// @filename: /tsconfig.json
{ "compilerOptions": { "types": ["*"] } }

// @filename: /node_modules/@types/jquery/index.d.ts
declare var $: { x: number };

// @filename: /node_modules/@types/lodash/index.d.ts
declare var _: { map: any };

// @filename: /app.ts
// With "types": ["*"], all @types packages are automatically included
// This is the opt-in to the old behavior
$.x;
_.map;
