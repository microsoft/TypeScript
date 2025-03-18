//// [tests/cases/compiler/returnInConstructor1.ts] ////

//// [returnInConstructor1.ts]
class A {
    foo() { }
    constructor() {
        return;
    }
}

class B {
    foo() { }
    constructor() {
        return 1; // error
    }
}

class C {
    foo() { }
    constructor() {
        return this;
    }
}

class D {
    foo() { }
    constructor() {
        return "test"; // error
    }
}

class E {
    public foo: number;
    constructor() {
        return { foo: 1 };
    }
}

class F {
    public foo: string;
    constructor() {
        return { foo: 1 }; //error
    }
}

class G {
    private test: number;
    public test1() { }
    foo() { }
    constructor() {
        this.test = 2;
    }
}

class H extends F {
    constructor() {
        super();
        return new G(); //error
    }
}

class I extends G {
    constructor() {
        super();
        return new G();
    }
}



//// [returnInConstructor1.js]
class A {
    foo() { }
    constructor() {
        return;
    }
}
class B {
    foo() { }
    constructor() {
        return 1;
    }
}
class C {
    foo() { }
    constructor() {
        return this;
    }
}
class D {
    foo() { }
    constructor() {
        return "test";
    }
}
class E {
    foo;
    constructor() {
        return { foo: 1 };
    }
}
class F {
    foo;
    constructor() {
        return { foo: 1 };
    }
}
class G {
    test;
    test1() { }
    foo() { }
    constructor() {
        this.test = 2;
    }
}
class H extends F {
    constructor() {
        super();
        return new G();
    }
}
class I extends G {
    constructor() {
        super();
        return new G();
    }
}
