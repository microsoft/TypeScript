/// <reference path='fourslash.ts' />

// @Filename: /dir/node_modules/plus/index.js
////module.exports = function plus(x, y) { return x * y; };

// @Filename: /dir/a.ts
////import plus = require("plus");
////plus;

// @Filename: /dir/tsconfig.json
////{
////    "compilerOptions": {
////        "baseUrl": "base",
////        "paths": {
////            "*": ["myTypes/*"],
////        },
////    },
////}

goTo.file("/dir/a.ts");
verify.codeFix({
    description: "Generate types for 'plus'",
    newFileContent: {}, // no change
    commands: [{
        type: "generate types",
        file: "/dir/a.ts",
        fileToGenerateTypesFor: "/dir/node_modules/plus/index.js",
        outputFileName: "/dir/base/myTypes/plus.d.ts",
    }],
});
