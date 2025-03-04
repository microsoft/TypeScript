/// <reference path="fourslash.ts" />

// @filename: /a.ts
//// export const bar = () => console.log('Hello world!');

// @filename: /b.ts
//// import { bar as bar } from "./a";
//// bar();


goTo.file("/b.ts");


verify.getSuggestionDiagnostics([
    {
        message: "Redundant named import 'bar'.",
        code: ts.Diagnostics.Redundant_named_import_0.code,
        range: {pos: 9, end: 19, fileName:"/b.ts"},
        reportsUnnecessary: true,
    }
]);