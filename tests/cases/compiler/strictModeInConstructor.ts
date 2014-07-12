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
        var x = 1; // Error
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