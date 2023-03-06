/// <reference path="./fourslash.ts" />

// @Filename: /dir/foo.ts
//// export function foo() {}

// @Filename: /dir/bar.ts
//// /*$*/

// @Filename: /dir/tsconfig.json
////{
////    "compilerOptions": {
////        "module": "amd",
////        "moduleResolution": "classic",
////        "rootDirs": ["D:/"]
////    }
////}

goTo.marker("$");
verify.completions({
    preferences: {
        includeCompletionsForModuleExports: true,
        allowIncompleteCompletions: true,
    }
});
