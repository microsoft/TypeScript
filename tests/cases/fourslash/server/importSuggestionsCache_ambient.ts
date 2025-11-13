/// <reference path="../fourslash.ts" />

// @Filename: /home/src/workspaces/project/tsconfig.json
////{ "compilerOptions": { "module": "esnext" } }

// @Filename: /home/src/workspaces/project/ambient.d.ts
////declare module 'ambient' {
////  export const ambient = 0;
////}
////a/**/

edit.disableFormatting();

// Ensure 'ambient' shows up
verifyIncludes("ambient");

// Delete it, ensure it doesn’t show up
edit.deleteLineRange(0, 2);
verifyExcludes("ambient");

// Add it back with changes, ensure it shows up
goTo.marker("");
edit.insertLines(`
declare module 'ambient' {
  export const ambient2 = 0;
}`);
verifyIncludes("ambient2");

// Replace 'ambient2' with 'ambient3'
edit.replaceLine(2, "  export const ambient3 = 0");
verifyExcludes("ambient2");
verifyIncludes("ambient3");

function verifyIncludes(name: string) {
    goTo.marker("");
    verify.completions({
        includes: {
            name,
            source: "ambient",
            hasAction: true,
            sortText: completion.SortText.AutoImportSuggestions,
        },
        preferences: {
            includeCompletionsForModuleExports: true,
            includeInsertTextCompletions: true,
        },
    });
}

function verifyExcludes(name: string) {
    goTo.marker("");
    verify.completions({
        excludes: name,
        preferences: {
            includeCompletionsForModuleExports: true,
            includeInsertTextCompletions: true,
        },
    });
}
