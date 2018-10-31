/// <reference path="fourslash.ts" />

// @Filename: /tsconfig.json
////{
////    "compilerOptions": {
////        "baseUrl": ".",
////        "module": "esnext"
////    }
////}

// @Filename: /src/a.ts
////export const foo = 0;

// @Filename: /src/b.ts
////fo/**/

// Test that it prefers a relative import (see sourceDisplay).
verify.completions({
    marker: "",
    includes: {
        name: "foo",
        source: "/src/a",
        sourceDisplay: "./a",
        text: "const foo: 0",
        kind: "const",
        kindModifiers: "export",
        hasAction: true,
    },
    preferences: { includeCompletionsForModuleExports: true },
});
