//// [privacyGetter.js]
define(["require", "exports"], function(require, exports) {
    (function (m1) {
        var C1_public = (function () {
            function C1_public() {
            }
            C1_public.prototype.f1 = function () {
            };
            return C1_public;
        })();
        m1.C1_public = C1_public;

        var C2_private = (function () {
            function C2_private() {
            }
            return C2_private;
        })();

        var C3_public = (function () {
            function C3_public() {
            }
            Object.defineProperty(C3_public.prototype, "p1_private", {
                get: function () {
                    return new C1_public();
                },
                set: function (m1_c3_p1_arg) {
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(C3_public.prototype, "p2_private", {
                get: function () {
                    return new C1_public();
                },
                set: function (m1_c3_p2_arg) {
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(C3_public.prototype, "p3_private", {
                get: function () {
                    return new C2_private();
                },
                set: function (m1_c3_p3_arg) {
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(C3_public.prototype, "p4_public", {
                get: function () {
                    return new C2_private();
                },
                set: function (m1_c3_p4_arg) {
                },
                enumerable: true,
                configurable: true
            });

            return C3_public;
        })();
        m1.C3_public = C3_public;

        var C4_private = (function () {
            function C4_private() {
            }
            Object.defineProperty(C4_private.prototype, "p1_private", {
                get: function () {
                    return new C1_public();
                },
                set: function (m1_c3_p1_arg) {
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(C4_private.prototype, "p2_private", {
                get: function () {
                    return new C1_public();
                },
                set: function (m1_c3_p2_arg) {
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(C4_private.prototype, "p3_private", {
                get: function () {
                    return new C2_private();
                },
                set: function (m1_c3_p3_arg) {
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(C4_private.prototype, "p4_public", {
                get: function () {
                    return new C2_private();
                },
                set: function (m1_c3_p4_arg) {
                },
                enumerable: true,
                configurable: true
            });

            return C4_private;
        })();
    })(exports.m1 || (exports.m1 = {}));
    var m1 = exports.m1;

    var m2;
    (function (m2) {
        var m2_C1_public = (function () {
            function m2_C1_public() {
            }
            m2_C1_public.prototype.f1 = function () {
            };
            return m2_C1_public;
        })();
        m2.m2_C1_public = m2_C1_public;

        var m2_C2_private = (function () {
            function m2_C2_private() {
            }
            return m2_C2_private;
        })();

        var m2_C3_public = (function () {
            function m2_C3_public() {
            }
            Object.defineProperty(m2_C3_public.prototype, "p1_private", {
                get: function () {
                    return new m2_C1_public();
                },
                set: function (m2_c3_p1_arg) {
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(m2_C3_public.prototype, "p2_private", {
                get: function () {
                    return new m2_C1_public();
                },
                set: function (m2_c3_p2_arg) {
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(m2_C3_public.prototype, "p3_private", {
                get: function () {
                    return new m2_C2_private();
                },
                set: function (m2_c3_p3_arg) {
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(m2_C3_public.prototype, "p4_public", {
                get: function () {
                    return new m2_C2_private();
                },
                set: function (m2_c3_p4_arg) {
                },
                enumerable: true,
                configurable: true
            });

            return m2_C3_public;
        })();
        m2.m2_C3_public = m2_C3_public;

        var m2_C4_private = (function () {
            function m2_C4_private() {
            }
            Object.defineProperty(m2_C4_private.prototype, "p1_private", {
                get: function () {
                    return new m2_C1_public();
                },
                set: function (m2_c3_p1_arg) {
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(m2_C4_private.prototype, "p2_private", {
                get: function () {
                    return new m2_C1_public();
                },
                set: function (m2_c3_p2_arg) {
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(m2_C4_private.prototype, "p3_private", {
                get: function () {
                    return new m2_C2_private();
                },
                set: function (m2_c3_p3_arg) {
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(m2_C4_private.prototype, "p4_public", {
                get: function () {
                    return new m2_C2_private();
                },
                set: function (m2_c3_p4_arg) {
                },
                enumerable: true,
                configurable: true
            });

            return m2_C4_private;
        })();
    })(m2 || (m2 = {}));

    var C5_private = (function () {
        function C5_private() {
        }
        C5_private.prototype.f = function () {
        };
        return C5_private;
    })();

    var C6_public = (function () {
        function C6_public() {
        }
        return C6_public;
    })();
    exports.C6_public = C6_public;

    var C7_public = (function () {
        function C7_public() {
        }
        Object.defineProperty(C7_public.prototype, "p1_private", {
            get: function () {
                return new C6_public();
            },
            set: function (m1_c3_p1_arg) {
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(C7_public.prototype, "p2_private", {
            get: function () {
                return new C6_public();
            },
            set: function (m1_c3_p2_arg) {
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(C7_public.prototype, "p3_private", {
            get: function () {
                return new C5_private();
            },
            set: function (m1_c3_p3_arg) {
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(C7_public.prototype, "p4_public", {
            get: function () {
                return new C5_private();
            },
            set: function (m1_c3_p4_arg) {
            },
            enumerable: true,
            configurable: true
        });

        return C7_public;
    })();
    exports.C7_public = C7_public;

    var C8_private = (function () {
        function C8_private() {
        }
        Object.defineProperty(C8_private.prototype, "p1_private", {
            get: function () {
                return new C6_public();
            },
            set: function (m1_c3_p1_arg) {
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(C8_private.prototype, "p2_private", {
            get: function () {
                return new C6_public();
            },
            set: function (m1_c3_p2_arg) {
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(C8_private.prototype, "p3_private", {
            get: function () {
                return new C5_private();
            },
            set: function (m1_c3_p3_arg) {
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(C8_private.prototype, "p4_public", {
            get: function () {
                return new C5_private();
            },
            set: function (m1_c3_p4_arg) {
            },
            enumerable: true,
            configurable: true
        });

        return C8_private;
    })();
});
