//// [tests/cases/compiler/es6ModuleClassDeclaration.ts] ////

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
c.k = 20;
c.l = 30;
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
c2.k = 20;
c2.l = 30;
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
    c3.k = 20;
    c3.l = 30;
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
    c4.k = 20;
    c4.l = 30;
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
    c3.k = 20;
    c3.l = 30;
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
    c4.k = 20;
    c4.l = 30;
    new c();
    new c2();
    new c3();
    new c4();
    new m1.c3();
})(m2 || (m2 = {}));
