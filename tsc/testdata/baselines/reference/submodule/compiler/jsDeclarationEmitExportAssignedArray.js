//// [tests/cases/compiler/jsDeclarationEmitExportAssignedArray.ts] ////

//// [file.js]
module.exports = [{ name: 'other', displayName: 'Other', defaultEnabled: true }];



//// [file.d.ts]
declare const _exports: {
    name: string;
    displayName: string;
    defaultEnabled: boolean;
}[];
export = _exports;
