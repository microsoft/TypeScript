//// [tests/cases/compiler/declarationEmitTransitiveImportOfHtmlDeclarationItem.ts] ////

//// [foo.d.html.ts]
export declare class CustomHtmlRepresentationThing {}

//// [reexporter.ts]
import { CustomHtmlRepresentationThing } from "./foo.html";

export function func() {
    return new CustomHtmlRepresentationThing();
}

//// [index.ts]
import { func } from "./reexporter";
export const c = func();

//// [reexporter.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.func = func;
var foo_html_1 = require("./foo.html");
function func() {
    return new foo_html_1.CustomHtmlRepresentationThing();
}
//// [index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.c = void 0;
var reexporter_1 = require("./reexporter");
exports.c = (0, reexporter_1.func)();


//// [reexporter.d.ts]
import { CustomHtmlRepresentationThing } from "./foo.html";
export declare function func(): CustomHtmlRepresentationThing;
//// [index.d.ts]
export declare const c: import("./foo.html").CustomHtmlRepresentationThing;
