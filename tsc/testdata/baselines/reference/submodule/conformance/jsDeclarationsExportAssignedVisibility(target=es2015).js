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
    new (): {
        x: number;
    };
};
export = _default;
//// [index.d.ts]
export = Container;
