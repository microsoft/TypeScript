//// [tests/cases/compiler/typeUsedAsValueError2.ts] ////

//// [helloInterface.ts]
interface HelloInterface {
    world: any;
}

export = HelloInterface;

//// [helloNamespace.ts]
namespace HelloNamespace {
    export type world = any;
}

export = HelloNamespace;

//// [world.ts]
import HelloInterface = require("helloInterface");
import HelloNamespace = require("helloNamespace");

HelloInterface.world;
HelloNamespace.world;

//// [helloInterface.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
});
//// [helloNamespace.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
});
//// [world.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    HelloInterface.world;
    HelloNamespace.world;
});
