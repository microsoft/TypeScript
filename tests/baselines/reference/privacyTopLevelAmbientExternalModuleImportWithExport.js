//// [privacyTopLevelAmbientExternalModuleImportWithExport_require.js]
// Public elements
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
// Privacy errors - importing private elements
var im_public_mi_private = require("privacyTopLevelAmbientExternalModuleImportWithExport_require");
exports.im_public_mi_private = im_public_mi_private;
var im_public_mu_private = require("privacyTopLevelAmbientExternalModuleImportWithExport_require1");
exports.im_public_mu_private = im_public_mu_private;
var im_public_mi_public = require("m");
exports.im_public_mi_public = im_public_mi_public;

// Usage of privacy error imports
var privateUse_im_public_mi_private = new exports.im_public_mi_private.c_private();
exports.publicUse_im_public_mi_private = new exports.im_public_mi_private.c_private();
var privateUse_im_public_mu_private = new exports.im_public_mu_private.c_private();
exports.publicUse_im_public_mu_private = new exports.im_public_mu_private.c_private();
var privateUse_im_public_mi_public = new im_public_mi_public.c_public();
exports.publicUse_im_public_mi_public = new im_public_mi_public.c_public();
var privateUse_im_public_mi_public = new im_public_mi_public.c_public();
exports.publicUse_im_public_mi_public = new im_public_mi_public.c_public();
