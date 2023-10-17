// ==ORIGINAL==
class C {
    M1() { }
    a = 1;
    b = 2;
    M2() { }
    M3() {
        let x = /*[#|*/3/*|]*/;
    }
}
// ==SCOPE::Extract to constant in enclosing scope==
class C {
    M1() { }
    a = 1;
    b = 2;
    M2() { }
    M3() {
        const newLocal = 3;
        let x = /*RENAME*/newLocal;
    }
}
// ==SCOPE::Extract to constant in global scope==
const newLocal = 3;
class C {
    M1() { }
    a = 1;
    b = 2;
    M2() { }
    M3() {
        let x = /*RENAME*/newLocal;
    }
}