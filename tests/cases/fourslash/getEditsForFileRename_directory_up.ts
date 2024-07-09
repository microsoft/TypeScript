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
    newPath: "/newDir/new",
    newFileContents: {
        "/a.ts":
`/// <reference path="./newDir/new/file.ts" />
import old from "./newDir/new";
import old2 from "./newDir/new/file";
export default 0;`,

        "/src/b.ts":
`/// <reference path="../newDir/new/file.ts" />
import old from "../newDir/new";
import old2 from "../newDir/new/file";
export default 0;`,

        "/src/foo/c.ts":
`/// <reference path="../../newDir/new/file.ts" />
import old from "../../newDir/new";
import old2 from "../../newDir/new/file";
export default 0;`,

        "/src/old/index.ts":
`import a from "../../a";
import a2 from "../../src/b";
import a3 from "../../src/foo/c";
import f from "./file";
export default 0;`,

        "/tsconfig.json":
`{ "files": ["a.ts", "src/b.ts", "src/foo/c.ts", "newDir/new/index.ts", "newDir/new/file.ts"] }`,
    },
});
