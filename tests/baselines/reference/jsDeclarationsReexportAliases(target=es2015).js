//// [tests/cases/conformance/jsdoc/declarations/jsDeclarationsReexportAliases.ts] ////

//// [cls.js]
export default class Foo {}

//// [usage.js]
import {default as Fooa} from "./cls";

export const x = new Fooa();

export {default as Foob} from "./cls";


//// [cls.js]
export default class Foo {
}
//// [usage.js]
import { default as Fooa } from "./cls";
export const x = new Fooa();
export { default as Foob } from "./cls";


//// [cls.d.ts]
export default class Foo {
}
//// [usage.d.ts]
export const x: Fooa;
export { default as Foob } from "./cls";
import { default as Fooa } from "./cls";
