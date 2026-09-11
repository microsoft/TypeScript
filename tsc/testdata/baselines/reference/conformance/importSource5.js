//// [tests/cases/conformance/importSource/importSource5.ts] ////

//// [a.ts]
export default 1;

//// [b.ts]
import.source;
(import.source)("./a.js");
Function(import.source);
import.source.unknown;

import.source();
import.source("./a.js", {}, {});
import.source?.("./a.js");
import.source<string>("./a.js");
import.source(...["./a.js"]);

//// [c.ts]
new import.source("./a.js");

//// [d.ts]
new import.source("./a.js").a;

//// [e.ts]
typeof import.source;

//// [f.ts]
import.a("./a.js");


//// [a.js]
export default 1;
//// [b.js]
"use strict";
import.source;
(import.source)("./a.js");
Function(import.source);
import.source.unknown;
import.source();
import.source("./a.js", {}, {});
import.source?.("./a.js");
import.source("./a.js");
import.source(...["./a.js"]);
//// [c.js]
"use strict";
new ;
import.source("./a.js");
//// [d.js]
"use strict";
new ;
import.source("./a.js").a;
//// [e.js]
"use strict";
typeof import.source;
//// [f.js]
"use strict";
import.a("./a.js");
