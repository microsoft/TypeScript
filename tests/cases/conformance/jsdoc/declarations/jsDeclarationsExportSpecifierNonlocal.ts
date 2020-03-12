// @allowJs: true
// @checkJs: true
// @target: es5
// @outDir: ./out
// @declaration: true
// @filename: source.js
export class Thing {}
export class OtherThing {}
// @filename: index.js
export { Thing, OtherThing as default } from "./source";
