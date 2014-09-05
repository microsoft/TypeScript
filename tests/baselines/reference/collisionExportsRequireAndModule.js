//// [tests/cases/compiler/collisionExportsRequireAndModule.ts] ////

//// [collisionExportsRequireAndModule_externalmodule.ts]
export module require {
    export interface I {
    }
    export class C {
    }
}
export function foo(): require.I {
    return null;
}
export module exports {
    export interface I {
    }
    export class C {
    }
}
export function foo2(): exports.I {
    return null;
}
module m1 {
    module require {
        export interface I {
        }
        export class C {
        }
    }
    module exports {
        export interface I {
        }
        export class C {
        }
    }
}
module m2 {
    export module require {
        export interface I {
        }
        export class C {
        }
    }
    export module exports {
        export interface I {
        }
        export class C {
        }
    }
}

//// [collisionExportsRequireAndModule_globalFile.ts]
module require {
    export interface I {
    }
    export class C {
    }
}
module exports {
    export interface I {
    }
    export class C {
    }
}
module m3 {
    module require {
        export interface I {
        }
        export class C {
        }
    }
    module exports {
        export interface I {
        }
        export class C {
        }
    }
}
module m4 {
    export module require {
        export interface I {
        }
        export class C {
        }
    }
    export module exports {
        export interface I {
        }
        export class C {
        }
    }
}


//// [collisionExportsRequireAndModule_externalmodule.js]
define(["require", "exports"], function (require, exports) {
    (function (require) {
        var C = (function () {
            function C() {
            }
            return C;
        })();
        require.C = C;
    })(exports.require || (exports.require = {}));
    var require = exports.require;
    function foo() {
        return null;
    }
    exports.foo = foo;
    (function (exports) {
        var C = (function () {
            function C() {
            }
            return C;
        })();
        exports.C = C;
    })(exports.exports || (exports.exports = {}));
    var exports = exports.exports;
    function foo2() {
        return null;
    }
    exports.foo2 = foo2;
    var m1;
    (function (m1) {
        var require;
        (function (require) {
            var C = (function () {
                function C() {
                }
                return C;
            })();
            require.C = C;
        })(require || (require = {}));
        var exports;
        (function (exports) {
            var C = (function () {
                function C() {
                }
                return C;
            })();
            exports.C = C;
        })(exports || (exports = {}));
    })(m1 || (m1 = {}));
    var m2;
    (function (m2) {
        (function (require) {
            var C = (function () {
                function C() {
                }
                return C;
            })();
            require.C = C;
        })(m2.require || (m2.require = {}));
        var require = m2.require;
        (function (exports) {
            var C = (function () {
                function C() {
                }
                return C;
            })();
            exports.C = C;
        })(m2.exports || (m2.exports = {}));
        var exports = m2.exports;
    })(m2 || (m2 = {}));
});
//// [collisionExportsRequireAndModule_globalFile.js]
var require;
(function (require) {
    var C = (function () {
        function C() {
        }
        return C;
    })();
    require.C = C;
})(require || (require = {}));
var exports;
(function (exports) {
    var C = (function () {
        function C() {
        }
        return C;
    })();
    exports.C = C;
})(exports || (exports = {}));
var m3;
(function (m3) {
    var require;
    (function (require) {
        var C = (function () {
            function C() {
            }
            return C;
        })();
        require.C = C;
    })(require || (require = {}));
    var exports;
    (function (exports) {
        var C = (function () {
            function C() {
            }
            return C;
        })();
        exports.C = C;
    })(exports || (exports = {}));
})(m3 || (m3 = {}));
var m4;
(function (m4) {
    (function (require) {
        var C = (function () {
            function C() {
            }
            return C;
        })();
        require.C = C;
    })(m4.require || (m4.require = {}));
    var require = m4.require;
    (function (exports) {
        var C = (function () {
            function C() {
            }
            return C;
        })();
        exports.C = C;
    })(m4.exports || (m4.exports = {}));
    var exports = m4.exports;
})(m4 || (m4 = {}));
