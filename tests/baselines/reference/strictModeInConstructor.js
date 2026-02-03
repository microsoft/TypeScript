//// [tests/cases/compiler/strictModeInConstructor.ts] ////

//// [strictModeInConstructor.ts]
class A {
}

 

class B extends A {
    public s: number = 9;

    constructor () {
        "use strict";   // No error
        super();
    }
}

class C extends A {
    public s: number = 9;

    constructor () {
        super();            // No error
        "use strict";
    }
}

class D extends A {
    public s: number = 9;

    constructor () {
        var x = 1; // No error
        var y = this.s; // Error
        super();
        "use strict";
    }
}

class Bs extends A {
    public static s: number = 9;

    constructor () {
        "use strict";   // No error
        super();
    }
}

class Cs extends A {
    public static s: number = 9;

    constructor () {
        super();            // No error
        "use strict";
    }
}

class Ds extends A {
    public static s: number = 9;

    constructor () {
        var x = 1; // no Error
        super();
        "use strict";
    }
}

//// [strictModeInConstructor.js]
class A {
}
class B extends A {
    constructor() {
        "use strict"; // No error
        super();
        this.s = 9;
    }
}
class C extends A {
    constructor() {
        super(); // No error
        this.s = 9;
        "use strict";
    }
}
class D extends A {
    constructor() {
        var x = 1; // No error
        var y = this.s; // Error
        super();
        this.s = 9;
        "use strict";
    }
}
let Bs = (() => {
    class Bs extends A {
        constructor() {
            "use strict"; // No error
            super();
        }
    }
    Bs.s = 9;
    return Bs;
})();
let Cs = (() => {
    class Cs extends A {
        constructor() {
            super(); // No error
            "use strict";
        }
    }
    Cs.s = 9;
    return Cs;
})();
let Ds = (() => {
    class Ds extends A {
        constructor() {
            var x = 1; // no Error
            super();
            "use strict";
        }
    }
    Ds.s = 9;
    return Ds;
})();
