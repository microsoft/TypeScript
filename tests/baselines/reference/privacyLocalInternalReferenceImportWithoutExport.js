//// [privacyLocalInternalReferenceImportWithoutExport.js]
define(["require", "exports"], function(require, exports) {
    // private elements
    var m_private;
    (function (m_private) {
        var c_private = (function () {
            function c_private() {
            }
            return c_private;
        })();
        m_private.c_private = c_private;
        (function (e_private) {
            e_private[e_private["Happy"] = 0] = "Happy";
            e_private[e_private["Grumpy"] = 1] = "Grumpy";
        })(m_private.e_private || (m_private.e_private = {}));
        var e_private = m_private.e_private;
        function f_private() {
            return new c_private();
        }
        m_private.f_private = f_private;
        m_private.v_private = new c_private();

        (function (mi_private) {
            var c = (function () {
                function c() {
                }
                return c;
            })();
            mi_private.c = c;
        })(m_private.mi_private || (m_private.mi_private = {}));
        var mi_private = m_private.mi_private;
    })(m_private || (m_private = {}));

    // Public elements
    (function (m_public) {
        var c_public = (function () {
            function c_public() {
            }
            return c_public;
        })();
        m_public.c_public = c_public;
        (function (e_public) {
            e_public[e_public["Happy"] = 0] = "Happy";
            e_public[e_public["Grumpy"] = 1] = "Grumpy";
        })(m_public.e_public || (m_public.e_public = {}));
        var e_public = m_public.e_public;
        function f_public() {
            return new c_public();
        }
        m_public.f_public = f_public;
        m_public.v_public = 10;

        (function (mi_public) {
            var c = (function () {
                function c() {
                }
                return c;
            })();
            mi_public.c = c;
        })(m_public.mi_public || (m_public.mi_public = {}));
        var mi_public = m_public.mi_public;
    })(exports.m_public || (exports.m_public = {}));
    var m_public = exports.m_public;

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
        var privateUse_im_private_e_private = 0 /* Happy */;
        import_public.publicUse_im_private_e_private = 1 /* Grumpy */;
        var privateUse_im_private_f_private = im_private_f_private();
        import_public.publicUse_im_private_f_private = im_private_f_private();
        var privateUse_im_private_v_private = im_private_v_private;
        import_public.publicUse_im_private_v_private = im_private_v_private;
        var privateUse_im_private_i_private;
        import_public.publicUse_im_private_i_private;
        var privateUse_im_private_mi_private = new im_private_mi_private.c();
        import_public.publicUse_im_private_mi_private = new im_private_mi_private.c();
        var privateUse_im_private_mu_private;
        import_public.publicUse_im_private_mu_private;

        // No Privacy errors - importing public elements
        var im_private_c_public = m_public.c_public;
        var im_private_e_public = m_public.e_public;
        var im_private_f_public = m_public.f_public;
        var im_private_v_public = m_public.v_public;

        var im_private_mi_public = m_public.mi_public;

        // Usage of above decls
        var privateUse_im_private_c_public = new im_private_c_public();
        import_public.publicUse_im_private_c_public = new im_private_c_public();
        var privateUse_im_private_e_public = 0 /* Happy */;
        import_public.publicUse_im_private_e_public = 1 /* Grumpy */;
        var privateUse_im_private_f_public = im_private_f_public();
        import_public.publicUse_im_private_f_public = im_private_f_public();
        var privateUse_im_private_v_public = im_private_v_public;
        import_public.publicUse_im_private_v_public = im_private_v_public;
        var privateUse_im_private_i_public;
        import_public.publicUse_im_private_i_public;
        var privateUse_im_private_mi_public = new im_private_mi_public.c();
        import_public.publicUse_im_private_mi_public = new im_private_mi_public.c();
        var privateUse_im_private_mu_public;
        import_public.publicUse_im_private_mu_public;
    })(exports.import_public || (exports.import_public = {}));
    var import_public = exports.import_public;

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
        var privateUse_im_private_e_private = 0 /* Happy */;
        import_private.publicUse_im_private_e_private = 1 /* Grumpy */;
        var privateUse_im_private_f_private = im_private_f_private();
        import_private.publicUse_im_private_f_private = im_private_f_private();
        var privateUse_im_private_v_private = im_private_v_private;
        import_private.publicUse_im_private_v_private = im_private_v_private;
        var privateUse_im_private_i_private;
        import_private.publicUse_im_private_i_private;
        var privateUse_im_private_mi_private = new im_private_mi_private.c();
        import_private.publicUse_im_private_mi_private = new im_private_mi_private.c();
        var privateUse_im_private_mu_private;
        import_private.publicUse_im_private_mu_private;

        // No privacy Error - importing public elements
        var im_private_c_public = m_public.c_public;
        var im_private_e_public = m_public.e_public;
        var im_private_f_public = m_public.f_public;
        var im_private_v_public = m_public.v_public;

        var im_private_mi_public = m_public.mi_public;

        // Usage of above decls
        var privateUse_im_private_c_public = new im_private_c_public();
        import_private.publicUse_im_private_c_public = new im_private_c_public();
        var privateUse_im_private_e_public = 0 /* Happy */;
        import_private.publicUse_im_private_e_public = 1 /* Grumpy */;
        var privateUse_im_private_f_public = im_private_f_public();
        import_private.publicUse_im_private_f_public = im_private_f_public();
        var privateUse_im_private_v_public = im_private_v_public;
        import_private.publicUse_im_private_v_public = im_private_v_public;
        var privateUse_im_private_i_public;
        import_private.publicUse_im_private_i_public;
        var privateUse_im_private_mi_public = new im_private_mi_public.c();
        import_private.publicUse_im_private_mi_public = new im_private_mi_public.c();
        var privateUse_im_private_mu_public;
        import_private.publicUse_im_private_mu_public;
    })(import_private || (import_private = {}));
});
