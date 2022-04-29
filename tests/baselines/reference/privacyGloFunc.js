//// [privacyGloFunc.ts]
export module m1 {
    export class C1_public {
        private f1() {
        }
    }

    class C2_private {
    }

    export class C3_public {
        constructor (m1_c3_c1: C1_public);
        constructor (m1_c3_c2: C2_private); //error
        constructor (m1_c3_c1_2: any) {
        }

        private f1_private(m1_c3_f1_arg: C1_public) {
        }

        public f2_public(m1_c3_f2_arg: C1_public) {
        }

        private f3_private(m1_c3_f3_arg: C2_private) {
        }

        public f4_public(m1_c3_f4_arg: C2_private) { // error
        }

        private f5_private() {
            return new C1_public();
        }

        public f6_public() {
            return new C1_public();
        }

        private f7_private() {
            return new C2_private();
        }

        public f8_public() {
            return new C2_private();  // error
        }

        private f9_private(): C1_public {
            return new C1_public();
        }

        public f10_public(): C1_public {
            return new C1_public();
        }

        private f11_private(): C2_private {
            return new C2_private();
        }

        public f12_public(): C2_private { // error
            return new C2_private(); //error
        }
    }

    class C4_private {
        constructor (m1_c4_c1: C1_public);
        constructor (m1_c4_c2: C2_private);
        constructor (m1_c4_c1_2: any) {
        }
        private f1_private(m1_c4_f1_arg: C1_public) {
        }

        public f2_public(m1_c4_f2_arg: C1_public) {
        }

        private f3_private(m1_c4_f3_arg: C2_private) {
        }

        public f4_public(m1_c4_f4_arg: C2_private) {
        }


        private f5_private() {
            return new C1_public();
        }

        public f6_public() {
            return new C1_public();
        }

        private f7_private() {
            return new C2_private();
        }

        public f8_public() {
            return new C2_private();
        }


        private f9_private(): C1_public {
            return new C1_public();
        }

        public f10_public(): C1_public {
            return new C1_public();
        }

        private f11_private(): C2_private {
            return new C2_private();
        }

        public f12_public(): C2_private {
            return new C2_private();
        }
    }

    export class C5_public {
        constructor (m1_c5_c: C1_public) {
        }
    }
    
    class C6_private {
        constructor (m1_c6_c: C1_public) {
        }
    }
    export class C7_public {
        constructor (m1_c7_c: C2_private) { // error
        }
    }
    
    class C8_private {
        constructor (m1_c8_c: C2_private) {
        }
    }

    function f1_public(m1_f1_arg: C1_public) {
    }

    export function f2_public(m1_f2_arg: C1_public) {
    }

    function f3_public(m1_f3_arg: C2_private) {
    }

    export function f4_public(m1_f4_arg: C2_private) { // error
    }


    function f5_public() {
        return new C1_public();
    }

    export function f6_public() {
        return new C1_public();
    }

    function f7_public() {
        return new C2_private();
    }

    export function f8_public() {
        return new C2_private();  // error
    }


    function f9_private(): C1_public {
        return new C1_public();
    }

    export function f10_public(): C1_public {
        return new C1_public();
    }

    function f11_private(): C2_private {
        return new C2_private();
    }

    export function f12_public(): C2_private { // error
        return new C2_private(); //error
    }
}

module m2 {
    export class m2_C1_public {
        private f() {
        }
    }

    class m2_C2_private {
    }

    export class m2_C3_public {
        constructor (m2_c3_c1: m2_C1_public);
        constructor (m2_c3_c2: m2_C2_private);
        constructor (m2_c3_c1_2: any) {
        }

        private f1_private(m2_c3_f1_arg: m2_C1_public) {
        }

        public f2_public(m2_c3_f2_arg: m2_C1_public) {
        }

        private f3_private(m2_c3_f3_arg: m2_C2_private) {
        }

        public f4_public(m2_c3_f4_arg: m2_C2_private) {
        }

        private f5_private() {
            return new m2_C1_public();
        }

        public f6_public() {
            return new m2_C1_public();
        }

        private f7_private() {
            return new m2_C2_private();
        }

        public f8_public() {
            return new m2_C2_private();
        }

        private f9_private(): m2_C1_public {
            return new m2_C1_public();
        }

        public f10_public(): m2_C1_public {
            return new m2_C1_public();
        }

        private f11_private(): m2_C2_private {
            return new m2_C2_private();
        }

        public f12_public(): m2_C2_private {
            return new m2_C2_private();
        }
    }

