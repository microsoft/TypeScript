//// [importDeclReferencingExternalModuleWithNoResolve.ts]
import b = require("externalModule");
declare module "m1" {
    import im2 = require("externalModule");
}


//// [importDeclReferencingExternalModuleWithNoResolve.js]
"use strict";
