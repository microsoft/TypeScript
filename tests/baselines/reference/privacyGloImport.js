//// [privacyGloImport.ts]
module m1 {
    export module m1_M1_public {
        export class c1 {
        }
        export function f1() {
            return new c1;
        }
        export var v1 = c1;
        export var v2: c1;
    }

    module m1_M2_private {
        export class c1 {
        }
        export function f1() {
            return new c1;
        }
        export var v1 = c1;
        export var v2: c1;
    }

    //export declare module "m1_M3_public" {
    //    export function f1();
    //    export class c1 {
    //    }
    //    export var v1: { new (): c1; };
    //    export var v2: c1;
    //}

    //declare module "m1_M4_private" {
    //    export function f1();
    //    export class c1 {
    //    }
    //    export var v1: { new (): c1; };
    //    export var v2: c1;
    //}

    import m1_im1_private = m1_M1_public;
    export var m1_im1_private_v1_public = m1_im1_private.c1;
    export var m1_im1_private_v2_public = new m1_im1_private.c1();
    export var m1_im1_private_v3_public = m1_im1_private.f1;
    export var m1_im1_private_v4_public = m1_im1_private.f1();
    var m1_im1_private_v1_private = m1_im1_private.c1;
    var m1_im1_private_v2_private = new m1_im1_private.c1();
    var m1_im1_private_v3_private = m1_im1_private.f1;
    var m1_im1_private_v4_private = m1_im1_private.f1();


    import m1_im2_private = m1_M2_private;
    export var m1_im2_private_v1_public = m1_im2_private.c1;
    export var m1_im2_private_v2_public = new m1_im2_private.c1();
    export var m1_im2_private_v3_public = m1_im2_private.f1;
    export var m1_im2_private_v4_public = m1_im2_private.f1();
    var m1_im2_private_v1_private = m1_im2_private.c1;
    var m1_im2_private_v2_private = new m1_im2_private.c1();
    var m1_im2_private_v3_private = m1_im2_private.f1;
    var m1_im2_private_v4_private = m1_im2_private.f1();

    //import m1_im3_private = require("m1_M3_public");
    //export var m1_im3_private_v1_public = m1_im3_private.c1;
    //export var m1_im3_private_v2_public = new m1_im3_private.c1();
    //export var m1_im3_private_v3_public = m1_im3_private.f1;
    //export var m1_im3_private_v4_public = m1_im3_private.f1();
    //var m1_im3_private_v1_private = m1_im3_private.c1;
    //var m1_im3_private_v2_private = new m1_im3_private.c1();
    //var m1_im3_private_v3_private = m1_im3_private.f1;
    //var m1_im3_private_v4_private = m1_im3_private.f1();

    //import m1_im4_private = require("m1_M4_private");
    //export var m1_im4_private_v1_public = m1_im4_private.c1;
    //export var m1_im4_private_v2_public = new m1_im4_private.c1();
    //export var m1_im4_private_v3_public = m1_im4_private.f1;
    //export var m1_im4_private_v4_public = m1_im4_private.f1();
    //var m1_im4_private_v1_private = m1_im4_private.c1;
    //var m1_im4_private_v2_private = new m1_im4_private.c1();
    //var m1_im4_private_v3_private = m1_im4_private.f1;
    //var m1_im4_private_v4_private = m1_im4_private.f1();

    export import m1_im1_public = m1_M1_public;
    export import m1_im2_public = m1_M2_private;
    //export import m1_im3_public = require("m1_M3_public");
    //export import m1_im4_public = require("m1_M4_private");
}

module glo_M1_public {
    export class c1 {
    }
    export function f1() {
        return new c1;
    }
    export var v1 = c1;
    export var v2: c1;
}

declare module "glo_M2_public" {
    export function f1();
    export class c1 {
    }
    export var v1: { new (): c1; };
    export var v2: c1;
}

declare module "use_glo_M1_public" {
    import use_glo_M1_public = glo_M1_public;
    export var use_glo_M1_public_v1_public: { new (): use_glo_M1_public.c1; };
    export var use_glo_M1_public_v2_public: typeof use_glo_M1_public;
    export var use_glo_M1_public_v3_public: ()=> use_glo_M1_public.c1;
    var use_glo_M1_public_v1_private: { new (): use_glo_M1_public.c1; };
    var use_glo_M1_public_v2_private: typeof use_glo_M1_public;
    var use_glo_M1_public_v3_private: () => use_glo_M1_public.c1;

