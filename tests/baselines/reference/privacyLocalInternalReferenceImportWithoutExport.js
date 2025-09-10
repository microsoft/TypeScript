//// [tests/cases/compiler/privacyLocalInternalReferenceImportWithoutExport.ts] ////

//// [privacyLocalInternalReferenceImportWithoutExport.ts]
// private elements
namespace m_private {
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
    export namespace mi_private {
        export class c {
        }
    }
    export namespace mu_private {
        export interface i {
        }
    }
}

// Public elements
export namespace m_public {
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
    export namespace mi_public {
        export class c {
        }
    }
    export namespace mu_public {
        export interface i {
        }
    }
}

export namespace import_public {
    // No Privacy errors - importing private elements
    import im_private_c_private = m_private.c_private;
    import im_private_e_private = m_private.e_private;
    import im_private_f_private = m_private.f_private;
    import im_private_v_private = m_private.v_private;
    import im_private_i_private = m_private.i_private;
    import im_private_mi_private = m_private.mi_private;
    import im_private_mu_private = m_private.mu_private;

    // Usage of above decls
    var privateUse_im_private_c_private = new im_private_c_private();
    export var publicUse_im_private_c_private = new im_private_c_private();
    var privateUse_im_private_e_private = im_private_e_private.Happy;
    export var publicUse_im_private_e_private = im_private_e_private.Grumpy;
    var privateUse_im_private_f_private = im_private_f_private();
    export var publicUse_im_private_f_private = im_private_f_private();
    var privateUse_im_private_v_private = im_private_v_private;
    export var publicUse_im_private_v_private = im_private_v_private;
    var privateUse_im_private_i_private: im_private_i_private;
    export var publicUse_im_private_i_private: im_private_i_private;
    var privateUse_im_private_mi_private = new im_private_mi_private.c();
    export var publicUse_im_private_mi_private = new im_private_mi_private.c();
    var privateUse_im_private_mu_private: im_private_mu_private.i;
    export var publicUse_im_private_mu_private: im_private_mu_private.i;


    // No Privacy errors - importing public elements
    import im_private_c_public = m_public.c_public;
    import im_private_e_public = m_public.e_public;
    import im_private_f_public = m_public.f_public;
    import im_private_v_public = m_public.v_public;
    import im_private_i_public = m_public.i_public;
    import im_private_mi_public = m_public.mi_public;
    import im_private_mu_public = m_public.mu_public;

    // Usage of above decls
    var privateUse_im_private_c_public = new im_private_c_public();
    export var publicUse_im_private_c_public = new im_private_c_public();
    var privateUse_im_private_e_public = im_private_e_public.Happy;
    export var publicUse_im_private_e_public = im_private_e_public.Grumpy;
    var privateUse_im_private_f_public = im_private_f_public();
    export var publicUse_im_private_f_public = im_private_f_public();
    var privateUse_im_private_v_public = im_private_v_public;
    export var publicUse_im_private_v_public = im_private_v_public;
    var privateUse_im_private_i_public: im_private_i_public;
    export var publicUse_im_private_i_public: im_private_i_public;
    var privateUse_im_private_mi_public = new im_private_mi_public.c();
    export var publicUse_im_private_mi_public = new im_private_mi_public.c();
    var privateUse_im_private_mu_public: im_private_mu_public.i;
    export var publicUse_im_private_mu_public: im_private_mu_public.i;
}

namespace import_private {
    // No Privacy errors - importing private elements
    import im_private_c_private = m_private.c_private;
    import im_private_e_private = m_private.e_private;
    import im_private_f_private = m_private.f_private;
    import im_private_v_private = m_private.v_private;
    import im_private_i_private = m_private.i_private;
    import im_private_mi_private = m_private.mi_private;
    import im_private_mu_private = m_private.mu_private;

