/// <reference path='fourslash.ts' />

// @Filename: /a.ts
/////// <reference path="./src/index.ts" />
////import old from "./src";
////import old2 from "./src/index";

// @Filename: /src/a.ts
/////// <reference path="./index.ts" />
////import old from ".";
////import old2 from "./index";

// @Filename: /src/foo/a.ts
/////// <reference path="../index.ts" />
////import old from "..";
////import old2 from "../index";

// @Filename: /src/index.ts
////

// @Filename: /tsconfig.json
////{ "files": ["a.ts", "src/a.ts", "src/foo/a.ts", "src/index.ts"] }

verify.getEditsForFileRename({
    oldPath: "/src/index.ts",
    newPath: "/src/new.ts",
    newFileContents: {
        "/a.ts":
`/// <reference path="./src/new.ts" />
import old from "./src/new";
import old2 from "./src/new";`,
        "/src/a.ts":
`/// <reference path="./new.ts" />
import old from "./new";
import old2 from "./new";`,
        "/src/foo/a.ts":
`/// <reference path="../new.ts" />
import old from "../new";
import old2 from "../new";`,
        "/tsconfig.json":
'{ "files": ["a.ts", "src/a.ts", "src/foo/a.ts", "src/new.ts"] }',
    },
});
