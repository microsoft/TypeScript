// @traceResolution: true
// @noImplicitReferences: true
// @currentDirectory: /

// @filename: /tsconfig.json
{}

// @filename: /node_modules/@types/jquery/index.d.ts
declare var $: { x: number };

// @filename: /node_modules/@types/lodash/index.d.ts
declare var _: { map: any };

// @filename: /app.ts
// With the new default behavior, @types packages are not automatically included
// unless explicitly listed in the types array or imported
const value = 42;
