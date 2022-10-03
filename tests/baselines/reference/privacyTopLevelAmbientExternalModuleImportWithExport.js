//// [tests/cases/compiler/privacyTopLevelAmbientExternalModuleImportWithExport.ts] ////

//// [privacyTopLevelAmbientExternalModuleImportWithExport_require.ts]
// Public elements
export class c_public {
    foo: string;
}

//// [privacyTopLevelAmbientExternalModuleImportWithExport_require1.ts]
export class c_public {
    bar: string;
}

//// [privacyTopLevelAmbientExternalModuleImportWithExport_require2.ts]
// private elements
// Export - Error ambient modules allowed only in global
declare module 'm' {
    export class c_private {
        baz: string;
    }
}


//// [privacyTopLevelAmbientExternalModuleImportWithExport_require3.ts]
declare module 'm2' {
    export class c_private {
        bing: string;
    }
}

//// [privacyTopLevelAmbientExternalModuleImportWithExport_core.ts]
///<reference path='privacyTopLevelAmbientExternalModuleImportWithExport_require2.ts'/>
///<reference path='privacyTopLevelAmbientExternalModuleImportWithExport_require3.ts'/>
// Privacy errors - importing private elements
export import im_public_mi_private = require("./privacyTopLevelAmbientExternalModuleImportWithExport_require");
export import im_public_mu_private = require("./privacyTopLevelAmbientExternalModuleImportWithExport_require1");
export import im_public_mi_public = require("m");
export import im_public_mu_public = require("m2");

// Usage of privacy error imports
var privateUse_im_public_mi_private = new im_public_mi_private.c_public();
export var publicUse_im_public_mi_private = new im_public_mi_private.c_public();
var privateUse_im_public_mu_private = new im_public_mu_private.c_public();
export var publicUse_im_public_mu_private = new im_public_mu_private.c_public();
var privateUse_im_public_mi_public = new im_public_mi_public.c_private();
export var publicUse_im_public_mi_public = new im_public_mi_public.c_private();
var privateUse_im_public_mi_public = new im_public_mi_public.c_private();
export var publicUse_im_public_mi_public = new im_public_mi_public.c_private();


//// [privacyTopLevelAmbientExternalModuleImportWithExport_require2.js]
//// [privacyTopLevelAmbientExternalModuleImportWithExport_require3.js]
//// [privacyTopLevelAmbientExternalModuleImportWithExport_require.js]
"use strict";
exports.__esModule = true;
exports.c_public = void 0;
// Public elements
var c_public = /** @class */ (function () {
    function c_public() {
    }
    return c_public;
}());
exports.c_public = c_public;
//// [privacyTopLevelAmbientExternalModuleImportWithExport_require1.js]
"use strict";
exports.__esModule = true;
exports.c_public = void 0;
var c_public = /** @class */ (function () {
    function c_public() {
    }
    return c_public;
}());
exports.c_public = c_public;
//// [privacyTopLevelAmbientExternalModuleImportWithExport_core.js]
"use strict";
exports.__esModule = true;
exports.publicUse_im_public_mi_public = exports.publicUse_im_public_mu_private = exports.publicUse_im_public_mi_private = void 0;
///<reference path='privacyTopLevelAmbientExternalModuleImportWithExport_require2.ts'/>
///<reference path='privacyTopLevelAmbientExternalModuleImportWithExport_require3.ts'/>
// Privacy errors - importing private elements
exports.im_public_mi_private = require("./privacyTopLevelAmbientExternalModuleImportWithExport_require");
exports.im_public_mu_private = require("./privacyTopLevelAmbientExternalModuleImportWithExport_require1");
exports.im_public_mi_public = require("m");
exports.im_public_mu_public = require("m2");
// Usage of privacy error imports
var privateUse_im_public_mi_private = new exports.im_public_mi_private.c_public();
exports.publicUse_im_public_mi_private = new exports.im_public_mi_private.c_public();
var privateUse_im_public_mu_private = new exports.im_public_mu_private.c_public();
exports.publicUse_im_public_mu_private = new exports.im_public_mu_private.c_public();
var privateUse_im_public_mi_public = new exports.im_public_mi_public.c_private();
exports.publicUse_im_public_mi_public = new exports.im_public_mi_public.c_private();
var privateUse_im_public_mi_public = new exports.im_public_mi_public.c_private();
exports.publicUse_im_public_mi_public = new exports.im_public_mi_public.c_private();


//// [privacyTopLevelAmbientExternalModuleImportWithExport_require2.d.ts]
declare module 'm' {
    class c_private {
        baz: string;
    }
}
//// [privacyTopLevelAmbientExternalModuleImportWithExport_require3.d.ts]
declare module 'm2' {
    class c_private {
        bing: string;
    }
}
//// [privacyTopLevelAmbientExternalModuleImportWithExport_require.d.ts]
export declare class c_public {
    foo: string;
}
//// [privacyTopLevelAmbientExternalModuleImportWithExport_require1.d.ts]
export declare class c_public {
    bar: string;
}
//// [privacyTopLevelAmbientExternalModuleImportWithExport_core.d.ts]
/// <reference path="privacyTopLevelAmbientExternalModuleImportWithExport_require2.d.ts" />
/// <reference path="privacyTopLevelAmbientExternalModuleImportWithExport_require3.d.ts" />
export import im_public_mi_private = require("./privacyTopLevelAmbientExternalModuleImportWithExport_require");
export import im_public_mu_private = require("./privacyTopLevelAmbientExternalModuleImportWithExport_require1");
export import im_public_mi_public = require("m");
export import im_public_mu_public = require("m2");
export declare var publicUse_im_public_mi_private: im_public_mi_private.c_public;
export declare var publicUse_im_public_mu_private: im_public_mu_private.c_public;
export declare var publicUse_im_public_mi_public: im_public_mi_public.c_private;
export declare var publicUse_im_public_mi_public: im_public_mi_public.c_private;
