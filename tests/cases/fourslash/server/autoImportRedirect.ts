/// <reference path="../fourslash.ts" />

// @Filename: /tsconfig.json
//// {
////     "compilerOptions": {
////         "module": "commonjs"
////     }
//// }

// @Filename: /node_modules/foo/package.json
//// {
////     "name": "foo",
////     "version": "1.0.0"
//// }

// @Filename: /node_modules/foo/index.d.ts
//// import "duplicate";
//// export declare const foo: number;

// @Filename: /node_modules/foo/node_modules/duplicate/package.json
//// {
////     "name": "duplicate",
////     "version": "1.0.0"
//// }

// @Filename: /node_modules/foo/node_modules/duplicate/index.d.ts
//// export declare const duplicate: number;

// @Filename: /node_modules/bar/package.json
//// {
////     "name": "bar",
////     "version": "1.0.0"
//// }

// @Filename: /node_modules/bar/index.d.ts
//// import "duplicate";
//// export declare const bar: number;

// @Filename: /node_modules/bar/node_modules/duplicate/package.json
//// {
////     "name": "duplicate",
////     "version": "1.0.0"
//// }

// @Filename: /node_modules/bar/node_modules/duplicate/index.d.ts
//// export declare const duplicate: number;

// This seems far-fetched but I don't know how else to test this

// @link: /node_modules/bar/node_modules/duplicate -> /node_modules/duplicate

// @Filename: /utils.ts
//// import {} from "duplicate";

// @Filename: /index.ts
//// import { foo } from "foo";
//// import { bar } from "bar";
//// duplicate/**/

goTo.file("/index.ts");
verify.completions({
    marker: "",
    includes: [{
        name: "duplicate",
        source: "duplicate",
        sourceDisplay: "duplicate",
        hasAction: true,
        sortText: completion.SortText.AutoImportSuggestions
    }],
    preferences: {
        includeCompletionsForModuleExports: true,
        allowIncompleteCompletions: true
    }
});

verify.importFixModuleSpecifiers("", ["duplicate"]);
