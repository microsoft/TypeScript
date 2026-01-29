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
import { CustomHtmlRepresentationThing } from "./foo.html";
export function func() {
    return new CustomHtmlRepresentationThing();
}
//// [index.js]
import { func } from "./reexporter";
export const c = func();


//// [reexporter.d.ts]
import { CustomHtmlRepresentationThing } from "./foo.html";
export declare function func(): CustomHtmlRepresentationThing;
//// [index.d.ts]
export declare const c: import("./foo.html").CustomHtmlRepresentationThing;
