// ==ORIGINAL==
class C {
    x = /*[#|*/1/*|]*/;
}
// ==SCOPE::Extract to readonly field in class 'C'==
class C {
    private readonly newProperty = 1;

    x = this./*RENAME*/newProperty;
}
// ==SCOPE::Extract to constant in global scope==
const newLocal = 1;
class C {
    x = /*RENAME*/newLocal;
}