/// <reference path="fourslash.ts" />

// @allowJs: true

// @Filename: /default.ts
//// export default class TestDefaultClass {}

// @Filename: /defaultType.ts
//// export default interface TestDefaultInterface {}

// @Filename: /reExport/toReExport.ts
//// export class TestClassReExport {}
//// export interface TestInterfaceReExport {}

// @Filename: /reExport/index.ts
//// export { TestClassReExport, TestInterfaceReExport } from './toReExport';

// @Filename: /exportList.ts
//// class TestClassExportList {};
//// interface TestInterfaceExportList {};
//// export { TestClassExportList, TestInterfaceExportList };

// @Filename: /baseline.ts
//// export class TestClassBaseline {}
//// export interface TestInterfaceBaseline {}

// @Filename: /a.js
//// import /**/

verify.completions({
    marker: "",
    isNewIdentifierLocation: true,
    exact: [
        {
            name: "TestClassBaseline",
            insertText: "import { TestClassBaseline } from \"./baseline\";",
            source: "./baseline",
        },
        {
            name: "TestClassExportList",
            insertText: "import { TestClassExportList } from \"./exportList\";",
            source: "./exportList",
        },
        {
            name: "TestClassReExport",
            insertText: "import { TestClassReExport } from \"./reExport\";",
            source: "./reExport",
        },
        {
            name: "TestDefaultClass",
            insertText: "import TestDefaultClass from \"./default\";",
            source: "./default",
        },
    ],
    preferences: {
        includeCompletionsForImportStatements: true,
        includeCompletionsWithInsertText: true,
    }
});
