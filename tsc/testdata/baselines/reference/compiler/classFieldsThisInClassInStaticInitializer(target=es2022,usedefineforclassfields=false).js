//// [tests/cases/compiler/classFieldsThisInClassInStaticInitializer.ts] ////

//// [classFieldsThisInClassInStaticInitializer.ts]
// `this` in an instance field initializer of a class defined in a static initializer is the instance of that
// class, also when the class is emitted through a temp and its constructor is synthesized.

class C {
    static f = 1;
    static x = class { static s = 1; f = 10; a = this.f + 3; };
    static y = class { #p = 1; f = 20; a = this.f + 3; };
    static z = class { static s = 1; f = 30; a = this.f + 3; constructor() {} };
}


//// [classFieldsThisInClassInStaticInitializer.js]
"use strict";
// `this` in an instance field initializer of a class defined in a static initializer is the instance of that
// class, also when the class is emitted through a temp and its constructor is synthesized.
class C {
    static { this.f = 1; }
    static { this.x = class {
        constructor() {
            this.f = 10;
            this.a = this.f + 3;
        }
        static { this.s = 1; }
    }; }
    static { this.y = class {
        constructor() {
            this.#p = 1;
            this.f = 20;
            this.a = this.f + 3;
        }
        #p;
    }; }
    static { this.z = class {
        static { this.s = 1; }
        constructor() {
            this.f = 30;
            this.a = this.f + 3;
        }
    }; }
}
