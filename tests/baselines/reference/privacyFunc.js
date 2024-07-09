//// [tests/cases/compiler/privacyFunc.ts] ////

//// [privacyFunc.ts]
module m1 {
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

class C6_public {
}

class C7_public {
    constructor (c7_c2: C6_public);
    constructor (c7_c1_2: any) {
    }
    private f1_private(c7_f1_arg: C6_public) {
    }

    public f2_public(c7_f2_arg: C6_public) {
    }

    private f5_private() {
        return new C6_public();
    }

    public f6_public() {
        return new C6_public();
    }

    private f9_private(): C6_public {
        return new C6_public();
    }

    public f10_public(): C6_public {
        return new C6_public();
    }
}

class C9_public {
    constructor (c9_c: C6_public) {
    }
}
  

function f4_public(f4_arg: C6_public) {
}



function f6_public() {
    return new C6_public();
}


function f10_public(): C6_public {
    return new C6_public();
}


//// [privacyFunc.js]
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
})(m1 || (m1 = {}));
var C6_public = /** @class */ (function () {
    function C6_public() {
    }
    return C6_public;
}());
var C7_public = /** @class */ (function () {
    function C7_public(c7_c1_2) {
    }
    C7_public.prototype.f1_private = function (c7_f1_arg) {
    };
    C7_public.prototype.f2_public = function (c7_f2_arg) {
    };
    C7_public.prototype.f5_private = function () {
        return new C6_public();
    };
    C7_public.prototype.f6_public = function () {
        return new C6_public();
    };
    C7_public.prototype.f9_private = function () {
        return new C6_public();
    };
    C7_public.prototype.f10_public = function () {
        return new C6_public();
    };
    return C7_public;
}());
var C9_public = /** @class */ (function () {
    function C9_public(c9_c) {
    }
    return C9_public;
}());
function f4_public(f4_arg) {
}
function f6_public() {
    return new C6_public();
}
function f10_public() {
    return new C6_public();
}
