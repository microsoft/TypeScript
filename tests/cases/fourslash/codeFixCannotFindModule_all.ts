/// <reference path='fourslash.ts' />

// @moduleResolution: node
// @noImplicitAny: true

// @Filename: /node_modules/abs/index.js
////not read

// @Filename: /node_modules/zap/index.js
////not read

// @Filename: /a.ts
/////**/import * as abs from "abs";
////import * as zap from "zap";

test.setTypesRegistry({
    "abs": undefined,
    "zap": undefined,
});

goTo.marker();

verify.codeFixAll({
    groupId: "fixCannotFindModule",
    commands: [
        { packageName: "@types/abs", file: "/a.ts", type: "install package" },
        { packageName: "@types/zap", file: "/a.ts", type: "install package" },
    ],
    newFileContent: `import * as abs from "abs";
import * as zap from "zap";` // unchanged
});
