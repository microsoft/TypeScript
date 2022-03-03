//// [tests/cases/compiler/exportAssignedNamespaceIsVisibleInDeclarationEmit.ts] ////

//// [thing.d.ts]
declare namespace Foo {
    export interface Bar {}
    export function f(): Bar;
}
export = Foo;
//// [index.ts]
import { f } from "./thing";
export const thing = f();

//// [index.js]
"use strict";
exports.__esModule = true;
exports.thing = void 0;
var thing_1 = require("./thing");
exports.thing = (0, thing_1.f)();


//// [index.d.ts]
export declare const thing: import("./thing").Bar;
