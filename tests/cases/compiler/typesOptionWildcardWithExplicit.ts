// @traceResolution: true
// @noImplicitReferences: true
// @currentDirectory: /

// @filename: /tsconfig.json
{ "compilerOptions": { "types": ["*", "extra"] } }

// @filename: /node_modules/@types/jquery/index.d.ts
declare var $: { x: number };

// @filename: /node_modules/@types/lodash/index.d.ts
declare var _: { map: any };

// @filename: /app.ts
// With "types": ["*", "extra"], all @types packages are automatically included
// plus any explicitly listed types (even if they don't exist in @types)
// This is useful for gradual migration
$.x;
_.map;
