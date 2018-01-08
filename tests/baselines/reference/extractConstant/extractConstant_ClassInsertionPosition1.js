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