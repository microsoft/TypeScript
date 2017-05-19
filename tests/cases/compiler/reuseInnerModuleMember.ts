// @module: commonjs
// @Filename: reuseInnerModuleMember_0.ts
export module M { }

// @Filename: reuseInnerModuleMember_1.ts
///<reference path='reuseInnerModuleMember_0.ts'/>
declare module bar {
    interface alpha { }
}

import f = require('./reuseInnerModuleMember_0');
module bar {
    var x: alpha;
}
