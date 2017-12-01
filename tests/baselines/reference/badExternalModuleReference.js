//// [badExternalModuleReference.ts]
import a1 = require("garbage");
export declare var a: {
    test1: a1.connectModule;
    (): a1.connectExport;
};


//// [badExternalModuleReference.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
});
