class C {
    public foo() { }
    public get x() {
        return 1;
    }

    public bar() { }
}

class D extends C {
    public foo() {
        super.bar();
        super.x;  // error
    }    

    constructor() {
        super();
        super.bar();
        super.x;  // error
    }

    public get y() {
        super.bar();
        super.x; // error
        return 1;
    }
}