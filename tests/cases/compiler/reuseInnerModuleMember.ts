// @module: commonjs
// @Filename: reuseInnerModuleMember_0.ts
export namespace M { }

// @Filename: reuseInnerModuleMember_1.ts
///<reference path='reuseInnerModuleMember_0.ts'/>
declare namespace bar {
    interface alpha { }
}

import f = require('./reuseInnerModuleMember_0');
namespace bar {
    var x: alpha;
}
