//// [privacyGetter.ts]
export module m1 {
    export class C1_public {
        private f1() {
        }
    }

    class C2_private {
    }

    export class C3_public {
        private get p1_private() {
            return new C1_public();
        }

        private set p1_private(m1_c3_p1_arg: C1_public) {
        }

        private get p2_private() {
            return new C1_public();
        }

        private set p2_private(m1_c3_p2_arg: C1_public) {
        }

        private get p3_private() {
            return new C2_private();
        }

        private set p3_private(m1_c3_p3_arg: C2_private) {
        }

        public get p4_public(): C2_private { // error
            return new C2_private(); //error
        }

        public set p4_public(m1_c3_p4_arg: C2_private) { // error
        }
    }

    class C4_private {
        private get p1_private() {
            return new C1_public();
        }

        private set p1_private(m1_c3_p1_arg: C1_public) {
        }

        private get p2_private() {
            return new C1_public();
        }

        private set p2_private(m1_c3_p2_arg: C1_public) {
        }

        private get p3_private() {
            return new C2_private();
        }

        private set p3_private(m1_c3_p3_arg: C2_private) {
        }

        public get p4_public(): C2_private {
            return new C2_private();
        }

        public set p4_public(m1_c3_p4_arg: C2_private) {
        }
    }
}

module m2 {
    export class m2_C1_public {
        private f1() {
        }
    }

    class m2_C2_private {
    }

    export class m2_C3_public {
        private get p1_private() {
            return new m2_C1_public();
        }

        private set p1_private(m2_c3_p1_arg: m2_C1_public) {
        }

        private get p2_private() {
            return new m2_C1_public();
        }

        private set p2_private(m2_c3_p2_arg: m2_C1_public) {
        }

        private get p3_private() {
            return new m2_C2_private();
        }

        private set p3_private(m2_c3_p3_arg: m2_C2_private) {
        }

        public get p4_public(): m2_C2_private {
            return new m2_C2_private();
        }

        public set p4_public(m2_c3_p4_arg: m2_C2_private) {
        }
    }

    class m2_C4_private {
        private get p1_private() {
            return new m2_C1_public();
        }

        private set p1_private(m2_c3_p1_arg: m2_C1_public) {
        }

        private get p2_private() {
            return new m2_C1_public();
        }

        private set p2_private(m2_c3_p2_arg: m2_C1_public) {
        }

        private get p3_private() {
            return new m2_C2_private();
        }

        private set p3_private(m2_c3_p3_arg: m2_C2_private) {
        }

        public get p4_public(): m2_C2_private {
            return new m2_C2_private();
        }

        public set p4_public(m2_c3_p4_arg: m2_C2_private) {
        }
    }
}

class C5_private {
    private f() {
    }
}

export class C6_public {
}

export class C7_public {
    private get p1_private() {
        return new C6_public();
    }

    private set p1_private(m1_c3_p1_arg: C6_public) {
    }

    private get p2_private() {
        return new C6_public();
    }

    private set p2_private(m1_c3_p2_arg: C6_public) {
    }

    private get p3_private() {
        return new C5_private();
    }

    private set p3_private(m1_c3_p3_arg: C5_private) {
    }

    public get p4_public(): C5_private { // error
        return new C5_private(); //error
    }

    public set p4_public(m1_c3_p4_arg: C5_private) { // error
    }
}

class C8_private {
    private get p1_private() {
        return new C6_public();
    }

    private set p1_private(m1_c3_p1_arg: C6_public) {
    }

    private get p2_private() {
        return new C6_public();
    }

    private set p2_private(m1_c3_p2_arg: C6_public) {
    }

    private get p3_private() {
        return new C5_private();
    }

    private set p3_private(m1_c3_p3_arg: C5_private) {
    }

    public get p4_public(): C5_private {
        return new C5_private();
    }

    public set p4_public(m1_c3_p4_arg: C5_private) {
    }
}

