//// [tests/cases/compiler/bigintArbirtraryIdentifier.ts] ////

//// [foo.ts]
const foo = 0n;
export { foo as "0n" };

//// [correctUse.ts]
import { "0n" as foo } from "./foo";
export { foo as "0n" };

//// [badImport.ts]
import { 0n as foo } from "./foo";

//// [badImport2.ts]
import { foo as 0n } from "./foo";

//// [badExport.ts]
export { foo as 0n };

//// [badExport2.ts]
export { 0n as foo };

//// [foo.js]
const foo = 0n;
export { foo as "0n" };
//// [correctUse.js]
import { "0n" as foo } from "./foo";
export { foo as "0n" };
//// [badImport.js]
from;
"./foo";
export {};
//// [badImport2.js]
from;
"./foo";
export {};
//// [badExport.js]
export { foo as  };
0n;
;
//// [badExport2.js]
0n;
;
export {};
