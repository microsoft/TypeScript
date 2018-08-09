/// <reference path='fourslash.ts' />

// @noImplicitAny: true

// @Filename: /a.ts
////import fs = require("fs");
////fs;

verify.codeFixAvailable([{
    description: "Install '@types/node'",
    commands: [{
        type: "install package",
        file: "/a.ts",
        packageName: "@types/node",
    }],
}]);
