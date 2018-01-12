// ==ORIGINAL==

class C {
    m1() {
        /*[#|*/this.m2()/*|]*/;
    }
    m2() { return 1; }
}
// ==SCOPE::Extract to constant in enclosing scope==

class C {
    m1() {
        const /*RENAME*/newLocal = this.m2();
    }
    m2() { return 1; }
}
// ==SCOPE::Extract to readonly field in class 'C'==

class C {
    private readonly newProperty = this.m2();

    m1() {
        this./*RENAME*/newProperty;
    }
    m2() { return 1; }
}