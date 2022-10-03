// @allowJs: true
// @checkJs: true
// @target: es5
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
