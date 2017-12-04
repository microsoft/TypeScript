/// <reference path='fourslash.ts' />

// @allowJs: true

// @Filename: /node_modules/abs/index.js
////not read

// @Filename: /a.js
////import abs = require("/*a*/abs/*b*/");

test.setTypesRegistry({ "abs": undefined });

goTo.select("a", "b");
verify.refactor({
    name: "Install missing types package",
    actionName: "install",
    refactors: [
        {
            name: "Install missing types package",
            description: "Install missing types package",
            actions: [
                {
                    description: "Install '@types/abs'",
                    name: "install",
                }
            ]
        }
    ],
});
