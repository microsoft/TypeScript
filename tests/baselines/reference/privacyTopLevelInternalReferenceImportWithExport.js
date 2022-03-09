//// [privacyTopLevelInternalReferenceImportWithExport.ts]
// private elements
module m_private {
    export class c_private {
    }
    export enum e_private {
        Happy,
        Grumpy
    }
    export function f_private() {
        return new c_private();
    }
    export var v_private = new c_private();
    export interface i_private {
    }
    export module mi_private {
        export class c {
        }
    }
    export module mu_private {
        export interface i {
        }
    }
}

// Public elements
export module m_public {
    export class c_public {
    }
    export enum e_public {
        Happy,
        Grumpy
    }
    export function f_public() {
        return new c_public();
    }
    export var v_public = 10;
    export interface i_public {
    }
    export module mi_public {
        export class c {
        }
    }
    export module mu_public {
        export interface i {
        }
    }
}

// Privacy errors - importing private elements
export import im_public_c_private = m_private.c_private;
export import im_public_e_private = m_private.e_private;
export import im_public_f_private = m_private.f_private;
export import im_public_v_private = m_private.v_private;
export import im_public_i_private = m_private.i_private;
export import im_public_mi_private = m_private.mi_private;
export import im_public_mu_private = m_private.mu_private;

// Usage of privacy error imports
var privateUse_im_public_c_private = new im_public_c_private();
export var publicUse_im_public_c_private = new im_public_c_private();
var privateUse_im_public_e_private = im_public_e_private.Happy;
export var publicUse_im_public_e_private = im_public_e_private.Grumpy;
var privateUse_im_public_f_private = im_public_f_private();
export var publicUse_im_public_f_private = im_public_f_private();
var privateUse_im_public_v_private = im_public_v_private;
export var publicUse_im_public_v_private = im_public_v_private;
var privateUse_im_public_i_private: im_public_i_private;
export var publicUse_im_public_i_private: im_public_i_private;
var privateUse_im_public_mi_private = new im_public_mi_private.c();
export var publicUse_im_public_mi_private = new im_public_mi_private.c();
var privateUse_im_public_mu_private: im_public_mu_private.i;
export var publicUse_im_public_mu_private: im_public_mu_private.i;


// No Privacy errors - importing public elements
export import im_public_c_public = m_public.c_public;
export import im_public_e_public = m_public.e_public;
export import im_public_f_public = m_public.f_public;
export import im_public_v_public = m_public.v_public;
export import im_public_i_public = m_public.i_public;
export import im_public_mi_public = m_public.mi_public;
export import im_public_mu_public = m_public.mu_public;

// Usage of above decls
var privateUse_im_public_c_public = new im_public_c_public();
export var publicUse_im_public_c_public = new im_public_c_public();
var privateUse_im_public_e_public = im_public_e_public.Happy;
export var publicUse_im_public_e_public = im_public_e_public.Grumpy;
var privateUse_im_public_f_public = im_public_f_public();
export var publicUse_im_public_f_public = im_public_f_public();
var privateUse_im_public_v_public = im_public_v_public;
export var publicUse_im_public_v_public = im_public_v_public;
var privateUse_im_public_i_public: im_public_i_public;
export var publicUse_im_public_i_public: im_public_i_public;
var privateUse_im_public_mi_public = new im_public_mi_public.c();
export var publicUse_im_public_mi_public = new im_public_mi_public.c();
var privateUse_im_public_mu_public: im_public_mu_public.i;
export var publicUse_im_public_mu_public: im_public_mu_public.i;


