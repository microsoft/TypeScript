//// [tests/cases/conformance/jsdoc/declarations/jsDeclarationsReexportAliases.ts] ////

//// [cls.js]
export default class Foo {}

//// [usage.js]
import {default as Fooa} from "./cls";

export const x = new Fooa();

export {default as Foob} from "./cls";


//// [cls.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Foo = /** @class */ (function () {
    function Foo() {
    }
    return Foo;
}());
exports.default = Foo;
//// [usage.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cls_1 = require("./cls");
exports.x = new cls_1.default();
var cls_2 = require("./cls");
exports.Foob = cls_2.default;


//// [cls.d.ts]
export default class Foo {
}
//// [usage.d.ts]
export const x: Fooa;
export { default as Foob } from "./cls";
import { default as Fooa } from "./cls";
