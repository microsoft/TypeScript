// ==ORIGINAL==

const f = () => {
    return /*[#|*/2 + 1/*|]*/;
};
// ==SCOPE::Extract to constant in enclosing scope==

const f = () => {
    const newLocal = 2 + 1;
    return /*RENAME*/newLocal;
};
// ==SCOPE::Extract to constant in global scope==
const newLocal = 2 + 1;
const f = () => {
    return /*RENAME*/newLocal;
};