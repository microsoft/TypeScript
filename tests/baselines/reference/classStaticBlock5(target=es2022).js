//// [classStaticBlock5.ts]
class B {
    static a = 1;
    static b = 2;
}

class C extends B {
    static b = 3;
    static c = super.a

    static {
        this.b;
        super.b;
        super.a;
    }
}


//// [classStaticBlock5.js]
class B {
    static a = 1;
    static b = 2;
}
class C extends B {
    static b = 3;
    static c = super.a;
    static {
        this.b;
        super.b;
        super.a;
    }
}
