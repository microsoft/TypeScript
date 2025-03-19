//// [tests/cases/compiler/reuseInnerModuleMember.ts] ////

//// [reuseInnerModuleMember_0.ts]
export module M { }

//// [reuseInnerModuleMember_1.ts]
///<reference path='reuseInnerModuleMember_0.ts'/>
declare module bar {
    interface alpha { }
}

import f = require('./reuseInnerModuleMember_0');
module bar {
    var x: alpha;
}


//// [reuseInnerModuleMember_0.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//// [reuseInnerModuleMember_1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
///<reference path='reuseInnerModuleMember_0.ts'/>
var bar;
(function (bar) {
    var x;
})(bar || (bar = {}));
