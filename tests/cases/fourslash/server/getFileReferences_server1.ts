/// <reference path="../fourslash.ts" />

// @Filename: /project/tsconfig.json
//// {}

// @Filename: /project/a.ts
//// export const a = 0;

// @Filename: /project/b.ts
//// import "./a";

// @Filename: /project/c.ts
//// import {} from "./a";

// @Filename: /project/d.ts
//// import { a } from "/project/a";
//// type T = typeof import("./a").a;

verify.baselineGetFileReferences("/project/a.ts");