    class m2_C4_private {
        constructor (m2_c4_c1: m2_C1_public);
        constructor (m2_c4_c2: m2_C2_private);
        constructor (m2_c4_c1_2: any) {
        }

        private f1_private(m2_c4_f1_arg: m2_C1_public) {
        }

        public f2_public(m2_c4_f2_arg: m2_C1_public) {
        }

        private f3_private(m2_c4_f3_arg: m2_C2_private) {
        }

        public f4_public(m2_c4_f4_arg: m2_C2_private) {
        }


        private f5_private() {
            return new m2_C1_public();
        }

        public f6_public() {
            return new m2_C1_public();
        }

        private f7_private() {
            return new m2_C2_private();
        }

        public f8_public() {
            return new m2_C2_private();
        }


        private f9_private(): m2_C1_public {
            return new m2_C1_public();
        }

        public f10_public(): m2_C1_public {
            return new m2_C1_public();
        }

        private f11_private(): m2_C2_private {
            return new m2_C2_private();
        }

        public f12_public(): m2_C2_private {
            return new m2_C2_private();
        }
    }

    export class m2_C5_public {
        constructor (m2_c5_c: m2_C1_public) {
        }
    }
    
    class m2_C6_private {
        constructor (m2_c6_c: m2_C1_public) {
        }
    }
    export class m2_C7_public {
        constructor (m2_c7_c: m2_C2_private) { 
        }
    }
    
    class m2_C8_private {
        constructor (m2_c8_c: m2_C2_private) {
        }
    }

    function f1_public(m2_f1_arg: m2_C1_public) {
    }

    export function f2_public(m2_f2_arg: m2_C1_public) {
    }

    function f3_public(m2_f3_arg: m2_C2_private) {
    }

    export function f4_public(m2_f4_arg: m2_C2_private) {
    }


    function f5_public() {
        return new m2_C1_public();
    }

    export function f6_public() {
        return new m2_C1_public();
    }

    function f7_public() {
        return new m2_C2_private();
    }

    export function f8_public() {
        return new m2_C2_private();
    }


    function f9_private(): m2_C1_public {
        return new m2_C1_public();
    }

    export function f10_public(): m2_C1_public {
        return new m2_C1_public();
    }

    function f11_private(): m2_C2_private {
        return new m2_C2_private();
    }

    export function f12_public(): m2_C2_private {
        return new m2_C2_private();
    }
}

class C5_private {
    private f() {
    }
}

export class C6_public {
}

export class C7_public {
    constructor (c7_c1: C5_private); // error
    constructor (c7_c2: C6_public);
    constructor (c7_c1_2: any) {
    }
    private f1_private(c7_f1_arg: C6_public) {
    }

    public f2_public(c7_f2_arg: C6_public) {
    }

    private f3_private(c7_f3_arg: C5_private) {
    }

    public f4_public(c7_f4_arg: C5_private) { //error
    }

    private f5_private() {
        return new C6_public();
    }

    public f6_public() {
        return new C6_public();
    }

    private f7_private() {
        return new C5_private();
    }

    public f8_public() {
        return new C5_private(); //error
    }

    private f9_private(): C6_public {
        return new C6_public();
    }

    public f10_public(): C6_public {
        return new C6_public();
    }

    private f11_private(): C5_private {
        return new C5_private();
    }

    public f12_public(): C5_private { //error
        return new C5_private(); //error
    }
}

class C8_private {
    constructor (c8_c1: C5_private);
    constructor (c8_c2: C6_public);
    constructor (c8_c1_2: any) {
    }
        
    private f1_private(c8_f1_arg: C6_public) {
    }

    public f2_public(c8_f2_arg: C6_public) {
    }

    private f3_private(c8_f3_arg: C5_private) {
    }

    public f4_public(c8_f4_arg: C5_private) {
    }

    private f5_private() {
        return new C6_public();
    }

    public f6_public() {
        return new C6_public();
    }

    private f7_private() {
        return new C5_private();
    }

    public f8_public() {
        return new C5_private();
    }

    private f9_private(): C6_public {
        return new C6_public();
    }

    public f10_public(): C6_public {
        return new C6_public();
    }

    private f11_private(): C5_private {
        return new C5_private();
    }

    public f12_public(): C5_private {
        return new C5_private();
    }
}


export class C9_public {
    constructor (c9_c: C6_public) {
    }
}
    
class C10_private {
    constructor (c10_c: C6_public) {
    }
}
export class C11_public {
    constructor (c11_c: C5_private) { // error
    }
}
    
class C12_private {
    constructor (c12_c: C5_private) {
    }
}

