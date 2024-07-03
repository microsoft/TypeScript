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
//// export function createShapePropsMigrationIds<
//// 	const S extends string,
//// 	const T extends Record<string, number>,
//// >(shapeType: S, ids: T): { [k in keyof T]: `com.tldraw.shape.${S}/${T[k]}` } {
//// 	return;
//// }

verify.completions({
  marker: "",
  includes: [
    {
      name: "createShapePropsMigrationIds",
      text: "(alias) function createShapePropsMigrationIds<const S extends string, const T extends Record<string, number>>(shapeType: S, ids: T): { [k in keyof T]: `com.tldraw.shape.${S}/${T[k]}`; }\nimport createShapePropsMigrationIds",
      tags: [{ name: "public", text: undefined }]
    }
  ]
});

goTo.file("/TLShape.ts");
verify.organizeImports(``);