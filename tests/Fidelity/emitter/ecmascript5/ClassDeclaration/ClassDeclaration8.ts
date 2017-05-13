class C {
    // C.x
    x = 1;

    // C.y
    public y;

    /* C.z */
    static z = "";
    constructor(p = 1, public q, private r = 2) {
        a = 1;
    }
}

module A.B {
    class D {
        // D.x
        x = 1;

        // D.y
        private y;

        /* D.z */
        static z = "";
        constructor(p = 1, public q, private r = 2) {
            a = 1;
        }
    }
}