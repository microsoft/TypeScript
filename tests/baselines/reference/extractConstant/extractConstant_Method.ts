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
// ==SCOPE::Extract to readonly field in class 'C'==
class C {
    private readonly newProperty = 1;

    M() {
        let x = this./*RENAME*/newProperty;
    }
}
// ==SCOPE::Extract to constant in global scope==
const newLocal = 1;
class C {
    M() {
        let x = /*RENAME*/newLocal;
    }
}