/// <reference path='fourslash.ts' />

// @Filename: /src/old.ts
////export const value = 1;

// @Filename: /src/test.ts
////const old = require("./old");
////import { value } from "./old";

verify.getEditsForFileRename({
    oldPath: "/src/old.ts",
    newPath: "/src/new.ts",
    newFileContents: {
        "/src/test.ts":
`const old = require("./new");
import { value } from "./new";`,
    },
});
