//// [tests/cases/compiler/privacyGloGetter.ts] ////

//// [privacyGloGetter.ts]
module m1 {
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

class C6_public {
}

class C7_public {
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
}

//// [privacyGloGetter.js]
var m1;
(function (m1) {
    class C1_public {
        f1() {
        }
    }
    m1.C1_public = C1_public;
    class C2_private {
    }
    class C3_public {
        get p1_private() {
            return new C1_public();
        }
        set p1_private(m1_c3_p1_arg) {
        }
        get p2_private() {
            return new C1_public();
        }
        set p2_private(m1_c3_p2_arg) {
        }
        get p3_private() {
            return new C2_private();
        }
        set p3_private(m1_c3_p3_arg) {
        }
        get p4_public() {
            return new C2_private();
        }
        set p4_public(m1_c3_p4_arg) {
        }
    }
    m1.C3_public = C3_public;
    class C4_private {
        get p1_private() {
            return new C1_public();
        }
        set p1_private(m1_c3_p1_arg) {
        }
        get p2_private() {
            return new C1_public();
        }
        set p2_private(m1_c3_p2_arg) {
        }
        get p3_private() {
            return new C2_private();
        }
        set p3_private(m1_c3_p3_arg) {
        }
        get p4_public() {
            return new C2_private();
        }
        set p4_public(m1_c3_p4_arg) {
        }
    }
})(m1 || (m1 = {}));
class C6_public {
}
class C7_public {
    get p1_private() {
        return new C6_public();
    }
    set p1_private(m1_c3_p1_arg) {
    }
    get p2_private() {
        return new C6_public();
    }
    set p2_private(m1_c3_p2_arg) {
    }
}
