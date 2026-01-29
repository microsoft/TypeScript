//// [tests/cases/compiler/importWithTrailingSlash.ts] ////

//// [a.ts]
export default { a: 0 };

//// [index.ts]
export default { aIndex: 0 };

//// [test.ts]
import a from ".";
import aIndex from "./";
a.a;
aIndex.aIndex;

//// [test.ts]
import a from "..";
import aIndex from "../";
a.a;
aIndex.aIndex;


//// [a.js]
export default { a: 0 };
//// [index.js]
export default { aIndex: 0 };
//// [test.js]
import a from ".";
import aIndex from "./";
a.a;
aIndex.aIndex;
//// [test.js]
import a from "..";
import aIndex from "../";
a.a;
aIndex.aIndex;
