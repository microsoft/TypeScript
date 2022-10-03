// @module: commonjs
// @declaration: true
// @allowJs: true
// @types: node
// @currentDirectory: /

// @Filename: /node_modules/@types/node/index.d.ts
declare const require: any;

// @Filename: /a.ts
export class Foo {}

// @Filename: /b.ts
import * as A from "./a";
const { Foo } = A;
export default class extends Foo {}
