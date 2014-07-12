//// [reuseInnerModuleMember_1.ts]
///<reference path='reuseInnerModuleMember_0.ts'/>
declare module bar {
    interface alpha { }
}

import f = require('reuseInnerModuleMember_0');
module bar {
    var x: alpha;
}


//// [reuseInnerModuleMember_0.js]
//// [reuseInnerModuleMember_1.js]
///<reference path='reuseInnerModuleMember_0.ts'/>

var bar;
(function (bar) {
    var x;
})(bar || (bar = {}));
