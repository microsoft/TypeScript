// ==ORIGINAL==
namespace X {
    export const j = 10;
    export const y = /*[#|*/j * j/*|]*/;
}
// ==SCOPE::Extract to constant in enclosing scope==
namespace X {
    export const j = 10;
    const newLocal = j * j;
    export const y = /*RENAME*/newLocal;
}
// ==SCOPE::Extract to constant in global scope==
const newLocal = X.j * X.j;
namespace X {
    export const j = 10;
    export const y = /*RENAME*/newLocal;
}