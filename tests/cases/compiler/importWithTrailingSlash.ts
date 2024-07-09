// @traceResolution: true
// @moduleResolution: node

// @Filename: /a.ts
export default { a: 0 };

// @Filename: /a/index.ts
export default { aIndex: 0 };

// @Filename: /a/test.ts
import a from ".";
import aIndex from "./";
a.a;
aIndex.aIndex;

// @Filename: /a/b/test.ts
import a from "..";
import aIndex from "../";
a.a;
aIndex.aIndex;
