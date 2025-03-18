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
    s = 9;
    constructor() {
        "use strict";
        "use strict";
        super();
    }
}
class C extends A {
    s = 9;
    constructor() {
        super();
        "use strict";
    }
}
class D extends A {
    s = 9;
    constructor() {
        var x = 1;
        var y = this.s;
        super();
        "use strict";
    }
}
class Bs extends A {
    static s = 9;
    constructor() {
        "use strict";
        "use strict";
        super();
    }
}
class Cs extends A {
    static s = 9;
    constructor() {
        super();
        "use strict";
    }
}
class Ds extends A {
    static s = 9;
    constructor() {
        var x = 1;
        super();
        "use strict";
    }
}
