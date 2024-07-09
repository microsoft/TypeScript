// @target: ES5
//@module: amd
export module m1 {
    export class C1_public {
        private f1() {
        }
    }

    class C2_private {
    }

    export class C3_public {
        private get p1_private() {
            return new C1_public();
        }

        private set p1_private(m1_c3_p1_arg: C1_public) {
        }

        private get p2_private() {
            return new C1_public();
        }

        private set p2_private(m1_c3_p2_arg: C1_public) {
        }

        private get p3_private() {
            return new C2_private();
        }

        private set p3_private(m1_c3_p3_arg: C2_private) {
        }

        public get p4_public(): C2_private { // error
            return new C2_private(); //error
        }

        public set p4_public(m1_c3_p4_arg: C2_private) { // error
        }
    }

    class C4_private {
        private get p1_private() {
            return new C1_public();
        }

        private set p1_private(m1_c3_p1_arg: C1_public) {
        }

        private get p2_private() {
            return new C1_public();
        }

        private set p2_private(m1_c3_p2_arg: C1_public) {
        }

        private get p3_private() {
            return new C2_private();
        }

        private set p3_private(m1_c3_p3_arg: C2_private) {
        }

        public get p4_public(): C2_private {
            return new C2_private();
        }

        public set p4_public(m1_c3_p4_arg: C2_private) {
        }
    }
}

module m2 {
    export class m2_C1_public {
        private f1() {
        }
    }

    class m2_C2_private {
    }

    export class m2_C3_public {
        private get p1_private() {
            return new m2_C1_public();
        }

        private set p1_private(m2_c3_p1_arg: m2_C1_public) {
        }

        private get p2_private() {
            return new m2_C1_public();
        }

        private set p2_private(m2_c3_p2_arg: m2_C1_public) {
        }

        private get p3_private() {
            return new m2_C2_private();
        }

        private set p3_private(m2_c3_p3_arg: m2_C2_private) {
        }

        public get p4_public(): m2_C2_private {
            return new m2_C2_private();
        }

        public set p4_public(m2_c3_p4_arg: m2_C2_private) {
        }
    }

    class m2_C4_private {
        private get p1_private() {
            return new m2_C1_public();
        }

        private set p1_private(m2_c3_p1_arg: m2_C1_public) {
        }

        private get p2_private() {
            return new m2_C1_public();
        }

        private set p2_private(m2_c3_p2_arg: m2_C1_public) {
        }

        private get p3_private() {
            return new m2_C2_private();
        }

        private set p3_private(m2_c3_p3_arg: m2_C2_private) {
        }

        public get p4_public(): m2_C2_private {
            return new m2_C2_private();
        }

        public set p4_public(m2_c3_p4_arg: m2_C2_private) {
        }
    }
}

class C5_private {
    private f() {
    }
}

export class C6_public {
}

export class C7_public {
    private get p1_private() {
        return new C6_public();
    }

    private set p1_private(m1_c3_p1_arg: C6_public) {
    }

    private get p2_private() {
        return new C6_public();
    }

    private set p2_private(m1_c3_p2_arg: C6_public) {
    }

    private get p3_private() {
        return new C5_private();
    }

    private set p3_private(m1_c3_p3_arg: C5_private) {
    }

    public get p4_public(): C5_private { // error
        return new C5_private(); //error
    }

    public set p4_public(m1_c3_p4_arg: C5_private) { // error
    }
}

class C8_private {
    private get p1_private() {
        return new C6_public();
    }

    private set p1_private(m1_c3_p1_arg: C6_public) {
    }

    private get p2_private() {
        return new C6_public();
    }

    private set p2_private(m1_c3_p2_arg: C6_public) {
    }

    private get p3_private() {
        return new C5_private();
    }

    private set p3_private(m1_c3_p3_arg: C5_private) {
    }

    public get p4_public(): C5_private {
        return new C5_private();
    }

    public set p4_public(m1_c3_p4_arg: C5_private) {
    }
}