    // Usage of above decls
    var privateUse_im_private_c_private = new im_private_c_private();
    export var publicUse_im_private_c_private = new im_private_c_private();
    var privateUse_im_private_e_private = im_private_e_private.Happy;
    export var publicUse_im_private_e_private = im_private_e_private.Grumpy;
    var privateUse_im_private_f_private = im_private_f_private();
    export var publicUse_im_private_f_private = im_private_f_private();
    var privateUse_im_private_v_private = im_private_v_private;
    export var publicUse_im_private_v_private = im_private_v_private;
    var privateUse_im_private_i_private: im_private_i_private;
    export var publicUse_im_private_i_private: im_private_i_private;
    var privateUse_im_private_mi_private = new im_private_mi_private.c();
    export var publicUse_im_private_mi_private = new im_private_mi_private.c();
    var privateUse_im_private_mu_private: im_private_mu_private.i;
    export var publicUse_im_private_mu_private: im_private_mu_private.i;

    // No privacy Error - importing public elements
    import im_private_c_public = m_public.c_public;
    import im_private_e_public = m_public.e_public;
    import im_private_f_public = m_public.f_public;
    import im_private_v_public = m_public.v_public;
    import im_private_i_public = m_public.i_public;
    import im_private_mi_public = m_public.mi_public;
    import im_private_mu_public = m_public.mu_public;

    // Usage of above decls
    var privateUse_im_private_c_public = new im_private_c_public();
    export var publicUse_im_private_c_public = new im_private_c_public();
    var privateUse_im_private_e_public = im_private_e_public.Happy;
    export var publicUse_im_private_e_public = im_private_e_public.Grumpy;
    var privateUse_im_private_f_public = im_private_f_public();
    export var publicUse_im_private_f_public = im_private_f_public();
    var privateUse_im_private_v_public = im_private_v_public;
    export var publicUse_im_private_v_public = im_private_v_public;
    var privateUse_im_private_i_public: im_private_i_public;
    export var publicUse_im_private_i_public: im_private_i_public;
    var privateUse_im_private_mi_public = new im_private_mi_public.c();
    export var publicUse_im_private_mi_public = new im_private_mi_public.c();
    var privateUse_im_private_mu_public: im_private_mu_public.i;
    export var publicUse_im_private_mu_public: im_private_mu_public.i;
}

