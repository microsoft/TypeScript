//// [es6ModuleClassDeclaration.ts]
export class c {
    constructor() {
    }
    private x = 10;
    public y = 30;
    static k = 20;
    private static l = 30;
    private method1() {
    }
    public method2() {
    }
    static method3() {
    }
    private static method4() {
    }
}
class c2 {
    constructor() {
    }
    private x = 10;
    public y = 30;
    static k = 20;
    private static l = 30;
    private method1() {
    }
    public method2() {
    }
    static method3() {
    }
    private static method4() {
    }
}
new c();
new c2();

export module m1 {
    export class c3 {
        constructor() {
        }
        private x = 10;
        public y = 30;
        static k = 20;
        private static l = 30;
        private method1() {
        }
        public method2() {
        }
        static method3() {
        }
        private static method4() {
        }
    }
    class c4 {
        constructor() {
        }
        private x = 10;
        public y = 30;
        static k = 20;
        private static l = 30;
        private method1() {
        }
        public method2() {
        }
        static method3() {
        }
        private static method4() {
        }
    }
    new c();
    new c2();
    new c3();
    new c4();
}
module m2 {
    export class c3 {
        constructor() {
        }
        private x = 10;
        public y = 30;
        static k = 20;
        private static l = 30;
        private method1() {
        }
        public method2() {
        }
        static method3() {
        }
        private static method4() {
        }
    }
    class c4 {
        constructor() {
        }
        private x = 10;
        public y = 30;
        static k = 20;
        private static l = 30;
        private method1() {
        }
        public method2() {
        }
        static method3() {
        }
        private static method4() {
        }
    }
    new c();
    new c2();
    new c3();
    new c4();
    new m1.c3();
}

//// [es6ModuleClassDeclaration.js]
var c = (function () {
    function c() {
        this.x = 10;
        this.y = 30;
    }
    c.prototype.method1 = function () {
    };
    c.prototype.method2 = function () {
    };
    c.method3 = function () {
    };
    c.method4 = function () {
    };
    c.k = 20;
    c.l = 30;
    return c;
})();
export { c };
var c2 = (function () {
    function c2() {
        this.x = 10;
        this.y = 30;
    }
    c2.prototype.method1 = function () {
    };
    c2.prototype.method2 = function () {
    };
    c2.method3 = function () {
    };
    c2.method4 = function () {
    };
    c2.k = 20;
    c2.l = 30;
    return c2;
})();
new c();
new c2();
var m1;
(function (m1) {
    var c3 = (function () {
        function c3() {
            this.x = 10;
            this.y = 30;
        }
        c3.prototype.method1 = function () {
        };
        c3.prototype.method2 = function () {
        };
        c3.method3 = function () {
        };
        c3.method4 = function () {
        };
        c3.k = 20;
        c3.l = 30;
        return c3;
    })();
    m1.c3 = c3;
    var c4 = (function () {
        function c4() {
            this.x = 10;
            this.y = 30;
        }
        c4.prototype.method1 = function () {
        };
        c4.prototype.method2 = function () {
        };
        c4.method3 = function () {
        };
        c4.method4 = function () {
        };
        c4.k = 20;
        c4.l = 30;
        return c4;
    })();
    new c();
    new c2();
    new c3();
    new c4();
})(m1 || (m1 = {}));
export { m1 };
var m2;
(function (m2) {
    var c3 = (function () {
        function c3() {
            this.x = 10;
            this.y = 30;
        }
        c3.prototype.method1 = function () {
        };
        c3.prototype.method2 = function () {
        };
        c3.method3 = function () {
        };
        c3.method4 = function () {
        };
        c3.k = 20;
        c3.l = 30;
        return c3;
    })();
    m2.c3 = c3;
    var c4 = (function () {
        function c4() {
            this.x = 10;
            this.y = 30;
        }
        c4.prototype.method1 = function () {
        };
        c4.prototype.method2 = function () {
        };
        c4.method3 = function () {
        };
        c4.method4 = function () {
        };
        c4.k = 20;
        c4.l = 30;
        return c4;
    })();
    new c();
    new c2();
    new c3();
    new c4();
    new m1.c3();
})(m2 || (m2 = {}));
