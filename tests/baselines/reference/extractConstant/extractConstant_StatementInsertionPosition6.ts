// ==ORIGINAL==

class C {
    x = /*[#|*/2 + 1/*|]*/;
}
        
// ==SCOPE::Extract to readonly field in class 'C'==

class C {
    private readonly newProperty = 2 + 1;

    x = this./*RENAME*/newProperty;
}
        
// ==SCOPE::Extract to constant in global scope==
const newLocal = 2 + 1;
class C {
    x = /*RENAME*/newLocal;
}
        