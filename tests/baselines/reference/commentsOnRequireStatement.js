//// [tests/cases/compiler/commentsOnRequireStatement.ts] ////

//// [0.ts]

export var subject = 10;

//// [1.ts]
export var subject1 = 10;

//// [2.ts]
/* tslint:disable:no-unused-variable */
// Subject imported before Observable to bypass circular dependency issue since
// Subject extends Observable and Observable references Subject in it's
// definition
export {subject} from './0';
/* tslint:enable:no-unused-variable */
export {subject1} from './1';


//// [0.js]
"use strict";
exports.subject = 10;
//// [1.js]
"use strict";
exports.subject1 = 10;
//// [2.js]
"use strict";
/* tslint:disable:no-unused-variable */
// Subject imported before Observable to bypass circular dependency issue since
// Subject extends Observable and Observable references Subject in it's
// definition
var _0_1 = require("./0");
exports.subject = _0_1.subject;
/* tslint:enable:no-unused-variable */
var _1_1 = require("./1");
exports.subject1 = _1_1.subject1;