    import use_glo_M2_public = require("glo_M2_public");
    export var use_glo_M2_public_v1_public: { new (): use_glo_M2_public.c1; };
    export var use_glo_M2_public_v2_public: typeof use_glo_M2_public;
    export var use_glo_M2_public_v3_public: () => use_glo_M2_public.c1;
    var use_glo_M2_public_v1_private: { new (): use_glo_M2_public.c1; };
    var use_glo_M2_public_v2_private: typeof use_glo_M2_public;
    var use_glo_M2_public_v3_private: () => use_glo_M2_public.c1;

    module m2 {
        //import errorImport = require("glo_M2_public");
        import nonerrorImport = glo_M1_public;

        module m5 {
            //import m5_errorImport = require("glo_M2_public");
            import m5_nonerrorImport = glo_M1_public;
        }
    }
}

declare module "anotherParseError" {
    module m2 {
        //declare module "abc" {
        //}
    }

    module m2 {
        //module "abc2" {
        //}
    }
    //module "abc3" {
    //}
}

module m2 {
    //import m3 = require("use_glo_M1_public");
    module m4 {
        var a = 10;
        //import m2 = require("use_glo_M1_public");
    }

}

//// [privacyGloImport.js]
var m1;
(function (m1) {
    var m1_M1_public;
    (function (m1_M1_public) {
        var c1 = /** @class */ (function () {
            function c1() {
            }
            return c1;
        }());
        m1_M1_public.c1 = c1;
        function f1() {
            return new c1;
        }
        m1_M1_public.f1 = f1;
        m1_M1_public.v1 = c1;
    })(m1_M1_public = m1.m1_M1_public || (m1.m1_M1_public = {}));
    var m1_M2_private;
    (function (m1_M2_private) {
        var c1 = /** @class */ (function () {
            function c1() {
            }
            return c1;
        }());
        m1_M2_private.c1 = c1;
        function f1() {
            return new c1;
        }
        m1_M2_private.f1 = f1;
        m1_M2_private.v1 = c1;
    })(m1_M2_private || (m1_M2_private = {}));
    //export declare module "m1_M3_public" {
    //    export function f1();
    //    export class c1 {
    //    }
    //    export var v1: { new (): c1; };
    //    export var v2: c1;
    //}
    //declare module "m1_M4_private" {
    //    export function f1();
    //    export class c1 {
    //    }
    //    export var v1: { new (): c1; };
    //    export var v2: c1;
    //}
    var m1_im1_private = m1_M1_public;
    m1.m1_im1_private_v1_public = m1_im1_private.c1;
    m1.m1_im1_private_v2_public = new m1_im1_private.c1();
    m1.m1_im1_private_v3_public = m1_im1_private.f1;
    m1.m1_im1_private_v4_public = m1_im1_private.f1();
    var m1_im1_private_v1_private = m1_im1_private.c1;
    var m1_im1_private_v2_private = new m1_im1_private.c1();
    var m1_im1_private_v3_private = m1_im1_private.f1;
    var m1_im1_private_v4_private = m1_im1_private.f1();
    var m1_im2_private = m1_M2_private;
    m1.m1_im2_private_v1_public = m1_im2_private.c1;
    m1.m1_im2_private_v2_public = new m1_im2_private.c1();
    m1.m1_im2_private_v3_public = m1_im2_private.f1;
    m1.m1_im2_private_v4_public = m1_im2_private.f1();
    var m1_im2_private_v1_private = m1_im2_private.c1;
    var m1_im2_private_v2_private = new m1_im2_private.c1();
    var m1_im2_private_v3_private = m1_im2_private.f1;
    var m1_im2_private_v4_private = m1_im2_private.f1();
    //import m1_im3_private = require("m1_M3_public");
    //export var m1_im3_private_v1_public = m1_im3_private.c1;
    //export var m1_im3_private_v2_public = new m1_im3_private.c1();
    //export var m1_im3_private_v3_public = m1_im3_private.f1;
    //export var m1_im3_private_v4_public = m1_im3_private.f1();
    //var m1_im3_private_v1_private = m1_im3_private.c1;
    //var m1_im3_private_v2_private = new m1_im3_private.c1();
    //var m1_im3_private_v3_private = m1_im3_private.f1;
    //var m1_im3_private_v4_private = m1_im3_private.f1();
    //import m1_im4_private = require("m1_M4_private");
    //export var m1_im4_private_v1_public = m1_im4_private.c1;
    //export var m1_im4_private_v2_public = new m1_im4_private.c1();
    //export var m1_im4_private_v3_public = m1_im4_private.f1;
    //export var m1_im4_private_v4_public = m1_im4_private.f1();
    //var m1_im4_private_v1_private = m1_im4_private.c1;
    //var m1_im4_private_v2_private = new m1_im4_private.c1();
    //var m1_im4_private_v3_private = m1_im4_private.f1;
    //var m1_im4_private_v4_private = m1_im4_private.f1();
    m1.m1_im1_public = m1_M1_public;
    m1.m1_im2_public = m1_M2_private;
    //export import m1_im3_public = require("m1_M3_public");
    //export import m1_im4_public = require("m1_M4_private");
})(m1 || (m1 = {}));
var glo_M1_public;
(function (glo_M1_public) {
    var c1 = /** @class */ (function () {
        function c1() {
        }
        return c1;
    }());
    glo_M1_public.c1 = c1;
    function f1() {
        return new c1;
    }
    glo_M1_public.f1 = f1;
    glo_M1_public.v1 = c1;
})(glo_M1_public || (glo_M1_public = {}));
var m2;
(function (m2) {
    //import m3 = require("use_glo_M1_public");
    var m4;
    (function (m4) {
        var a = 10;
        //import m2 = require("use_glo_M1_public");
    })(m4 || (m4 = {}));
})(m2 || (m2 = {}));


