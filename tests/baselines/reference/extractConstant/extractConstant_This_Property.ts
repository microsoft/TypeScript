// ==ORIGINAL==

namespace N { // Force this test to be TS-only
    class C {
        x = 1;
        y = /*[#|*/this.x/*|]*/;
    }
}
// ==SCOPE::Extract to readonly field in class 'C'==

namespace N { // Force this test to be TS-only
    class C {
        x = 1;
        private readonly newProperty = this.x;

        y = this./*RENAME*/newProperty;
    }
}