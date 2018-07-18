/// <reference path='fourslash.ts' />

// @moduleResolution: node
// @noImplicitAny: true

// @Filename: /node_modules/abs/index.js
////not read

// @Filename: /a.ts
////import * as abs from "abs";
////abs;

// @Filename: /b.ts
////const x: import("abs").T = 0;

test.setTypesRegistry({
    "abs": undefined,
});

for (const file of ["/a.ts", "/b.ts"]) {
    goTo.file(file);
    verify.codeFixAvailable([{
        description: "Install '@types/abs'",
        commands: [{
            type: "install package",
            file,
            packageName: "@types/abs",
        }],
    }]);
}
