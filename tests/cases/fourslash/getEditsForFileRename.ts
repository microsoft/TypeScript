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

// @Filename: /unrelated.ts
// Don't update an unrelated import
////import { x } from "././src/./foo/./a";

// @Filename: /src/old.ts
////export default 0;

// @Filename: /tsconfig.json
////{ "files": ["a.ts", "src/a.ts", "src/foo/a.ts", "src/old.ts"] }

verify.getEditsForFileRename({
    oldPath: "/src/old.ts",
    newPath: "/src/new.ts",
    newFileContents: {
        "/a.ts": '/// <reference path="./src/new.ts" />\nimport old from "./src/new";',
        "/src/a.ts": '/// <reference path="./new.ts" />\nimport old from "./new";',
        "/src/foo/a.ts": '/// <reference path="../new.ts" />\nimport old from "../new";',
        "/tsconfig.json": '{ "files": ["a.ts", "src/a.ts", "src/foo/a.ts", "src/new.ts"] }',
    },
});
