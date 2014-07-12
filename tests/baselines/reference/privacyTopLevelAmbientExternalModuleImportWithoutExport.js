//// [privacyTopLevelAmbientExternalModuleImportWithoutExport_require.js]
define(["require", "exports"], function(require, exports) {
    // Public elements
    var c_public = (function () {
        function c_public() {
        }
        return c_public;
    })();
    exports.c_public = c_public;
});
//// [privacyTopLevelAmbientExternalModuleImportWithoutExport_require1.js]
define(["require", "exports"], function(require, exports) {
    var c_public = (function () {
        function c_public() {
        }
        return c_public;
    })();
    exports.c_public = c_public;
});
//// [privacyTopLevelAmbientExternalModuleImportWithoutExport_core.js]
define(["require", "exports", "m", "m2", "privacyTopLevelAmbientExternalModuleImportWithoutExport_require"], function(require, exports, im_private_mi_private, im_private_mu_private, im_private_mi_public) {
    // Usage of privacy error imports
    var privateUse_im_private_mi_private = new im_private_mi_private.c_private();
    exports.publicUse_im_private_mi_private = new im_private_mi_private.c_private();
    var privateUse_im_private_mu_private = new im_private_mu_private.c_private();
    exports.publicUse_im_private_mu_private = new im_private_mu_private.c_private();
    var privateUse_im_private_mi_public = new im_private_mi_public.c_public();
    exports.publicUse_im_private_mi_public = new im_private_mi_public.c_public();
    var privateUse_im_private_mi_public = new im_private_mi_public.c_public();
    exports.publicUse_im_private_mi_public = new im_private_mi_public.c_public();
});
