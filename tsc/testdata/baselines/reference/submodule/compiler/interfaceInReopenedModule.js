//// [tests/cases/compiler/interfaceInReopenedModule.ts] ////

//// [interfaceInReopenedModule.ts]
namespace m {
}

// In second instance of same module, exported interface is not visible
namespace m {
    interface f {}
    export class n { 
        private n: f;
    }
}


//// [interfaceInReopenedModule.js]
"use strict";
// In second instance of same module, exported interface is not visible
var m;
(function (m) {
    class n {
        n;
    }
    m.n = n;
})(m || (m = {}));
