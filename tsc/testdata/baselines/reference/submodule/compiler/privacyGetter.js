//// [tests/cases/compiler/privacyGetter.ts] ////

//// [privacyGetter.ts]
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

//// [privacyGetter.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.C7_public = exports.C6_public = exports.m1 = void 0;
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
            return new C2_private(); //error
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
})(m1 || (exports.m1 = m1 = {}));
var m2;
(function (m2) {
    class m2_C1_public {
        f1() {
        }
    }
    m2.m2_C1_public = m2_C1_public;
    class m2_C2_private {
    }
    class m2_C3_public {
        get p1_private() {
            return new m2_C1_public();
        }
        set p1_private(m2_c3_p1_arg) {
        }
        get p2_private() {
            return new m2_C1_public();
        }
        set p2_private(m2_c3_p2_arg) {
        }
        get p3_private() {
            return new m2_C2_private();
        }
        set p3_private(m2_c3_p3_arg) {
        }
        get p4_public() {
            return new m2_C2_private();
        }
        set p4_public(m2_c3_p4_arg) {
        }
    }
    m2.m2_C3_public = m2_C3_public;
    class m2_C4_private {
        get p1_private() {
            return new m2_C1_public();
        }
        set p1_private(m2_c3_p1_arg) {
        }
        get p2_private() {
            return new m2_C1_public();
        }
        set p2_private(m2_c3_p2_arg) {
        }
        get p3_private() {
            return new m2_C2_private();
        }
        set p3_private(m2_c3_p3_arg) {
        }
        get p4_public() {
            return new m2_C2_private();
        }
        set p4_public(m2_c3_p4_arg) {
        }
    }
})(m2 || (m2 = {}));
class C5_private {
    f() {
    }
}
class C6_public {
}
exports.C6_public = C6_public;
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
    get p3_private() {
        return new C5_private();
    }
    set p3_private(m1_c3_p3_arg) {
    }
    get p4_public() {
        return new C5_private(); //error
    }
    set p4_public(m1_c3_p4_arg) {
    }
}
exports.C7_public = C7_public;
class C8_private {
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
    get p3_private() {
        return new C5_private();
    }
    set p3_private(m1_c3_p3_arg) {
    }
    get p4_public() {
        return new C5_private();
    }
    set p4_public(m1_c3_p4_arg) {
    }
}
