//// [tests/cases/compiler/commentsOnRequireStatement.ts] ////

//// [0.ts]
export var subject = 10;

//// [1.ts]
export var subject1 = 10;

//// [2.ts]
/* blah0 */
// blah 
// blah 
// blah 
export {subject} from './0';
/* blah1 */
export {subject1} from './1';


//// [0.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subject = void 0;
exports.subject = 10;
//// [1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subject1 = void 0;
exports.subject1 = 10;
//// [2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subject1 = exports.subject = void 0;
/* blah0 */
// blah 
// blah 
// blah 
var _0_1 = require("./0");
Object.defineProperty(exports, "subject", { enumerable: true, get: function () { return _0_1.subject; } });
/* blah1 */
var _1_1 = require("./1");
Object.defineProperty(exports, "subject1", { enumerable: true, get: function () { return _1_1.subject1; } });
