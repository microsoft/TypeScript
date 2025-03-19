//// [tests/cases/conformance/externalModules/moduleResolutionWithExtensions.ts] ////

//// [a.ts]
export default 0;

// No extension: '.ts' added
//// [b.ts]
import a from './a';

// '.js' extension: stripped and replaced with '.ts'
//// [d.ts]
import a from './a.js';

//// [jquery.d.ts]
declare var x: number;
export default x;

// No extension: '.d.ts' added
//// [jquery_user_1.ts]
import j from "./jquery";

// '.js' extension: stripped and replaced with '.d.ts'
//// [jquery_user_1.ts]
import j from "./jquery.js"


//// [a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = 0;
// No extension: '.ts' added
//// [b.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// '.js' extension: stripped and replaced with '.ts'
//// [d.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//// [jquery_user_1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
