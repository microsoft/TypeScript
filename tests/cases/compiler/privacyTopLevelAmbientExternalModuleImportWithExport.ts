// @module: commonjs
// @declaration: true
// @Filename: privacyTopLevelAmbientExternalModuleImportWithExport_require.ts
// Public elements
export class c_public {
    foo: string;
}

// @Filename: privacyTopLevelAmbientExternalModuleImportWithExport_require1.ts
export class c_public {
    bar: string;
}

// @Filename: privacyTopLevelAmbientExternalModuleImportWithExport_require2.ts
// private elements
// Export - Error ambient modules allowed only in global
declare module 'm' {
    export class c_private {
        baz: string;
    }
}


// @Filename: privacyTopLevelAmbientExternalModuleImportWithExport_require3.ts
declare module 'm2' {
    export class c_private {
        bing: string;
    }
}

// @Filename: privacyTopLevelAmbientExternalModuleImportWithExport_core.ts
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
