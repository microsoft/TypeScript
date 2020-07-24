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
module.exports = /** @class */ (function () {
    function Obj() {
        this.x = 12;
    }
    return Obj;
}());
//// [index.js]
var Obj = require("./obj");
var Container = /** @class */ (function () {
    function Container() {
        this.usage = new Obj();
    }
    return Container;
}());
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
