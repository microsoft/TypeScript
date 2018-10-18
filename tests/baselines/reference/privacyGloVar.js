//// [privacyGloVar.ts]
module m1 {
    export class C1_public {
        private f1() {
        }
    }

    class C2_private {
    }

    export class C3_public {
        private C3_v1_private: C1_public;
        public C3_v2_public: C1_public;
        private C3_v3_private: C2_private;
        public C3_v4_public: C2_private; // error

        private C3_v11_private = new C1_public();
        public C3_v12_public = new C1_public();
        private C3_v13_private = new C2_private();
        public C3_v14_public = new C2_private(); // error

        private C3_v21_private: C1_public = new C1_public();
        public C3_v22_public: C1_public = new C1_public();
        private C3_v23_private: C2_private = new C2_private();
        public C3_v24_public: C2_private = new C2_private(); // error
    }

    class C4_public {
        private C4_v1_private: C1_public;
        public C4_v2_public: C1_public;
        private C4_v3_private: C2_private;
        public C4_v4_public: C2_private;

        private C4_v11_private = new C1_public();
        public C4_v12_public = new C1_public();
        private C4_v13_private = new C2_private();
        public C4_v14_public = new C2_private();

        private C4_v21_private: C1_public = new C1_public();
        public C4_v22_public: C1_public = new C1_public();
        private C4_v23_private: C2_private = new C2_private();
        public C4_v24_public: C2_private = new C2_private();
    }

    var m1_v1_private: C1_public;
    export var m1_v2_public: C1_public;
    var m1_v3_private: C2_private;
    export var m1_v4_public: C2_private; // error

    var m1_v11_private = new C1_public();
    export var m1_v12_public = new C1_public();
    var m1_v13_private = new C2_private();
    export var m1_v14_public = new C2_private(); //error 

    var m1_v21_private: C1_public = new C1_public();
    export var m1_v22_public: C1_public = new C1_public();
    var m1_v23_private: C2_private = new C2_private();
    export var m1_v24_public: C2_private = new C2_private(); // error
}

class glo_C1_public {
    private f1() {
    }
}

class glo_C3_public {
    private glo_C3_v1_private: glo_C1_public;
    public glo_C3_v2_public: glo_C1_public;

    private glo_C3_v11_private = new glo_C1_public();
    public glo_C3_v12_public = new glo_C1_public();

    private glo_C3_v21_private: glo_C1_public = new glo_C1_public();
    public glo_C3_v22_public: glo_C1_public = new glo_C1_public();
}


var glo_v2_public: glo_C1_public;
var glo_v12_public = new glo_C1_public();
var glo_v22_public: glo_C1_public = new glo_C1_public();


//// [privacyGloVar.js]
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
        function C3_public() {
            this.C3_v11_private = new C1_public();
            this.C3_v12_public = new C1_public();
            this.C3_v13_private = new C2_private();
            this.C3_v14_public = new C2_private(); // error
            this.C3_v21_private = new C1_public();
            this.C3_v22_public = new C1_public();
            this.C3_v23_private = new C2_private();
            this.C3_v24_public = new C2_private(); // error
        }
        return C3_public;
    }());
    m1.C3_public = C3_public;
    var C4_public = /** @class */ (function () {
        function C4_public() {
            this.C4_v11_private = new C1_public();
            this.C4_v12_public = new C1_public();
            this.C4_v13_private = new C2_private();
            this.C4_v14_public = new C2_private();
            this.C4_v21_private = new C1_public();
            this.C4_v22_public = new C1_public();
            this.C4_v23_private = new C2_private();
            this.C4_v24_public = new C2_private();
        }
        return C4_public;
    }());
    var m1_v1_private;
    var m1_v3_private;
    var m1_v11_private = new C1_public();
    m1.m1_v12_public = new C1_public();
    var m1_v13_private = new C2_private();
    m1.m1_v14_public = new C2_private(); //error 
    var m1_v21_private = new C1_public();
    m1.m1_v22_public = new C1_public();
    var m1_v23_private = new C2_private();
    m1.m1_v24_public = new C2_private(); // error
})(m1 || (m1 = {}));
var glo_C1_public = /** @class */ (function () {
    function glo_C1_public() {
    }
    glo_C1_public.prototype.f1 = function () {
    };
    return glo_C1_public;
}());
var glo_C3_public = /** @class */ (function () {
    function glo_C3_public() {
        this.glo_C3_v11_private = new glo_C1_public();
        this.glo_C3_v12_public = new glo_C1_public();
        this.glo_C3_v21_private = new glo_C1_public();
        this.glo_C3_v22_public = new glo_C1_public();
    }
    return glo_C3_public;
}());
var glo_v2_public;
var glo_v12_public = new glo_C1_public();
var glo_v22_public = new glo_C1_public();
