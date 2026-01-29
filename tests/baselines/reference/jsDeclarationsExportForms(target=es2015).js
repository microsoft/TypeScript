//// [tests/cases/conformance/jsdoc/declarations/jsDeclarationsExportForms.ts] ////

//// [cls.js]
export class Foo {}

//// [func.js]
export function func() {}

//// [bar.js]
export * from "./cls";

//// [bar2.js]
export * from "./func";
export * from "./cls";

//// [baz.js]
import {Foo} from "./cls";
export {Foo};

//// [bat.js]
import * as ns from "./cls";
export default ns;

//// [ban.js]
import * as ns from "./cls";
export {ns};

//// [bol.js]
import * as ns from "./cls";
export { ns as classContainer };

//// [cjs.js]
const ns = require("./cls");
module.exports = { ns };

//// [cjs2.js]
const ns = require("./cls");
module.exports = ns;

//// [cjs3.js]
const ns = require("./cls");
module.exports.ns = ns;

//// [cjs4.js]
const ns = require("./cls");
module.exports.names = ns;

//// [includeAll.js]
import "./cjs4";
import "./cjs3";
import "./cjs2";
import "./cjs";
import "./bol";
import "./ban";
import "./bat";
import "./baz";
import "./bar";
import "./bar2";


//// [cls.js]
export class Foo {
}
//// [func.js]
export function func() { }
//// [bar.js]
export * from "./cls";
//// [bar2.js]
export * from "./func";
export * from "./cls";
//// [baz.js]
import { Foo } from "./cls";
export { Foo };
//// [bat.js]
import * as ns from "./cls";
export default ns;
//// [ban.js]
import * as ns from "./cls";
export { ns };
//// [bol.js]
import * as ns from "./cls";
export { ns as classContainer };
//// [cjs.js]
const ns = require("./cls");
module.exports = { ns };
//// [cjs2.js]
const ns = require("./cls");
module.exports = ns;
//// [cjs3.js]
const ns = require("./cls");
module.exports.ns = ns;
//// [cjs4.js]
const ns = require("./cls");
module.exports.names = ns;
//// [includeAll.js]
import "./cjs4";
import "./cjs3";
import "./cjs2";
import "./cjs";
import "./bol";
import "./ban";
import "./bat";
import "./baz";
import "./bar";
import "./bar2";


//// [cls.d.ts]
export class Foo {
}
//// [func.d.ts]
export function func(): void;
//// [bar.d.ts]
export * from "./cls";
//// [bar2.d.ts]
export * from "./func";
export * from "./cls";
//// [baz.d.ts]
export { Foo };
import { Foo } from "./cls";
//// [bat.d.ts]
export default ns;
import * as ns from "./cls";
//// [ban.d.ts]
export { ns };
import * as ns from "./cls";
//// [bol.d.ts]
export { ns as classContainer };
import * as ns from "./cls";
//// [cjs.d.ts]
export { ns };
import ns = require("./cls");
//// [cjs2.d.ts]
export = ns;
import ns = require("./cls");
//// [cjs3.d.ts]
export { ns };
import ns = require("./cls");
//// [cjs4.d.ts]
export { ns as names };
import ns = require("./cls");
//// [includeAll.d.ts]
export {};
