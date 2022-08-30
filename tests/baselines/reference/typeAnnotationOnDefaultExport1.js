//// [tests/cases/compiler/typeAnnotationOnDefaultExport1.ts] ////

//// [a.ts]
export default: number = 1;

//// [b.ts]
export default: number = "";

//// [c.ts]
export default: number = {};

//// [d.ts]
interface I {
    a: number;
    b: string;
}
export default: I = {};

//// [e.ts]
export default: number[] = [];

//// [f.ts]
export default: number[] = [""];

//// [g.ts]
const a = [""];
export default: number[] = a;

//// [h.ts]
export default: number[];


//// [a.js]
"use strict";
exports.__esModule = true;
exports["default"] = 1;
//// [b.js]
"use strict";
exports.__esModule = true;
exports["default"] = "";
//// [c.js]
"use strict";
exports.__esModule = true;
exports["default"] = {};
//// [d.js]
"use strict";
exports.__esModule = true;
exports["default"] = {};
//// [e.js]
"use strict";
exports.__esModule = true;
exports["default"] = [];
//// [f.js]
"use strict";
exports.__esModule = true;
exports["default"] = [""];
//// [g.js]
"use strict";
exports.__esModule = true;
var a = [""];
exports["default"] = a;
//// [h.js]
"use strict";
exports.__esModule = true;
exports["default"] = ;
