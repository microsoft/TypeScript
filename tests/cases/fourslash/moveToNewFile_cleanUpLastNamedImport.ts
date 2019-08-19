/// <reference path='fourslash.ts' />

// @Filename: /has-exports.ts
////
//// export interface Exported { }
//// const defaultExport = ""
//// export default defaultExport

// @Filename: /31195.ts
////
////import defaultExport, { Exported } from "./has-exports"
////console.log(defaultExport)
////[|export const bar = (logger: Exported) => 0;|]

verify.moveToNewFile({
  newFileContents: {
    "/31195.ts": `
import defaultExport from "./has-exports"
console.log(defaultExport)
`,

    "/bar.ts": 
    `import { Exported } from "./has-exports";
export const bar = (logger: Exported) => 0;
`,
  }
});
