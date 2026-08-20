// @module: commonjs
// @target: es5, es2015
// @allowJs: true
// @checkJs: true
// @outDir: ./out
// @declaration: true
// @esModuleInterop: true
// @filename: cls.js
class Foo {}
module.exports = Foo;

// @filename: usage.js
import {default as Fooa} from "./cls";

export const x = new Fooa();

export {default as Foob} from "./cls";
