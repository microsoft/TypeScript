// @noTypesAndSymbols: true

// @filename: /node_modules/a/package.json
{"name": "a", "version": "0.0.0"}
// @filename: /node_modules/a/index.d.ts
export const a = 123;

// @filename: /tsconfig.json
{
  "compilerOptions": {
    "module": "node16",
    "declaration": true,
    "emitDeclarationOnly": true,
    "checkJs": true,
  }
}
// @filename: /index.mjs
export {default as mod} from 'a';
