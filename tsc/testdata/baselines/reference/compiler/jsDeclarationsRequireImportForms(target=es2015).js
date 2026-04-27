//// [tests/cases/compiler/jsDeclarationsRequireImportForms.ts] ////

//// [obj.js]
class Obj {
    constructor() {
        this.x = 12;
    }
}
module.exports.Obj = Obj
//// [index.js]
const {Obj, Obj: Other} = require("./obj");

class Container {
    constructor() {
        this.usage = new Obj();
        /** @type {Other} */
        this.usage2 = new Other();
    }
}

module.exports = Container;

//// [obj.js]
"use strict";
class Obj {
    constructor() {
        this.x = 12;
    }
}
module.exports.Obj = Obj;
//// [index.js]
"use strict";
const { Obj, Obj: Other } = require("./obj");
class Container {
    constructor() {
        this.usage = new Obj();
        /** @type {Other} */
        this.usage2 = new Other();
    }
}
module.exports = Container;


//// [obj.d.ts]
declare class Obj {
    x: number;
    constructor();
}
export { Obj };
//// [index.d.ts]
import { Obj, Obj as Other } from "./obj";
declare class Container {
    usage: Obj;
    /** @type {Other} */
    usage2: Other;
    constructor();
}
export = Container;
