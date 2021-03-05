const a = 1;
const b = 2;
const c = 3;

class C {
    static {
        const a = 11;
        var b = 22

        a;
        b;
        c;
    }

    static {
        const a = 111;
        var b = 222;

        a;
        b;
        c;
    }

    static {
        const a = 1111;
        var b = 2222;

        a;
        b;
        c;
    }
}
