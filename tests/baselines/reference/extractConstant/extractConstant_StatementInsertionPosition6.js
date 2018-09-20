// ==ORIGINAL==

class C {
    x = /*[#|*/2 + 1/*|]*/;
}
        
// ==SCOPE::Extract to constant in global scope==
const newLocal = 2 + 1;
class C {
    x = /*RENAME*/newLocal;
}
        