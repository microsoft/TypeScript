/// <reference path="fourslash.ts" />

// @moduleResolution: classic

// @Filename: /node_modules/@types/foo/index.d.ts
////export const xyz: number;

// @Filename: /node_modules/bar/index.d.ts
////export const qrs: number;

// @Filename: /a.ts
////xyz;
////qrs;

goTo.file("/a.ts");
verify.codeFixAll({
    fixId: "fixMissingImport",
    fixAllDescription: "Add all missing imports",
    newFileContent:
`import { xyz } from "foo";

import { qrs } from "./node_modules/bar/index";

xyz;
qrs;`,
});