//// [privacyGloImport.d.ts]
declare module m1 {
    module m1_M1_public {
        class c1 {
        }
        function f1(): c1;
        var v1: typeof c1;
        var v2: c1;
    }
    module m1_M2_private {
        class c1 {
        }
        function f1(): c1;
        var v1: typeof c1;
        var v2: c1;
    }
    import m1_im1_private = m1_M1_public;
    var m1_im1_private_v1_public: typeof m1_im1_private.c1;
    var m1_im1_private_v2_public: m1_im1_private.c1;
    var m1_im1_private_v3_public: typeof m1_im1_private.f1;
    var m1_im1_private_v4_public: m1_im1_private.c1;
    import m1_im2_private = m1_M2_private;
    var m1_im2_private_v1_public: typeof m1_im2_private.c1;
    var m1_im2_private_v2_public: m1_im2_private.c1;
    var m1_im2_private_v3_public: typeof m1_im2_private.f1;
    var m1_im2_private_v4_public: m1_im2_private.c1;
    export import m1_im1_public = m1_M1_public;
    export import m1_im2_public = m1_M2_private;
}
declare module glo_M1_public {
    class c1 {
    }
    function f1(): c1;
    var v1: typeof c1;
    var v2: c1;
}
declare module "glo_M2_public" {
    function f1(): any;
    class c1 {
    }
    var v1: {
        new (): c1;
    };
    var v2: c1;
}
declare module "use_glo_M1_public" {
    import use_glo_M1_public = glo_M1_public;
    var use_glo_M1_public_v1_public: {
        new (): use_glo_M1_public.c1;
    };
    var use_glo_M1_public_v2_public: typeof use_glo_M1_public;
    var use_glo_M1_public_v3_public: () => use_glo_M1_public.c1;
    var use_glo_M1_public_v1_private: {
        new (): use_glo_M1_public.c1;
    };
    var use_glo_M1_public_v2_private: typeof use_glo_M1_public;
    var use_glo_M1_public_v3_private: () => use_glo_M1_public.c1;
    import use_glo_M2_public = require("glo_M2_public");
    var use_glo_M2_public_v1_public: {
        new (): use_glo_M2_public.c1;
    };
    var use_glo_M2_public_v2_public: typeof use_glo_M2_public;
    var use_glo_M2_public_v3_public: () => use_glo_M2_public.c1;
    var use_glo_M2_public_v1_private: {
        new (): use_glo_M2_public.c1;
    };
    var use_glo_M2_public_v2_private: typeof use_glo_M2_public;
    var use_glo_M2_public_v3_private: () => use_glo_M2_public.c1;
    module m2 {
        module m5 {
        }
    }
}
declare module "anotherParseError" {
    module m2 {
    }
    module m2 {
    }
}
declare module m2 {
}
