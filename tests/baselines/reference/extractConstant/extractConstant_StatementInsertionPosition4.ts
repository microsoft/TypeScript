// ==ORIGINAL==

function F() {
    for (let j = 0; j < 10; j++) {
        const x = /*[#|*/2 + 1/*|]*/;
    }
}
        
// ==SCOPE::Extract to constant in enclosing scope==

function F() {
    for (let j = 0; j < 10; j++) {
        const newLocal = 2 + 1;
        const x = /*RENAME*/newLocal;
    }
}
        
// ==SCOPE::Extract to constant in global scope==
const newLocal = 2 + 1;
function F() {
    for (let j = 0; j < 10; j++) {
        const x = /*RENAME*/newLocal;
    }
}
        