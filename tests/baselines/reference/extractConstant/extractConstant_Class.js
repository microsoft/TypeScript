// ==ORIGINAL==
class C {
    x = /*[#|*/1/*|]*/;
}
// ==SCOPE::Extract to constant in global scope==
const newLocal = 1;
class C {
    x = /*RENAME*/newLocal;
}