/// <reference path='fourslash.ts' />

// @Filename: /src/old.ts
////export const value = 1;

// @Filename: /src/test.ts
////import("./old");
////const x = import("./old");
////import { value } from "./old";

verify.getEditsForFileRename({
    oldPath: "/src/old.ts",
    newPath: "/src/new.ts",
    newFileContents: {
        "/src/test.ts":
`import("./new");
const x = import("./new");
import { value } from "./new";`,
    },
});
