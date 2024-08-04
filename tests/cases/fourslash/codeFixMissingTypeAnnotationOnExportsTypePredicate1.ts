/// <reference path='fourslash.ts'/>

// @isolatedDeclarations: true
// @declaration: true

// @filename: index.ts
//// export function isString(value: unknown) {
////   return typeof value === "string";
//// }

verify.codeFix({
    description: `Add return type 'value is string'`,
    index: 0,
    newFileContent: `export function isString(value: unknown): value is string {
  return typeof value === "string";
}`,
});
