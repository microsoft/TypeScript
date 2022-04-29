/// <reference path='fourslash.ts' />

// @Filename: /a.ts
/////// <reference path="./src/old/file.ts" />
////import old from "./src/old";
////import old2 from "./src/old/file";
////export default 0;

// @Filename: /src/b.ts
/////// <reference path="./old/file.ts" />
////import old from "./old";
////import old2 from "./old/file";
////export default 0;

// @Filename: /src/foo/c.ts
/////// <reference path="../old/file.ts" />
////import old from "../old";
////import old2 from "../old/file";
////export default 0;

// @Filename: /src/old/index.ts
////import a from "../../a";
////import a2 from "../b";
////import a3 from "../foo/c";
////import f from "./file";
////export default 0;

// @Filename: /src/old/file.ts
////export default 0;

// @Filename: /tsconfig.json
////{ "files": ["a.ts", "src/b.ts", "src/foo/c.ts", "src/old/index.ts", "src/old/file.ts"] }

verify.getEditsForFileRename({
    oldPath: "/src/old",
    newPath: "/src/new",
    newFileContents: {
        "/a.ts":
`/// <reference path="./src/new/file.ts" />
import old from "./src/new";
import old2 from "./src/new/file";
export default 0;`,

        "/src/b.ts":
`/// <reference path="./new/file.ts" />
import old from "./new";
import old2 from "./new/file";
export default 0;`,

        "/src/foo/c.ts":
`/// <reference path="../new/file.ts" />
import old from "../new";
import old2 from "../new/file";
export default 0;`,

        // No change to /src/new

        "/tsconfig.json":
`{ "files": ["a.ts", "src/b.ts", "src/foo/c.ts", "src/new/index.ts", "src/new/file.ts"] }`,
    },
});
