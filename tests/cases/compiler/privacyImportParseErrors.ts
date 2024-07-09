//@module: commonjs
export module m1 {
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

    export declare module "m1_M3_public" {
        export function f1();
        export class c1 {
        }
        export var v1: { new (): c1; };
        export var v2: c1;
    }

    declare module "m1_M4_private" {
        export function f1();
        export class c1 {
        }
        export var v1: { new (): c1; };
        export var v2: c1;
    }

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

    import m1_im3_private = require("m1_M3_public");
    export var m1_im3_private_v1_public = m1_im3_private.c1;
    export var m1_im3_private_v2_public = new m1_im3_private.c1();
    export var m1_im3_private_v3_public = m1_im3_private.f1;
    export var m1_im3_private_v4_public = m1_im3_private.f1();
    var m1_im3_private_v1_private = m1_im3_private.c1;
    var m1_im3_private_v2_private = new m1_im3_private.c1();
    var m1_im3_private_v3_private = m1_im3_private.f1;
    var m1_im3_private_v4_private = m1_im3_private.f1();

    import m1_im4_private = require("m1_M4_private");
    export var m1_im4_private_v1_public = m1_im4_private.c1;
    export var m1_im4_private_v2_public = new m1_im4_private.c1();
    export var m1_im4_private_v3_public = m1_im4_private.f1;
    export var m1_im4_private_v4_public = m1_im4_private.f1();
    var m1_im4_private_v1_private = m1_im4_private.c1;
    var m1_im4_private_v2_private = new m1_im4_private.c1();
    var m1_im4_private_v3_private = m1_im4_private.f1;
    var m1_im4_private_v4_private = m1_im4_private.f1();

    export import m1_im1_public = m1_M1_public;
    export import m1_im2_public = m1_M2_private;
    export import m1_im3_public = require("m1_M3_public");
    export import m1_im4_public = require("m1_M4_private");
}

module m2 {
    export module m2_M1_public {
        export class c1 {
        }
        export function f1() {
            return new c1;
        }
        export var v1 = c1;
        export var v2: c1;
    }

    module m2_M2_private {
        export class c1 {
        }
        export function f1() {
            return new c1;
        }
        export var v1 = c1;
        export var v2: c1;
    }

    export declare module "m2_M3_public" {
        export function f1();
        export class c1 {
        }
        export var v1: { new (): c1; };
        export var v2: c1;
    }

    declare module "m2_M4_private" {
        export function f1();
        export class c1 {
        }
        export var v1: { new (): c1; };
        export var v2: c1;
    }

    import m1_im1_private = m2_M1_public;
    export var m1_im1_private_v1_public = m1_im1_private.c1;
    export var m1_im1_private_v2_public = new m1_im1_private.c1();
    export var m1_im1_private_v3_public = m1_im1_private.f1;
    export var m1_im1_private_v4_public = m1_im1_private.f1();
    var m1_im1_private_v1_private = m1_im1_private.c1;
    var m1_im1_private_v2_private = new m1_im1_private.c1();
    var m1_im1_private_v3_private = m1_im1_private.f1;
    var m1_im1_private_v4_private = m1_im1_private.f1();


    import m1_im2_private = m2_M2_private;
    export var m1_im2_private_v1_public = m1_im2_private.c1;
    export var m1_im2_private_v2_public = new m1_im2_private.c1();
    export var m1_im2_private_v3_public = m1_im2_private.f1;
    export var m1_im2_private_v4_public = m1_im2_private.f1();
    var m1_im2_private_v1_private = m1_im2_private.c1;
    var m1_im2_private_v2_private = new m1_im2_private.c1();
    var m1_im2_private_v3_private = m1_im2_private.f1;
    var m1_im2_private_v4_private = m1_im2_private.f1();

