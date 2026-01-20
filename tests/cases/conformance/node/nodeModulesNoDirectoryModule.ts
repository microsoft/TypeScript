// @noUncheckedSideEffectImports: true
// @strict: true
// @module: node16
// @noEmit: true
// @noTypesAndSymbols: true

// @Filename: /node_modules/i-have-a-dir-and-main/package.json
{
  "name": "i-have-a-dir-and-main",
  "version": "1.0.0",
  "type": "module",
  "main": "dist/index.js"
}

// @Filename: /node_modules/i-have-a-dir-and-main/dist/index.d.ts
export declare const a = 1;

// @Filename: /node_modules/i-have-a-dir-and-main/dist/dir/index.d.ts
export declare const b = 2;

// @Filename: /package.json
{ "type": "module" }

// @Filename: /index.ts
import 'i-have-a-dir-and-main' // ok
import 'i-have-a-dir-and-main/dist/dir' // error
