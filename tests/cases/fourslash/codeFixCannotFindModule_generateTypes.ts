/// <reference path='fourslash.ts' />

// @Filename: /dir/node_modules/plus/index.js
////module.exports = function plus(x, y) { return x + y; };

// @Filename: /dir/a.ts
////import plus = require("plus");
////plus;

// @Filename: /dir/tsconfig.json
////{
////    "compilerOptions": {
////        "paths": {
////            "nota": ["valid_pathmapping"],
////            dontCrash: 37,
////            "*": ["abc123"],
////        }
////    }
////}

goTo.file("/dir/a.ts");
verify.codeFix({
    description: "Generate types for 'plus'",
    newFileContent: {
        "/dir/tsconfig.json":
`{
    "compilerOptions": {
        "baseUrl": ".",
        "paths": {
            "*": ["types/*"],
            "nota": ["valid_pathmapping"],
            dontCrash: 37,
            "*": ["abc123"],
        }
    }
}`,
    },
    commands: [{
        type: "generate types",
        file: "/dir/a.ts",
        fileToGenerateTypesFor: "/dir/node_modules/plus/index.js",
        outputFileName: "/dir/types/plus.d.ts",
    }],
});
