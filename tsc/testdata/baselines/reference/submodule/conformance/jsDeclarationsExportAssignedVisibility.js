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
export = class Obj {
    constructor() {
        this.x = 12;
    }
};
module.exports = class Obj {
    constructor() {
        this.x = 12;
    }
};
//// [index.js]
const Obj = require("./obj");
class Container {
    constructor() {
        this.usage = new Obj();
    }
}
export = Container;
module.exports = Container;


//// [obj.d.ts]
declare const _default: {
    new (): import("./obj");
};
export = _default;
//// [index.d.ts]
export = Container;


//// [DtsFileErrors]


out/index.d.ts(1,10): error TS2304: Cannot find name 'Container'.


==== out/index.d.ts (1 errors) ====
    export = Container;
             ~~~~~~~~~
!!! error TS2304: Cannot find name 'Container'.
    
==== out/obj.d.ts (0 errors) ====
    declare const _default: {
        new (): import("./obj");
    };
    export = _default;
    