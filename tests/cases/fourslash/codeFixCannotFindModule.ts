/// <reference path='fourslash.ts' />

// @moduleResolution: node
// @noImplicitAny: true

// @Filename: /node_modules/abs/index.js
////not read

// @Filename: /a.ts
/////**/import * as abs from "abs";

test.setTypesRegistry({
    "abs": undefined,
});

goTo.marker();

verify.codeFixAvailable([{
    description: "Install '@types/abs'",
    commands: [{
        type: "install package",
        file: "/a.ts",
        packageName: "@types/abs",
    }],
}]);
