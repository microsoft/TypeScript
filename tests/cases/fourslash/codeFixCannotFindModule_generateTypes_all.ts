/// <reference path='fourslash.ts' />

// @Filename: /dir/node_modules/plus/index.js
////module.exports = function plus(x, y) { return x + y; };

// @Filename: /dir/node_modules/times/index.js
////module.exports = function times(x, y) { return x * y; };

// @Filename: /dir/a.ts
////import plus = require("plus");
////import times = require("times");
////plus;

// @Filename: /dir/tsconfig.json
////{
////    "compilerOptions": {}
////}

goTo.file("/dir/a.ts");
verify.codeFixAll({
    fixAllDescription: "Generate types for all packages without types",
    fixId: "generateTypes",
    newFileContent: {
        "/dir/tsconfig.json":
// TODO: GH#26618
`{
    "compilerOptions": {
        "baseUrl": ".",
        "paths": { "*": ["types/*"] },
}
}`,
    },
    commands: [
        {
            type: "generate types",
            file: "/dir/a.ts",
            fileToGenerateTypesFor: "/dir/node_modules/plus/index.js",
            outputFileName: "/dir/types/plus.d.ts",
        },
        {
            type: "generate types",
            file: "/dir/a.ts",
            fileToGenerateTypesFor: "/dir/node_modules/times/index.js",
            outputFileName: "/dir/types/times.d.ts",
        },
    ],
});
