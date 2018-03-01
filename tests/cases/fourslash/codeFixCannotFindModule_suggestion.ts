/// <reference path='fourslash.ts' />

// @moduleResolution: node

// @Filename: /node_modules/abs/subModule.js
////export const x = 0;

// @Filename: /a.ts
////import * as abs from [|"abs/subModule"|];

test.setTypesRegistry({
    "abs": undefined,
});

verify.noErrors();
goTo.file("/a.ts");
verify.getSuggestionDiagnostics([{
    message: "Did not find a declaration file for module 'abs/subModule'. '/node_modules/abs/subModule.js' implicitly has an 'any' type.",
    code: 80002,
}]);

verify.codeFixAvailable([{
    description: "Install '@types/abs'",
    commands: [{
        type: "install package",
        file: "/a.ts",
        packageName: "@types/abs",
    }],
}]);
