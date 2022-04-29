// ==ORIGINAL==
class C {
    a = 1;
    b = 2;
    M1() { }
    M2() { }
    M3() {
        let x = /*[#|*/1/*|]*/;
    }
}
// ==SCOPE::Extract to constant in enclosing scope==
class C {
    a = 1;
    b = 2;
    M1() { }
    M2() { }
    M3() {
        const newLocal = 1;
        let x = /*RENAME*/newLocal;
    }
}
// ==SCOPE::Extract to readonly field in class 'C'==
class C {
    a = 1;
    b = 2;
    private readonly newProperty = 1;

    M1() { }
    M2() { }
    M3() {
        let x = this./*RENAME*/newProperty;
    }
}
// ==SCOPE::Extract to constant in global scope==
const newLocal = 1;
class C {
    a = 1;
    b = 2;
    M1() { }
    M2() { }
    M3() {
        let x = /*RENAME*/newLocal;
    }
}