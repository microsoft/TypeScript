//// [tests/cases/conformance/classes/constructorDeclarations/superCalls/derivedClassParameterProperties.ts] ////

//// [derivedClassParameterProperties.ts]
// ordering of super calls in derived constructors matters depending on other class contents

class Base {
    x: string;
}

class Derived extends Base {
    constructor(y: string) {
        var a = 1;
        super();
    }
}

class Derived2 extends Base {
    constructor(public y: string) {
        var a = 1;
        super();
    }
}

class Derived3 extends Base {
    constructor(public y: string) {
        super();
        var a = 1;
    }
}

class Derived4 extends Base {
    a = 1;
    constructor(y: string) {
        var b = 2;
        super();
    }
}

class Derived5 extends Base {
    a = 1;
    constructor(y: string) {
        super();
        var b = 2;
    }
}

class Derived6 extends Base {
    a: number;
    constructor(y: string) {
        this.a = 1;
        var b = 2;
        super();
    }
}

class Derived7 extends Base {
    a = 1;
    b: number;
    constructor(y: string) {
        this.a = 3;
        this.b = 3;
        super();
    }
}

class Derived8 extends Base {
    a = 1;
    b: number;
    constructor(y: string) {
        super();
        this.a = 3;
        this.b = 3;        
    }
}

// generic cases of Derived7 and Derived8
class Base2<T> { x: T; }

class Derived9<T> extends Base2<T> {
    a = 1;
    b: number;
    constructor(y: string) {
        this.a = 3;
        this.b = 3;
        super();
    }
}

class Derived10<T> extends Base2<T> {
    a = 1;
    b: number;
    constructor(y: string) {
        super();
        this.a = 3;
        this.b = 3;
    }
}

//// [derivedClassParameterProperties.js]
// ordering of super calls in derived constructors matters depending on other class contents
class Base {
    x;
}
class Derived extends Base {
    constructor(y) {
        var a = 1;
        super();
    }
}
class Derived2 extends Base {
    y;
    constructor(y) {
        var a = 1;
        super();
        this.y = y;
    }
}
class Derived3 extends Base {
    y;
    constructor(y) {
        super();
        this.y = y;
        var a = 1;
    }
}
class Derived4 extends Base {
    a = 1;
    constructor(y) {
        var b = 2;
        super();
    }
}
class Derived5 extends Base {
    a = 1;
    constructor(y) {
        super();
        var b = 2;
    }
}
class Derived6 extends Base {
    a;
    constructor(y) {
        this.a = 1;
        var b = 2;
        super();
    }
}
class Derived7 extends Base {
    a = 1;
    b;
    constructor(y) {
        this.a = 3;
        this.b = 3;
        super();
    }
}
class Derived8 extends Base {
    a = 1;
    b;
    constructor(y) {
        super();
        this.a = 3;
        this.b = 3;
    }
}
// generic cases of Derived7 and Derived8
class Base2 {
    x;
}
class Derived9 extends Base2 {
    a = 1;
    b;
    constructor(y) {
        this.a = 3;
        this.b = 3;
        super();
    }
}
class Derived10 extends Base2 {
    a = 1;
    b;
    constructor(y) {
        super();
        this.a = 3;
        this.b = 3;
    }
}
