// ==ORIGINAL==

class C {
    constructor() {
        /*[#|*/this.m2()/*|]*/;
    }
    m2() { return 1; }
}
// ==SCOPE::Extract to constant in enclosing scope==

class C {
    constructor() {
        const /*RENAME*/newLocal = this.m2();
    }
    m2() { return 1; }
}