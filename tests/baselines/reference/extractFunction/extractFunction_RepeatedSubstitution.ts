// ==ORIGINAL==
namespace X {
    export const j = 10;
    export const y = /*[#|*/j * j/*|]*/;
}
// ==SCOPE::Extract to function in namespace 'X'==
namespace X {
    export const j = 10;
    export const y = /*RENAME*/newFunction();

    function newFunction() {
        return j * j;
    }
}
// ==SCOPE::Extract to function in global scope==
namespace X {
    export const j = 10;
    export const y = /*RENAME*/newFunction();
}

function newFunction() {
    return X.j * X.j;
}
