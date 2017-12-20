// ==ORIGINAL==
class C {
    M() {
        let x = /*[#|*/1/*|]*/;
    }
}
// ==SCOPE::Extract to constant in enclosing scope==
class C {
    M() {
        const newLocal = 1;
        let x = /*RENAME*/newLocal;
    }
}
// ==SCOPE::Extract to constant in global scope==
const newLocal = 1;
class C {
    M() {
        let x = /*RENAME*/newLocal;
    }
}