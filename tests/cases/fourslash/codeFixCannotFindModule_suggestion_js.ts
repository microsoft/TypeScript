/// <reference path='fourslash.ts' />

// @allowJs: true
// @checkJs: true

// @Filename: /node_modules/abs/index.js
////export default function abs() {}

// @Filename: /a.js
////import abs from [|"abs"|];
////abs;

test.setTypesRegistry({ "abs": undefined });

verify.noErrors();
goTo.file("/a.js");
verify.getSuggestionDiagnostics([{
    message: "Could not find a declaration file for module 'abs'. '/node_modules/abs/index.js' implicitly has an 'any' type.",
    code: 7016,
}]);

verify.codeFixAvailable([
    {
        description: "Install '@types/abs'",
        commands: [{
            type: "install package",
            file: "/a.js",
            packageName: "@types/abs",
        }],
    },
    { description: "Ignore this error message" },
    { description: "Disable checking for this file" },
]);
