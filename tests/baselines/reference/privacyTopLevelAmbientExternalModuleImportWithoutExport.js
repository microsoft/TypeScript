//// [tests/cases/compiler/privacyTopLevelAmbientExternalModuleImportWithoutExport.ts] ////

//// [privacyTopLevelAmbientExternalModuleImportWithoutExport_require.ts]
// Public elements
export class c_public {
    foo: string;
}

//// [privacyTopLevelAmbientExternalModuleImportWithoutExport_require1.ts]
export class c_public {
    bar: string;
}

//// [privacyTopLevelAmbientExternalModuleImportWithoutExport_require2.ts]
// private elements
// Export - Error ambient modules allowed only in global
declare module 'm' {
    export class c_private {
        baz: string
    }   
}

//// [privacyTopLevelAmbientExternalModuleImportWithoutExport_require3.ts]
declare module 'm2' {
    export class c_private {
        bing: string;
    }
}

//// [privacyTopLevelAmbientExternalModuleImportWithoutExport_core.ts]
///<reference path='privacyTopLevelAmbientExternalModuleImportWithoutExport_require2.ts'/>
///<reference path='privacyTopLevelAmbientExternalModuleImportWithoutExport_require3.ts'/>
// Privacy errors - importing private elements
import im_private_mi_private = require("m");
import im_private_mu_private = require("m2");
import im_private_mi_public = require("privacyTopLevelAmbientExternalModuleImportWithoutExport_require");
import im_private_mu_public = require("privacyTopLevelAmbientExternalModuleImportWithoutExport_require1");

// Usage of privacy error imports
var privateUse_im_private_mi_private = new im_private_mi_private.c_private();
export var publicUse_im_private_mi_private = new im_private_mi_private.c_private();
var privateUse_im_private_mu_private = new im_private_mu_private.c_private();
export var publicUse_im_private_mu_private = new im_private_mu_private.c_private();
var privateUse_im_private_mi_public = new im_private_mi_public.c_public();
export var publicUse_im_private_mi_public = new im_private_mi_public.c_public();
var privateUse_im_private_mi_public = new im_private_mi_public.c_public();
export var publicUse_im_private_mi_public = new im_private_mi_public.c_public();


//// [privacyTopLevelAmbientExternalModuleImportWithoutExport_require2.js]
//// [privacyTopLevelAmbientExternalModuleImportWithoutExport_require3.js]
//// [privacyTopLevelAmbientExternalModuleImportWithoutExport_require.js]
define(["require", "exports"], function (require, exports) {
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
});
//// [privacyTopLevelAmbientExternalModuleImportWithoutExport_require1.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.c_public = void 0;
    var c_public = /** @class */ (function () {
        function c_public() {
        }
        return c_public;
    }());
    exports.c_public = c_public;
});
//// [privacyTopLevelAmbientExternalModuleImportWithoutExport_core.js]
define(["require", "exports", "m", "m2", "privacyTopLevelAmbientExternalModuleImportWithoutExport_require"], function (require, exports, im_private_mi_private, im_private_mu_private, im_private_mi_public) {
    "use strict";
    exports.__esModule = true;
    exports.publicUse_im_private_mi_public = exports.publicUse_im_private_mu_private = exports.publicUse_im_private_mi_private = void 0;
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


//// [privacyTopLevelAmbientExternalModuleImportWithoutExport_require2.d.ts]
declare module 'm' {
    class c_private {
        baz: string;
    }
}
//// [privacyTopLevelAmbientExternalModuleImportWithoutExport_require3.d.ts]
declare module 'm2' {
    class c_private {
        bing: string;
    }
}
//// [privacyTopLevelAmbientExternalModuleImportWithoutExport_require.d.ts]
export declare class c_public {
    foo: string;
}
//// [privacyTopLevelAmbientExternalModuleImportWithoutExport_require1.d.ts]
export declare class c_public {
    bar: string;
}
//// [privacyTopLevelAmbientExternalModuleImportWithoutExport_core.d.ts]
/// <reference path="privacyTopLevelAmbientExternalModuleImportWithoutExport_require2.d.ts" />
/// <reference path="privacyTopLevelAmbientExternalModuleImportWithoutExport_require3.d.ts" />
import im_private_mi_private = require("m");
import im_private_mu_private = require("m2");
import im_private_mi_public = require("privacyTopLevelAmbientExternalModuleImportWithoutExport_require");
export declare var publicUse_im_private_mi_private: im_private_mi_private.c_private;
export declare var publicUse_im_private_mu_private: im_private_mu_private.c_private;
export declare var publicUse_im_private_mi_public: im_private_mi_public.c_public;
export declare var publicUse_im_private_mi_public: im_private_mi_public.c_public;