//// [privacyGetter.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var m1;
    (function (m1) {
        var C1_public = (function () {
            function C1_public() {
            }
            var proto_1 = C1_public.prototype;
            proto_1.f1 = function () {
            };
            return C1_public;
        }());
        m1.C1_public = C1_public;
        var C2_private = (function () {
            function C2_private() {
            }
            return C2_private;
        }());
        var C3_public = (function () {
            function C3_public() {
            }
            var proto_2 = C3_public.prototype;
            Object.defineProperty(proto_2, "p1_private", {
                get: function () {
                    return new C1_public();
                },
                set: function (m1_c3_p1_arg) {
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(proto_2, "p2_private", {
                get: function () {
                    return new C1_public();
                },
                set: function (m1_c3_p2_arg) {
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(proto_2, "p3_private", {
                get: function () {
                    return new C2_private();
                },
                set: function (m1_c3_p3_arg) {
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(proto_2, "p4_public", {
                get: function () {
                    return new C2_private(); //error
                },
                set: function (m1_c3_p4_arg) {
                },
                enumerable: true,
                configurable: true
            });
            return C3_public;
        }());
        m1.C3_public = C3_public;
        var C4_private = (function () {
            function C4_private() {
            }
            var proto_3 = C4_private.prototype;
            Object.defineProperty(proto_3, "p1_private", {
                get: function () {
                    return new C1_public();
                },
                set: function (m1_c3_p1_arg) {
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(proto_3, "p2_private", {
                get: function () {
                    return new C1_public();
                },
                set: function (m1_c3_p2_arg) {
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(proto_3, "p3_private", {
                get: function () {
                    return new C2_private();
                },
                set: function (m1_c3_p3_arg) {
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(proto_3, "p4_public", {
                get: function () {
                    return new C2_private();
                },
                set: function (m1_c3_p4_arg) {
                },
                enumerable: true,
                configurable: true
            });
            return C4_private;
        }());
    })(m1 = exports.m1 || (exports.m1 = {}));
    var m2;
    (function (m2) {
        var m2_C1_public = (function () {
            function m2_C1_public() {
            }
            var proto_4 = m2_C1_public.prototype;
            proto_4.f1 = function () {
            };
            return m2_C1_public;
        }());
        m2.m2_C1_public = m2_C1_public;
        var m2_C2_private = (function () {
            function m2_C2_private() {
            }
            return m2_C2_private;
        }());
        var m2_C3_public = (function () {
            function m2_C3_public() {
            }
            var proto_5 = m2_C3_public.prototype;
            Object.defineProperty(proto_5, "p1_private", {
                get: function () {
                    return new m2_C1_public();
                },
                set: function (m2_c3_p1_arg) {
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(proto_5, "p2_private", {
                get: function () {
                    return new m2_C1_public();
                },
                set: function (m2_c3_p2_arg) {
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(proto_5, "p3_private", {
                get: function () {
                    return new m2_C2_private();
                },
                set: function (m2_c3_p3_arg) {
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(proto_5, "p4_public", {
                get: function () {
                    return new m2_C2_private();
                },
                set: function (m2_c3_p4_arg) {
                },
                enumerable: true,
                configurable: true
            });
            return m2_C3_public;
        }());
        m2.m2_C3_public = m2_C3_public;
        var m2_C4_private = (function () {
            function m2_C4_private() {
            }
            var proto_6 = m2_C4_private.prototype;
            Object.defineProperty(proto_6, "p1_private", {
                get: function () {
                    return new m2_C1_public();
                },
                set: function (m2_c3_p1_arg) {
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(proto_6, "p2_private", {
                get: function () {
                    return new m2_C1_public();
                },
                set: function (m2_c3_p2_arg) {
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(proto_6, "p3_private", {
                get: function () {
                    return new m2_C2_private();
                },
                set: function (m2_c3_p3_arg) {
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(proto_6, "p4_public", {
                get: function () {
                    return new m2_C2_private();
                },
                set: function (m2_c3_p4_arg) {
                },
                enumerable: true,
                configurable: true
            });
            return m2_C4_private;
        }());
    })(m2 || (m2 = {}));
    var C5_private = (function () {
        function C5_private() {
        }
        var proto_7 = C5_private.prototype;
        proto_7.f = function () {
        };
        return C5_private;
    }());
    var C6_public = (function () {
        function C6_public() {
        }
        return C6_public;
    }());
    exports.C6_public = C6_public;
    var C7_public = (function () {
        function C7_public() {
        }
        var proto_8 = C7_public.prototype;
        Object.defineProperty(proto_8, "p1_private", {
            get: function () {
                return new C6_public();
            },
            set: function (m1_c3_p1_arg) {
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(proto_8, "p2_private", {
            get: function () {
                return new C6_public();
            },
            set: function (m1_c3_p2_arg) {
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(proto_8, "p3_private", {
            get: function () {
                return new C5_private();
            },
            set: function (m1_c3_p3_arg) {
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(proto_8, "p4_public", {
            get: function () {
                return new C5_private(); //error
            },
            set: function (m1_c3_p4_arg) {
            },
            enumerable: true,
            configurable: true
        });
        return C7_public;
    }());
    exports.C7_public = C7_public;
    var C8_private = (function () {
        function C8_private() {
        }
        var proto_9 = C8_private.prototype;
        Object.defineProperty(proto_9, "p1_private", {
            get: function () {
                return new C6_public();
            },
            set: function (m1_c3_p1_arg) {
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(proto_9, "p2_private", {
            get: function () {
                return new C6_public();
            },
            set: function (m1_c3_p2_arg) {
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(proto_9, "p3_private", {
            get: function () {
                return new C5_private();
            },
            set: function (m1_c3_p3_arg) {
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(proto_9, "p4_public", {
            get: function () {
                return new C5_private();
            },
            set: function (m1_c3_p4_arg) {
            },
            enumerable: true,
            configurable: true
        });
        return C8_private;
    }());
});
