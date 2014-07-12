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
// Privacy errors - importing private elements
export import im_public_mi_private = require("privacyTopLevelAmbientExternalModuleImportWithExport_require");
export import im_public_mu_private = require("privacyTopLevelAmbientExternalModuleImportWithExport_require1");
export import im_public_mi_public = require("m");
export import im_public_mu_public = require("m2");

// Usage of privacy error imports
var privateUse_im_public_mi_private = new im_public_mi_private.c_private();
export var publicUse_im_public_mi_private = new im_public_mi_private.c_private();
var privateUse_im_public_mu_private = new im_public_mu_private.c_private();
export var publicUse_im_public_mu_private = new im_public_mu_private.c_private();
var privateUse_im_public_mi_public = new im_public_mi_public.c_public();
export var publicUse_im_public_mi_public = new im_public_mi_public.c_public();
var privateUse_im_public_mi_public = new im_public_mi_public.c_public();
export var publicUse_im_public_mi_public = new im_public_mi_public.c_public();


//// [privacyTopLevelAmbientExternalModuleImportWithExport_require.js]
var c_public = (function () {
    function c_public() {
    }
    return c_public;
})();
exports.c_public = c_public;
//// [privacyTopLevelAmbientExternalModuleImportWithExport_require1.js]
var c_public = (function () {
    function c_public() {
    }
    return c_public;
})();
exports.c_public = c_public;
//// [privacyTopLevelAmbientExternalModuleImportWithExport_core.js]
exports.im_public_mi_private = require("privacyTopLevelAmbientExternalModuleImportWithExport_require");
exports.im_public_mu_private = require("privacyTopLevelAmbientExternalModuleImportWithExport_require1");
exports.im_public_mi_public = require("m");
var privateUse_im_public_mi_private = new exports.im_public_mi_private.c_private();
exports.publicUse_im_public_mi_private = new exports.im_public_mi_private.c_private();
var privateUse_im_public_mu_private = new exports.im_public_mu_private.c_private();
exports.publicUse_im_public_mu_private = new exports.im_public_mu_private.c_private();
var privateUse_im_public_mi_public = new exports.im_public_mi_public.c_public();
exports.publicUse_im_public_mi_public = new exports.im_public_mi_public.c_public();
var privateUse_im_public_mi_public = new exports.im_public_mi_public.c_public();
exports.publicUse_im_public_mi_public = new exports.im_public_mi_public.c_public();