    import m1_im3_private = require("m2_M3_public");
    export var m1_im3_private_v1_public = m1_im3_private.c1;
    export var m1_im3_private_v2_public = new m1_im3_private.c1();
    export var m1_im3_private_v3_public = m1_im3_private.f1;
    export var m1_im3_private_v4_public = m1_im3_private.f1();
    var m1_im3_private_v1_private = m1_im3_private.c1;
    var m1_im3_private_v2_private = new m1_im3_private.c1();
    var m1_im3_private_v3_private = m1_im3_private.f1;
    var m1_im3_private_v4_private = m1_im3_private.f1();

    import m1_im4_private = require("m2_M4_private");
    export var m1_im4_private_v1_public = m1_im4_private.c1;
    export var m1_im4_private_v2_public = new m1_im4_private.c1();
    export var m1_im4_private_v3_public = m1_im4_private.f1;
    export var m1_im4_private_v4_public = m1_im4_private.f1();
    var m1_im4_private_v1_private = m1_im4_private.c1;
    var m1_im4_private_v2_private = new m1_im4_private.c1();
    var m1_im4_private_v3_private = m1_im4_private.f1;
    var m1_im4_private_v4_private = m1_im4_private.f1();

    // Parse error to export module
    export import m1_im1_public = m2_M1_public;
    export import m1_im2_public = m2_M2_private;
    export import m1_im3_public = require("m2_M3_public");
    export import m1_im4_public = require("m2_M4_private");
}

export module glo_M1_public {
    export class c1 {
    }
    export function f1() {
        return new c1;
    }
    export var v1 = c1;
    export var v2: c1;
}

export declare module "glo_M2_public" {
    export function f1();
    export class c1 {
    }
    export var v1: { new (): c1; };
    export var v2: c1;
}

export module glo_M3_private {
    export class c1 {
    }
    export function f1() {
        return new c1;
    }
    export var v1 = c1;
    export var v2: c1;
}

export declare module "glo_M4_private" {
    export function f1();
    export class c1 {
    }
    export var v1: { new (): c1; };
    export var v2: c1;
}


import glo_im1_private = glo_M1_public;
export var glo_im1_private_v1_public = glo_im1_private.c1;
export var glo_im1_private_v2_public = new glo_im1_private.c1();
export var glo_im1_private_v3_public = glo_im1_private.f1;
export var glo_im1_private_v4_public = glo_im1_private.f1();
var glo_im1_private_v1_private = glo_im1_private.c1;
var glo_im1_private_v2_private = new glo_im1_private.c1();
var glo_im1_private_v3_private = glo_im1_private.f1;
var glo_im1_private_v4_private = glo_im1_private.f1();


import glo_im2_private = require("glo_M2_public");
export var glo_im2_private_v1_public = glo_im2_private.c1;
export var glo_im2_private_v2_public = new glo_im2_private.c1();
export var glo_im2_private_v3_public = glo_im2_private.f1;
export var glo_im2_private_v4_public = glo_im2_private.f1();
var glo_im2_private_v1_private = glo_im2_private.c1;
var glo_im2_private_v2_private = new glo_im2_private.c1();
var glo_im2_private_v3_private = glo_im2_private.f1;
var glo_im2_private_v4_private = glo_im2_private.f1();

import glo_im3_private = glo_M3_private;
export var glo_im3_private_v1_public = glo_im3_private.c1;
export var glo_im3_private_v2_public = new glo_im3_private.c1();
export var glo_im3_private_v3_public = glo_im3_private.f1;
export var glo_im3_private_v4_public = glo_im3_private.f1();
var glo_im3_private_v1_private = glo_im3_private.c1;
var glo_im3_private_v2_private = new glo_im3_private.c1();
var glo_im3_private_v3_private = glo_im3_private.f1;
var glo_im3_private_v4_private = glo_im3_private.f1();

import glo_im4_private = require("glo_M4_private");
export var glo_im4_private_v1_public = glo_im4_private.c1;
export var glo_im4_private_v2_public = new glo_im4_private.c1();
export var glo_im4_private_v3_public = glo_im4_private.f1;
export var glo_im4_private_v4_public = glo_im4_private.f1();
var glo_im4_private_v1_private = glo_im4_private.c1;
var glo_im4_private_v2_private = new glo_im4_private.c1();
var glo_im4_private_v3_private = glo_im4_private.f1;
var glo_im4_private_v4_private = glo_im4_private.f1();

