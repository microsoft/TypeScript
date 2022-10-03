//// [importDeclRefereingExternalModuleWithNoResolve.ts]
import b = require("externalModule");
declare module "m1" {
    import im2 = require("externalModule");
}


//// [importDeclRefereingExternalModuleWithNoResolve.js]
"use strict";
exports.__esModule = true;
