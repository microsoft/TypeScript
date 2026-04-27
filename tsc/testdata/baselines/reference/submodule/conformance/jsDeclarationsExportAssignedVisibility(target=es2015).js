//// [tests/cases/conformance/jsdoc/declarations/jsDeclarationsExportAssignedVisibility.ts] ////

//// [obj.js]
module.exports = class Obj {
    constructor() {
        this.x = 12;
    }
}
//// [index.js]
const Obj = require("./obj");

class Container {
    constructor() {
        this.usage = new Obj();
    }
}

module.exports = Container;

//// [obj.js]
"use strict";
module.exports = class Obj {
    constructor() {
        this.x = 12;
    }
};
//// [index.js]
"use strict";
const Obj = require("./obj");
class Container {
    constructor() {
        this.usage = new Obj();
    }
}
module.exports = Container;


//// [obj.d.ts]
declare const _default: {
    new (): import("./obj");
};
export = _default;
//// [index.d.ts]
import Obj = require("./obj");
declare class Container {
    usage: Obj;
    constructor();
}
export = Container;


//// [DtsFileErrors]


out/index.d.ts(3,12): error TS2749: 'Obj' refers to a value, but is being used as a type here. Did you mean 'typeof Obj'?
out/obj.d.ts(2,13): error TS1340: Module './obj' does not refer to a type, but is used as a type here. Did you mean 'typeof import('./obj')'?


==== out/index.d.ts (1 errors) ====
    import Obj = require("./obj");
    declare class Container {
        usage: Obj;
               ~~~
!!! error TS2749: 'Obj' refers to a value, but is being used as a type here. Did you mean 'typeof Obj'?
        constructor();
    }
    export = Container;
    
==== out/obj.d.ts (1 errors) ====
    declare const _default: {
        new (): import("./obj");
                ~~~~~~~~~~~~~~~
!!! error TS1340: Module './obj' does not refer to a type, but is used as a type here. Did you mean 'typeof import('./obj')'?
    };
    export = _default;
    