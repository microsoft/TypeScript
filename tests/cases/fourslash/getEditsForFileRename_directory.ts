/// <reference path='fourslash.ts' />

// @Filename: /a.ts
/////// <reference path="./src/old/file.ts" />
////import old from "./src/old";
////import old2 from "./src/old/file";

// @Filename: /src/a.ts
/////// <reference path="./old/file.ts" />
////import old from "./old";
////import old2 from "./old/file";

// @Filename: /src/foo/a.ts
/////// <reference path="../old/file.ts" />
////import old from "../old";
////import old2 from "../old/file";

// @Filename: /tsconfig.json
////{ "files": ["/a.ts", "/src/a.ts", "/src/foo/a.ts", "/src/old/file.ts"] }

verify.getEditsForFileRename({
    oldPath: "/src/old",
    newPath: "/src/new",
    newFileContents: {
        "/a.ts":
`/// <reference path="./src/new/file.ts" />
import old from "./src/new";
import old2 from "./src/new/file";`,

        "/src/a.ts":
`/// <reference path="./new/file.ts" />
import old from "./new";
import old2 from "./new/file";`,

        "/src/foo/a.ts":
`/// <reference path="../new/file.ts" />
import old from "../new";
import old2 from "../new/file";`,

        "/tsconfig.json":
`{ "files": ["/a.ts", "/src/a.ts", "/src/foo/a.ts", "/src/new/file.ts"] }`,
    },
});
