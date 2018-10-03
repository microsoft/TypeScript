// ==ORIGINAL==
namespace N {
    let x = /*[#|*/1/*|]*/;
}
// ==SCOPE::Extract to constant in enclosing scope==
namespace N {
    const newLocal = 1;
    let x = /*RENAME*/newLocal;
}
// ==SCOPE::Extract to constant in global scope==
const newLocal = 1;
namespace N {
    let x = /*RENAME*/newLocal;
}