//// [privacyTopLevelInternalReferenceImportWithExport.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.publicUse_im_public_mu_public = exports.publicUse_im_public_mi_public = exports.publicUse_im_public_i_public = exports.publicUse_im_public_v_public = exports.publicUse_im_public_f_public = exports.publicUse_im_public_e_public = exports.publicUse_im_public_c_public = exports.im_public_mi_public = exports.im_public_v_public = exports.im_public_f_public = exports.im_public_e_public = exports.im_public_c_public = exports.publicUse_im_public_mu_private = exports.publicUse_im_public_mi_private = exports.publicUse_im_public_i_private = exports.publicUse_im_public_v_private = exports.publicUse_im_public_f_private = exports.publicUse_im_public_e_private = exports.publicUse_im_public_c_private = exports.im_public_mi_private = exports.im_public_v_private = exports.im_public_f_private = exports.im_public_e_private = exports.im_public_c_private = exports.m_public = void 0;
    // private elements
    var m_private;
    (function (m_private) {
        var c_private = /** @class */ (function () {
            function c_private() {
            }
            return c_private;
        }());
        m_private.c_private = c_private;
        var e_private;
        (function (e_private) {
            e_private[e_private["Happy"] = 0] = "Happy";
            e_private[e_private["Grumpy"] = 1] = "Grumpy";
        })(e_private = m_private.e_private || (m_private.e_private = {}));
        function f_private() {
            return new c_private();
        }
        m_private.f_private = f_private;
        m_private.v_private = new c_private();
        var mi_private;
        (function (mi_private) {
            var c = /** @class */ (function () {
                function c() {
                }
                return c;
            }());
            mi_private.c = c;
        })(mi_private = m_private.mi_private || (m_private.mi_private = {}));
    })(m_private || (m_private = {}));
    // Public elements
    var m_public;
    (function (m_public) {
        var c_public = /** @class */ (function () {
            function c_public() {
            }
            return c_public;
        }());
        m_public.c_public = c_public;
        var e_public;
        (function (e_public) {
            e_public[e_public["Happy"] = 0] = "Happy";
            e_public[e_public["Grumpy"] = 1] = "Grumpy";
        })(e_public = m_public.e_public || (m_public.e_public = {}));
        function f_public() {
            return new c_public();
        }
        m_public.f_public = f_public;
        m_public.v_public = 10;
        var mi_public;
        (function (mi_public) {
            var c = /** @class */ (function () {
                function c() {
                }
                return c;
            }());
            mi_public.c = c;
        })(mi_public = m_public.mi_public || (m_public.mi_public = {}));
    })(m_public = exports.m_public || (exports.m_public = {}));
    // Privacy errors - importing private elements
    exports.im_public_c_private = m_private.c_private;
    exports.im_public_e_private = m_private.e_private;
    exports.im_public_f_private = m_private.f_private;
    exports.im_public_v_private = m_private.v_private;
    exports.im_public_mi_private = m_private.mi_private;
    // Usage of privacy error imports
    var privateUse_im_public_c_private = new exports.im_public_c_private();
    exports.publicUse_im_public_c_private = new exports.im_public_c_private();
    var privateUse_im_public_e_private = exports.im_public_e_private.Happy;
    exports.publicUse_im_public_e_private = exports.im_public_e_private.Grumpy;
    var privateUse_im_public_f_private = (0, exports.im_public_f_private)();
    exports.publicUse_im_public_f_private = (0, exports.im_public_f_private)();
    var privateUse_im_public_v_private = exports.im_public_v_private;
    exports.publicUse_im_public_v_private = exports.im_public_v_private;
    var privateUse_im_public_i_private;
    var privateUse_im_public_mi_private = new exports.im_public_mi_private.c();
    exports.publicUse_im_public_mi_private = new exports.im_public_mi_private.c();
    var privateUse_im_public_mu_private;
    // No Privacy errors - importing public elements
    exports.im_public_c_public = m_public.c_public;
    exports.im_public_e_public = m_public.e_public;
    exports.im_public_f_public = m_public.f_public;
    exports.im_public_v_public = m_public.v_public;
    exports.im_public_mi_public = m_public.mi_public;
    // Usage of above decls
    var privateUse_im_public_c_public = new exports.im_public_c_public();
    exports.publicUse_im_public_c_public = new exports.im_public_c_public();
    var privateUse_im_public_e_public = exports.im_public_e_public.Happy;
    exports.publicUse_im_public_e_public = exports.im_public_e_public.Grumpy;
    var privateUse_im_public_f_public = (0, exports.im_public_f_public)();
    exports.publicUse_im_public_f_public = (0, exports.im_public_f_public)();
    var privateUse_im_public_v_public = exports.im_public_v_public;
    exports.publicUse_im_public_v_public = exports.im_public_v_public;
    var privateUse_im_public_i_public;
    var privateUse_im_public_mi_public = new exports.im_public_mi_public.c();
    exports.publicUse_im_public_mi_public = new exports.im_public_mi_public.c();
    var privateUse_im_public_mu_public;
});


//// [privacyTopLevelInternalReferenceImportWithExport.d.ts]
declare module m_private {
    class c_private {
    }
    enum e_private {
        Happy = 0,
        Grumpy = 1
    }
    function f_private(): c_private;
    var v_private: c_private;
    interface i_private {
    }
    module mi_private {
        class c {
        }
    }
    module mu_private {
        interface i {
        }
    }
}
export declare module m_public {
    class c_public {
    }
    enum e_public {
        Happy = 0,
        Grumpy = 1
    }
    function f_public(): c_public;
    var v_public: number;
    interface i_public {
    }
    module mi_public {
        class c {
        }
    }
    module mu_public {
        interface i {
        }
    }
}
export import im_public_c_private = m_private.c_private;
export import im_public_e_private = m_private.e_private;
export import im_public_f_private = m_private.f_private;
export import im_public_v_private = m_private.v_private;
export import im_public_i_private = m_private.i_private;
export import im_public_mi_private = m_private.mi_private;
export import im_public_mu_private = m_private.mu_private;
export declare var publicUse_im_public_c_private: im_public_c_private;
export declare var publicUse_im_public_e_private: im_public_e_private;
export declare var publicUse_im_public_f_private: im_public_c_private;
export declare var publicUse_im_public_v_private: im_public_c_private;
export declare var publicUse_im_public_i_private: im_public_i_private;
export declare var publicUse_im_public_mi_private: im_public_mi_private.c;
export declare var publicUse_im_public_mu_private: im_public_mu_private.i;
export import im_public_c_public = m_public.c_public;
export import im_public_e_public = m_public.e_public;
export import im_public_f_public = m_public.f_public;
export import im_public_v_public = m_public.v_public;
export import im_public_i_public = m_public.i_public;
export import im_public_mi_public = m_public.mi_public;
export import im_public_mu_public = m_public.mu_public;
export declare var publicUse_im_public_c_public: im_public_c_public;
export declare var publicUse_im_public_e_public: im_public_e_public;
export declare var publicUse_im_public_f_public: im_public_c_public;
export declare var publicUse_im_public_v_public: number;
export declare var publicUse_im_public_i_public: im_public_i_public;
export declare var publicUse_im_public_mi_public: im_public_mi_public.c;
export declare var publicUse_im_public_mu_public: im_public_mu_public.i;
export {};