function f1_private(f1_arg: C5_private) {
}

export function f2_public(f2_arg: C5_private) { // error
}

function f3_private(f3_arg: C6_public) {
}

export function f4_public(f4_arg: C6_public) {
}

function f5_private() {
    return new C6_public();
}

export function f6_public() {
    return new C6_public();
}

function f7_private() {
    return new C5_private();
}

export function f8_public() {
    return new C5_private(); //error
}

function f9_private(): C6_public {
    return new C6_public();
}

export function f10_public(): C6_public {
    return new C6_public();
}

function f11_private(): C5_private {
    return new C5_private();
}

export function f12_public(): C5_private { //error 
    return new C5_private(); //error
}


//// [privacyGloFunc.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.f12_public = exports.f10_public = exports.f8_public = exports.f6_public = exports.f4_public = exports.f2_public = exports.C11_public = exports.C9_public = exports.C7_public = exports.C6_public = exports.m1 = void 0;
    var m1;
    (function (m1) {
        var C1_public = /** @class */ (function () {
            function C1_public() {
            }
            C1_public.prototype.f1 = function () {
            };
            return C1_public;
        }());
        m1.C1_public = C1_public;
        var C2_private = /** @class */ (function () {
            function C2_private() {
            }
            return C2_private;
        }());
        var C3_public = /** @class */ (function () {
            function C3_public(m1_c3_c1_2) {
            }
            C3_public.prototype.f1_private = function (m1_c3_f1_arg) {
            };
            C3_public.prototype.f2_public = function (m1_c3_f2_arg) {
            };
            C3_public.prototype.f3_private = function (m1_c3_f3_arg) {
            };
            C3_public.prototype.f4_public = function (m1_c3_f4_arg) {
            };
            C3_public.prototype.f5_private = function () {
                return new C1_public();
            };
            C3_public.prototype.f6_public = function () {
                return new C1_public();
            };
            C3_public.prototype.f7_private = function () {
                return new C2_private();
            };
            C3_public.prototype.f8_public = function () {
                return new C2_private(); // error
            };
            C3_public.prototype.f9_private = function () {
                return new C1_public();
            };
            C3_public.prototype.f10_public = function () {
                return new C1_public();
            };
            C3_public.prototype.f11_private = function () {
                return new C2_private();
            };
            C3_public.prototype.f12_public = function () {
                return new C2_private(); //error
            };
            return C3_public;
        }());
        m1.C3_public = C3_public;
        var C4_private = /** @class */ (function () {
            function C4_private(m1_c4_c1_2) {
            }
            C4_private.prototype.f1_private = function (m1_c4_f1_arg) {
            };
            C4_private.prototype.f2_public = function (m1_c4_f2_arg) {
            };
            C4_private.prototype.f3_private = function (m1_c4_f3_arg) {
            };
            C4_private.prototype.f4_public = function (m1_c4_f4_arg) {
            };
            C4_private.prototype.f5_private = function () {
                return new C1_public();
            };
            C4_private.prototype.f6_public = function () {
                return new C1_public();
            };
            C4_private.prototype.f7_private = function () {
                return new C2_private();
            };
            C4_private.prototype.f8_public = function () {
                return new C2_private();
            };
            C4_private.prototype.f9_private = function () {
                return new C1_public();
            };
            C4_private.prototype.f10_public = function () {
                return new C1_public();
            };
            C4_private.prototype.f11_private = function () {
                return new C2_private();
            };
            C4_private.prototype.f12_public = function () {
                return new C2_private();
            };
            return C4_private;
        }());
        var C5_public = /** @class */ (function () {
            function C5_public(m1_c5_c) {
            }
            return C5_public;
        }());
        m1.C5_public = C5_public;
        var C6_private = /** @class */ (function () {
            function C6_private(m1_c6_c) {
            }
            return C6_private;
        }());
        var C7_public = /** @class */ (function () {
            function C7_public(m1_c7_c) {
            }
            return C7_public;
        }());
        m1.C7_public = C7_public;
        var C8_private = /** @class */ (function () {
            function C8_private(m1_c8_c) {
            }
            return C8_private;
        }());
        function f1_public(m1_f1_arg) {
        }
        function f2_public(m1_f2_arg) {
        }
        m1.f2_public = f2_public;
        function f3_public(m1_f3_arg) {
        }
        function f4_public(m1_f4_arg) {
        }
        m1.f4_public = f4_public;
        function f5_public() {
            return new C1_public();
        }
        function f6_public() {
            return new C1_public();
        }
        m1.f6_public = f6_public;
        function f7_public() {
            return new C2_private();
        }
        function f8_public() {
            return new C2_private(); // error
        }
        m1.f8_public = f8_public;
        function f9_private() {
            return new C1_public();
        }
        function f10_public() {
            return new C1_public();
        }
        m1.f10_public = f10_public;
        function f11_private() {
            return new C2_private();
        }
        function f12_public() {
            return new C2_private(); //error
        }
        m1.f12_public = f12_public;
    })(m1 = exports.m1 || (exports.m1 = {}));
    var m2;
    (function (m2) {
        var m2_C1_public = /** @class */ (function () {
            function m2_C1_public() {
            }
            m2_C1_public.prototype.f = function () {
            };
            return m2_C1_public;
        }());
        m2.m2_C1_public = m2_C1_public;
        var m2_C2_private = /** @class */ (function () {
            function m2_C2_private() {
            }
            return m2_C2_private;
        }());
        var m2_C3_public = /** @class */ (function () {
            function m2_C3_public(m2_c3_c1_2) {
            }
            m2_C3_public.prototype.f1_private = function (m2_c3_f1_arg) {
            };
            m2_C3_public.prototype.f2_public = function (m2_c3_f2_arg) {
            };
            m2_C3_public.prototype.f3_private = function (m2_c3_f3_arg) {
            };
            m2_C3_public.prototype.f4_public = function (m2_c3_f4_arg) {
            };
            m2_C3_public.prototype.f5_private = function () {
                return new m2_C1_public();
            };
            m2_C3_public.prototype.f6_public = function () {
                return new m2_C1_public();
            };
            m2_C3_public.prototype.f7_private = function () {
                return new m2_C2_private();
            };
            m2_C3_public.prototype.f8_public = function () {
                return new m2_C2_private();
            };
            m2_C3_public.prototype.f9_private = function () {
                return new m2_C1_public();
            };
            m2_C3_public.prototype.f10_public = function () {
                return new m2_C1_public();
            };
            m2_C3_public.prototype.f11_private = function () {
                return new m2_C2_private();
            };
            m2_C3_public.prototype.f12_public = function () {
                return new m2_C2_private();
            };
            return m2_C3_public;
        }());
        m2.m2_C3_public = m2_C3_public;
        var m2_C4_private = /** @class */ (function () {
            function m2_C4_private(m2_c4_c1_2) {
            }
            m2_C4_private.prototype.f1_private = function (m2_c4_f1_arg) {
            };
            m2_C4_private.prototype.f2_public = function (m2_c4_f2_arg) {
            };
            m2_C4_private.prototype.f3_private = function (m2_c4_f3_arg) {
            };
            m2_C4_private.prototype.f4_public = function (m2_c4_f4_arg) {
            };
            m2_C4_private.prototype.f5_private = function () {
                return new m2_C1_public();
            };
            m2_C4_private.prototype.f6_public = function () {
                return new m2_C1_public();
            };
            m2_C4_private.prototype.f7_private = function () {
                return new m2_C2_private();
            };
            m2_C4_private.prototype.f8_public = function () {
                return new m2_C2_private();
            };
            m2_C4_private.prototype.f9_private = function () {
                return new m2_C1_public();
            };
            m2_C4_private.prototype.f10_public = function () {
                return new m2_C1_public();
            };
            m2_C4_private.prototype.f11_private = function () {
                return new m2_C2_private();
            };
            m2_C4_private.prototype.f12_public = function () {
                return new m2_C2_private();
            };
            return m2_C4_private;
        }());
        var m2_C5_public = /** @class */ (function () {
            function m2_C5_public(m2_c5_c) {
            }
            return m2_C5_public;
        }());
        m2.m2_C5_public = m2_C5_public;
        var m2_C6_private = /** @class */ (function () {
            function m2_C6_private(m2_c6_c) {
            }
            return m2_C6_private;
        }());
        var m2_C7_public = /** @class */ (function () {
            function m2_C7_public(m2_c7_c) {
            }
            return m2_C7_public;
        }());
        m2.m2_C7_public = m2_C7_public;
        var m2_C8_private = /** @class */ (function () {
            function m2_C8_private(m2_c8_c) {
            }
            return m2_C8_private;
        }());
        function f1_public(m2_f1_arg) {
        }
        function f2_public(m2_f2_arg) {
        }
        m2.f2_public = f2_public;
        function f3_public(m2_f3_arg) {
        }
        function f4_public(m2_f4_arg) {
        }
        m2.f4_public = f4_public;
        function f5_public() {
            return new m2_C1_public();
        }
        function f6_public() {
            return new m2_C1_public();
        }
        m2.f6_public = f6_public;
        function f7_public() {
            return new m2_C2_private();
        }
        function f8_public() {
            return new m2_C2_private();
        }
        m2.f8_public = f8_public;
        function f9_private() {
            return new m2_C1_public();
        }
        function f10_public() {
            return new m2_C1_public();
        }
        m2.f10_public = f10_public;
        function f11_private() {
            return new m2_C2_private();
        }
        function f12_public() {
            return new m2_C2_private();
        }
        m2.f12_public = f12_public;
    })(m2 || (m2 = {}));
    var C5_private = /** @class */ (function () {
        function C5_private() {
        }
        C5_private.prototype.f = function () {
        };
        return C5_private;
    }());
    var C6_public = /** @class */ (function () {
        function C6_public() {
        }
        return C6_public;
    }());
    exports.C6_public = C6_public;
    var C7_public = /** @class */ (function () {
        function C7_public(c7_c1_2) {
        }
        C7_public.prototype.f1_private = function (c7_f1_arg) {
        };
        C7_public.prototype.f2_public = function (c7_f2_arg) {
        };
        C7_public.prototype.f3_private = function (c7_f3_arg) {
        };
        C7_public.prototype.f4_public = function (c7_f4_arg) {
        };
        C7_public.prototype.f5_private = function () {
            return new C6_public();
        };
        C7_public.prototype.f6_public = function () {
            return new C6_public();
        };
        C7_public.prototype.f7_private = function () {
            return new C5_private();
        };
        C7_public.prototype.f8_public = function () {
            return new C5_private(); //error
        };
        C7_public.prototype.f9_private = function () {
            return new C6_public();
        };
        C7_public.prototype.f10_public = function () {
            return new C6_public();
        };
        C7_public.prototype.f11_private = function () {
            return new C5_private();
        };
        C7_public.prototype.f12_public = function () {
            return new C5_private(); //error
        };
        return C7_public;
    }());
    exports.C7_public = C7_public;
    var C8_private = /** @class */ (function () {
        function C8_private(c8_c1_2) {
        }
        C8_private.prototype.f1_private = function (c8_f1_arg) {
        };
        C8_private.prototype.f2_public = function (c8_f2_arg) {
        };
        C8_private.prototype.f3_private = function (c8_f3_arg) {
        };
        C8_private.prototype.f4_public = function (c8_f4_arg) {
        };
        C8_private.prototype.f5_private = function () {
            return new C6_public();
        };
        C8_private.prototype.f6_public = function () {
            return new C6_public();
        };
        C8_private.prototype.f7_private = function () {
            return new C5_private();
        };
        C8_private.prototype.f8_public = function () {
            return new C5_private();
        };
        C8_private.prototype.f9_private = function () {
            return new C6_public();
        };
        C8_private.prototype.f10_public = function () {
            return new C6_public();
        };
        C8_private.prototype.f11_private = function () {
            return new C5_private();
        };
        C8_private.prototype.f12_public = function () {
            return new C5_private();
        };
        return C8_private;
    }());
    var C9_public = /** @class */ (function () {
        function C9_public(c9_c) {
        }
        return C9_public;
    }());
    exports.C9_public = C9_public;
    var C10_private = /** @class */ (function () {
        function C10_private(c10_c) {
        }
        return C10_private;
    }());
    var C11_public = /** @class */ (function () {
        function C11_public(c11_c) {
        }
        return C11_public;
    }());
    exports.C11_public = C11_public;
    var C12_private = /** @class */ (function () {
        function C12_private(c12_c) {
        }
        return C12_private;
    }());
    function f1_private(f1_arg) {
    }
    function f2_public(f2_arg) {
    }
    exports.f2_public = f2_public;
    function f3_private(f3_arg) {
    }
    function f4_public(f4_arg) {
    }
    exports.f4_public = f4_public;
    function f5_private() {
        return new C6_public();
    }
    function f6_public() {
        return new C6_public();
    }
    exports.f6_public = f6_public;
    function f7_private() {
        return new C5_private();
    }
    function f8_public() {
        return new C5_private(); //error
    }
    exports.f8_public = f8_public;
    function f9_private() {
        return new C6_public();
    }
    function f10_public() {
        return new C6_public();
    }
    exports.f10_public = f10_public;
    function f11_private() {
        return new C5_private();
    }
    function f12_public() {
        return new C5_private(); //error
    }
    exports.f12_public = f12_public;
});
