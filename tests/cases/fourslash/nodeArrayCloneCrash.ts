/// <reference path="fourslash.ts" />

// @module: preserve

// @Filename: /TLLineShape.ts
//// import { createShapePropsMigrationIds } from "./TLShape";
//// createShapePropsMigrationIds/**/

// @Filename: /TLShape.ts
//// import { T } from "@tldraw/validate";
////
//// /**
////  * @public
////  */
//// export function createShapePropsMigrationIds<T>(): { [k in keyof T]: any } {
////     return;
//// }

verify.completions({
    marker: "",
    includes: [
        {
            name: "createShapePropsMigrationIds",
            text: "(alias) function createShapePropsMigrationIds<T>(): { [k in keyof T]: any; }\nimport createShapePropsMigrationIds",
            tags: [{ name: "public", text: undefined }]
        }
    ]
});
    
goTo.file("/TLShape.ts");
verify.organizeImports(
`
/**
 * @public
 */
export function createShapePropsMigrationIds<T>(): { [k in keyof T]: any } {
    return;
}`);