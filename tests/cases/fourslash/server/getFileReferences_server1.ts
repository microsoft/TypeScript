/// <reference path="../fourslash.ts" />

// @Filename: /home/src/workspaces/project/tsconfig.json
//// {}

// @Filename: /home/src/workspaces/project/a.ts
//// export const a = 0;

// @Filename: /home/src/workspaces/project/b.ts
//// import "./a";

// @Filename: /home/src/workspaces/project/c.ts
//// import {} from "./a";

// @Filename: /home/src/workspaces/project/d.ts
//// import { a } from "/project/a";
//// type T = typeof import("./a").a;

verify.baselineGetFileReferences("/home/src/workspaces/project/a.ts");
