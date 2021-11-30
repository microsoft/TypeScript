// @target: esnext

class C {
    static s1 = 1;

    static {
        this.s1;
        C.s1;

        this.s2;
        C.s2;
    }

    static s2 = 2;
    static ss2 = this.s1;
}
