//// [tests/cases/conformance/importDefer/importDeferInvalidDefault.ts] ////

//// [a.ts]
export default function foo() {
    console.log("foo from a");
}

//// [b.ts]
import defer foo from "./a";

foo();

import defer "./a.js";
import defer "./a.js" with { type: "json" };

//// [c.js]
// @ts-check
import defer "./a.js";
import defer "./a.js" with { type: "json" };

//// [d.js]
import defer "./a.js";


//// [a.js]
export default function foo() {
    console.log("foo from a");
}
//// [b.js]
import defer foo from "./a";
foo();
//// [c.js]
// @ts-check
import defer  from "./a.js";
import defer  from "./a.js" with { type: "json" };
//// [d.js]
import defer  from "./a.js";
