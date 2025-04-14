// @declaration: true
// @allowArbitraryExtensions: true
// @filename: foo.d.html.ts
export declare class CustomHtmlRepresentationThing {}

// @filename: reexporter.ts
import { CustomHtmlRepresentationThing } from "./foo.html";

export function func() {
    return new CustomHtmlRepresentationThing();
}

// @filename: index.ts
import { func } from "./reexporter";
export const c = func();