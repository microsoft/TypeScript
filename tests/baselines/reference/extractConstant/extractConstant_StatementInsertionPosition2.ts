// ==ORIGINAL==

const i = 0;
function F() {
    for (let j = 0; j < 10; j++) {
        const x = /*[#|*/i + 1/*|]*/;
    }
}
        
// ==SCOPE::Extract to constant in enclosing scope==

const i = 0;
function F() {
    for (let j = 0; j < 10; j++) {
        const newLocal = i + 1;
        const x = /*RENAME*/newLocal;
    }
}
        
// ==SCOPE::Extract to constant in global scope==

const i = 0;
const newLocal = i + 1;
function F() {
    for (let j = 0; j < 10; j++) {
        const x = /*RENAME*/newLocal;
    }
}
        