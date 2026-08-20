// @declaration: true
// @emitDeclarationOnly: true
// @allowJs: true
// @checkJs: true
// @module: commonjs
// @target: es6
// @outDir: ./out

// @filename: /node_modules/@types/pkg/index.d.ts
interface Private {}
declare const obj: { fn(x: Private): void };
export = obj;

// @filename: /index.cjs
Object.defineProperty(exports, "api", { value: require("pkg") });