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
module.exports = Container;


//// [obj.d.ts]
export = Obj;
declare class Obj {
    x: number;
}
//// [index.d.ts]
export = Container;
declare class Container {
    usage: Obj;
}
import Obj = require("./obj");
