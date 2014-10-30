class A extends B {
    public j = 2;

    constructor(public i = 1) {
        // Comment
        super(1, "");
        return;
    }
}

module M1.M2 {
    class A extends B {
        public j = 2;

        constructor(public i = 1) {
            // Comment
            super(1, "");
            return;
        }
    }
}