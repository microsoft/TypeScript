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
export class c {
    constructor() {
        this.x = 10;
        this.y = 30;
    }
    method1() {
    }
    method2() {
    }
    static method3() {
    }
    static method4() {
    }
}
(function () {
    c.k = 20;
    c.l = 30;
}).call(c);
class c2 {
    constructor() {
        this.x = 10;
        this.y = 30;
    }
    method1() {
    }
    method2() {
    }
    static method3() {
    }
    static method4() {
    }
}
(function () {
    c2.k = 20;
    c2.l = 30;
}).call(c2);
new c();
new c2();
export var m1;
(function (m1) {
    class c3 {
        constructor() {
            this.x = 10;
            this.y = 30;
        }
        method1() {
        }
        method2() {
        }
        static method3() {
        }
        static method4() {
        }
    }
    (function () {
        c3.k = 20;
        c3.l = 30;
    }).call(c3);
    m1.c3 = c3;
    class c4 {
        constructor() {
            this.x = 10;
            this.y = 30;
        }
        method1() {
        }
        method2() {
        }
        static method3() {
        }
        static method4() {
        }
    }
    (function () {
        c4.k = 20;
        c4.l = 30;
    }).call(c4);
    new c();
    new c2();
    new c3();
    new c4();
})(m1 || (m1 = {}));
var m2;
(function (m2) {
    class c3 {
        constructor() {
            this.x = 10;
            this.y = 30;
        }
        method1() {
        }
        method2() {
        }
        static method3() {
        }
        static method4() {
        }
    }
    (function () {
        c3.k = 20;
        c3.l = 30;
    }).call(c3);
    m2.c3 = c3;
    class c4 {
        constructor() {
            this.x = 10;
            this.y = 30;
        }
        method1() {
        }
        method2() {
        }
        static method3() {
        }
        static method4() {
        }
    }
    (function () {
        c4.k = 20;
        c4.l = 30;
    }).call(c4);
    new c();
    new c2();
    new c3();
    new c4();
    new m1.c3();
})(m2 || (m2 = {}));
