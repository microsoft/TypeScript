//// [tests/cases/conformance/jsdoc/declarations/jsDeclarationsReexportAliasesEsModuleInterop.ts] ////

//// [cls.js]
class Foo {}
module.exports = Foo;

//// [usage.js]
import {default as Fooa} from "./cls";

export const x = new Fooa();

export {default as Foob} from "./cls";


//// [cls.js]
class Foo {
}
module.exports = Foo;
//// [usage.js]
import { default as Fooa } from "./cls";
export const x = new Fooa();
export { default as Foob } from "./cls";


//// [cls.d.ts]
export = Foo;
declare class Foo {
}
//// [usage.d.ts]
export const x: Fooa;
export { default as Foob } from "./cls";
import { default as Fooa } from "./cls";
