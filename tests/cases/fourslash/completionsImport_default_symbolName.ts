/// <reference path="fourslash.ts" />

// @module: commonjs

// @Filename: /node_modules/@types/range-parser/index.d.ts
////declare function RangeParser(): string;
////declare namespace RangeParser {
////    interface Options {
////        combine?: boolean;
////    }
////}
////export = RangeParser;

// @Filename: /b.ts
////R/*0*/

verify.completions(
    {
        marker: "0",
        includes: {
            name: "RangeParser",
            kind: "function",
            kindModifiers: "declare",
            source: "/node_modules/@types/range-parser/index",
            sourceDisplay: "range-parser",
            hasAction: true,
            sortText: completion.SortText.AutoImportSuggestions,
            text: `namespace RangeParser
function RangeParser(): string`
        },
        preferences: {
            includeCompletionsForModuleExports: true
        }
    },
);

verify.applyCodeActionFromCompletion("0", {
    name: "RangeParser",
    source: "/node_modules/@types/range-parser/index",
    description: `Add import from "range-parser"`,
    newFileContent: `import RangeParser = require("range-parser");

R`,
});
