/// <reference path='fourslash.ts'/>

// @isolatedDeclarations: true
// @declaration: true

// @fileName: mymodule.d.ts
////declare class VolumeClass {
////    constructor();
////}
////export const Volume: typeof VolumeClass;

// @fileName: test.ts
////import { Volume } from './mymodule';
////export const foo = new Volume();

verify.codeFixAll({
    fixId: "fixMissingTypeAnnotationOnExports",
    fixAllDescription: ts.Diagnostics.Add_all_missing_type_annotations.message,
    newFileContent:
`import { Volume } from './mymodule';
export const foo: Volume = new Volume();`
});