//// [privacyLocalInternalReferenceImportWithoutExport.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.import_public = exports.m_public = void 0;
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
    })(m_public || (exports.m_public = m_public = {}));
    var import_public;
    (function (import_public) {
        // No Privacy errors - importing private elements
        var im_private_c_private = m_private.c_private;
        var im_private_e_private = m_private.e_private;
        var im_private_f_private = m_private.f_private;
        var im_private_v_private = m_private.v_private;
        var im_private_mi_private = m_private.mi_private;
        // Usage of above decls
        var privateUse_im_private_c_private = new im_private_c_private();
        import_public.publicUse_im_private_c_private = new im_private_c_private();
        var privateUse_im_private_e_private = im_private_e_private.Happy;
        import_public.publicUse_im_private_e_private = im_private_e_private.Grumpy;
        var privateUse_im_private_f_private = im_private_f_private();
        import_public.publicUse_im_private_f_private = im_private_f_private();
        var privateUse_im_private_v_private = im_private_v_private;
        import_public.publicUse_im_private_v_private = im_private_v_private;
        var privateUse_im_private_i_private;
        var privateUse_im_private_mi_private = new im_private_mi_private.c();
        import_public.publicUse_im_private_mi_private = new im_private_mi_private.c();
        var privateUse_im_private_mu_private;
        // No Privacy errors - importing public elements
        var im_private_c_public = m_public.c_public;
        var im_private_e_public = m_public.e_public;
        var im_private_f_public = m_public.f_public;
        var im_private_v_public = m_public.v_public;
        var im_private_mi_public = m_public.mi_public;
        // Usage of above decls
        var privateUse_im_private_c_public = new im_private_c_public();
        import_public.publicUse_im_private_c_public = new im_private_c_public();
        var privateUse_im_private_e_public = im_private_e_public.Happy;
        import_public.publicUse_im_private_e_public = im_private_e_public.Grumpy;
        var privateUse_im_private_f_public = im_private_f_public();
        import_public.publicUse_im_private_f_public = im_private_f_public();
        var privateUse_im_private_v_public = im_private_v_public;
        import_public.publicUse_im_private_v_public = im_private_v_public;
        var privateUse_im_private_i_public;
        var privateUse_im_private_mi_public = new im_private_mi_public.c();
        import_public.publicUse_im_private_mi_public = new im_private_mi_public.c();
        var privateUse_im_private_mu_public;
    })(import_public || (exports.import_public = import_public = {}));
    var import_private;
    (function (import_private) {
        // No Privacy errors - importing private elements
        var im_private_c_private = m_private.c_private;
        var im_private_e_private = m_private.e_private;
        var im_private_f_private = m_private.f_private;
        var im_private_v_private = m_private.v_private;
        var im_private_mi_private = m_private.mi_private;
        // Usage of above decls
        var privateUse_im_private_c_private = new im_private_c_private();
        import_private.publicUse_im_private_c_private = new im_private_c_private();
        var privateUse_im_private_e_private = im_private_e_private.Happy;
        import_private.publicUse_im_private_e_private = im_private_e_private.Grumpy;
        var privateUse_im_private_f_private = im_private_f_private();
        import_private.publicUse_im_private_f_private = im_private_f_private();
        var privateUse_im_private_v_private = im_private_v_private;
        import_private.publicUse_im_private_v_private = im_private_v_private;
        var privateUse_im_private_i_private;
        var privateUse_im_private_mi_private = new im_private_mi_private.c();
        import_private.publicUse_im_private_mi_private = new im_private_mi_private.c();
        var privateUse_im_private_mu_private;
        // No privacy Error - importing public elements
        var im_private_c_public = m_public.c_public;
        var im_private_e_public = m_public.e_public;
        var im_private_f_public = m_public.f_public;
        var im_private_v_public = m_public.v_public;
        var im_private_mi_public = m_public.mi_public;
        // Usage of above decls
        var privateUse_im_private_c_public = new im_private_c_public();
        import_private.publicUse_im_private_c_public = new im_private_c_public();
        var privateUse_im_private_e_public = im_private_e_public.Happy;
        import_private.publicUse_im_private_e_public = im_private_e_public.Grumpy;
        var privateUse_im_private_f_public = im_private_f_public();
        import_private.publicUse_im_private_f_public = im_private_f_public();
        var privateUse_im_private_v_public = im_private_v_public;
        import_private.publicUse_im_private_v_public = im_private_v_public;
        var privateUse_im_private_i_public;
        var privateUse_im_private_mi_public = new im_private_mi_public.c();
        import_private.publicUse_im_private_mi_public = new im_private_mi_public.c();
        var privateUse_im_private_mu_public;
    })(import_private || (import_private = {}));
});


//// [privacyLocalInternalReferenceImportWithoutExport.d.ts]
declare namespace m_private {
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
    namespace mi_private {
        class c {
        }
    }
    namespace mu_private {
        interface i {
        }
    }
}
export declare namespace m_public {
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
    namespace mi_public {
        class c {
        }
    }
    namespace mu_public {
        interface i {
        }
    }
}
export declare namespace import_public {
    import im_private_c_private = m_private.c_private;
    import im_private_e_private = m_private.e_private;
    import im_private_i_private = m_private.i_private;
    import im_private_mi_private = m_private.mi_private;
    import im_private_mu_private = m_private.mu_private;
    var publicUse_im_private_c_private: im_private_c_private;
    var publicUse_im_private_e_private: im_private_e_private;
    var publicUse_im_private_f_private: im_private_c_private;
    var publicUse_im_private_v_private: im_private_c_private;
    var publicUse_im_private_i_private: im_private_i_private;
    var publicUse_im_private_mi_private: im_private_mi_private.c;
    var publicUse_im_private_mu_private: im_private_mu_private.i;
    import im_private_c_public = m_public.c_public;
    import im_private_e_public = m_public.e_public;
    import im_private_i_public = m_public.i_public;
    import im_private_mi_public = m_public.mi_public;
    import im_private_mu_public = m_public.mu_public;
    var publicUse_im_private_c_public: im_private_c_public;
    var publicUse_im_private_e_public: im_private_e_public;
    var publicUse_im_private_f_public: im_private_c_public;
    var publicUse_im_private_v_public: number;
    var publicUse_im_private_i_public: im_private_i_public;
    var publicUse_im_private_mi_public: im_private_mi_public.c;
    var publicUse_im_private_mu_public: im_private_mu_public.i;
}
export {};
