/// <reference path='fourslash.ts' />

// @Filename: /a.ts
/////// <reference path="./src/old.ts" />
////import old from "./src/old";

// @Filename: /src/a.ts
/////// <reference path="./old.ts" />
////import old from "./old";

// @Filename: /src/foo/a.ts
/////// <reference path="../old.ts" />
////import old from "../old";

// @Filename: /src/old.ts
////

// @Filename: /tsconfig.json
////{ "files": ["a.ts", "src/a.ts", "src/foo/a.ts", "src/old.ts"] }

verify.getEditsForFileRename({
    oldPath: "/src/old.ts",
    newPath: "/src/index.ts",
    newFileContents: {
        "/a.ts":
`/// <reference path="./src/index.ts" />
import old from "./src";`,
        "/src/a.ts":
`/// <reference path="./index.ts" />
import old from ".";`,
        "/src/foo/a.ts":
`/// <reference path="../index.ts" />
import old from "..";`,
        "/tsconfig.json":
'{ "files": ["a.ts", "src/a.ts", "src/foo/a.ts", "src/index.ts"] }',
    },
});