// Parse error to export module
export import glo_im1_public = glo_M1_public;
export import glo_im2_public = glo_M3_private;
export import glo_im3_public = require("glo_M2_public");
export import glo_im4_public = require("glo_M4_private");


export declare module "use_glo_M1_public" {
    import use_glo_M1_public = glo_M1_public;
    export var use_glo_M1_public_v1_public: { new (): use_glo_M1_public.c1; };
    export var use_glo_M1_public_v2_public: use_glo_M1_public;
    export var use_glo_M1_public_v3_public: () => use_glo_M1_public.c1;
    var use_glo_M1_public_v1_private: { new (): use_glo_M1_public.c1; };
    var use_glo_M1_public_v2_private: use_glo_M1_public;
    var use_glo_M1_public_v3_private: () => use_glo_M1_public.c1;

    import use_glo_M2_public = require("glo_M2_public");
    export var use_glo_M2_public_v1_public: { new (): use_glo_M2_public.c1; };
    export var use_glo_M2_public_v2_public: use_glo_M2_public;
    export var use_glo_M2_public_v3_public: () => use_glo_M2_public.c1;
    var use_glo_M2_public_v1_private: { new (): use_glo_M2_public.c1; };
    var use_glo_M2_public_v2_private: use_glo_M2_public;
    var use_glo_M2_public_v3_private: () => use_glo_M2_public.c1;

    module m2 {
        import errorImport = require("glo_M2_public");
        import nonerrorImport = glo_M1_public;

        module m5 {
            import m5_errorImport = require("glo_M2_public");
            import m5_nonerrorImport = glo_M1_public;
        }
    }
}


declare module "use_glo_M3_private" {
    import use_glo_M3_private = glo_M3_private;
    export var use_glo_M3_private_v1_public: { new (): use_glo_M3_private.c1; };
    export var use_glo_M3_private_v2_public: use_glo_M3_private;
    export var use_glo_M3_private_v3_public: () => use_glo_M3_private.c1;
    var use_glo_M3_private_v1_private: { new (): use_glo_M3_private.c1; };
    var use_glo_M3_private_v2_private: use_glo_M3_private;
    var use_glo_M3_private_v3_private: () => use_glo_M3_private.c1;

    import use_glo_M4_private = require("glo_M4_private");
    export var use_glo_M4_private_v1_public: { new (): use_glo_M4_private.c1; };
    export var use_glo_M4_private_v2_public: use_glo_M4_private;
    export var use_glo_M4_private_v3_public: () => use_glo_M4_private.c1;
    var use_glo_M4_private_v1_private: { new (): use_glo_M4_private.c1; };
    var use_glo_M4_private_v2_private: use_glo_M4_private;
    var use_glo_M4_private_v3_private: () => use_glo_M4_private.c1;

    module m2 {
        import errorImport = require("glo_M4_private");
        import nonerrorImport = glo_M3_private;

        module m5 {
            import m5_errorImport = require("glo_M4_private");
            import m5_nonerrorImport = glo_M3_private;
        }
    }
}

declare module "anotherParseError" {
    module m2 {
        declare module "abc" {
        }
    }

    module m2 {
        module "abc2" {
        }
    }
    module "abc3" {
    }
}

declare export module "anotherParseError2" {
    module m2 {
        declare module "abc" {
        }
    }

    module m2 {
        module "abc2" {
        }
    }
    module "abc3" {
    }
}

module m2 {
    import m3 = require("use_glo_M1_public");
    module m4 {
        var a = 10;
        import m2 = require("use_glo_M1_public");
    }

}

export module m3 {
    import m3 = require("use_glo_M1_public");
    module m4 {
        var a = 10;
        import m2 = require("use_glo_M1_public");
    }

}