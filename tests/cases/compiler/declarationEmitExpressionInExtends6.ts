// @module: commonjs
// @declaration: true
// @allowJs: true
// @types: node
// @currentDirectory: /

// @Filename: /node_modules/@types/node/index.d.ts
declare const require: any;

// @Filename: /a.js
export class Foo {}

// @Filename: /b.ts
const { Foo } = require("./a");
export default class extends Foo {}
