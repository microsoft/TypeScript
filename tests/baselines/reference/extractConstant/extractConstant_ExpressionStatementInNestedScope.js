// ==ORIGINAL==

let i = 0;
function F() {
    /*[#|*/i++/*|]*/;
}
        
// ==SCOPE::Extract to constant in enclosing scope==

let i = 0;
function F() {
    const /*RENAME*/newLocal = i++;
}
        
// ==SCOPE::Extract to constant in global scope==

let i = 0;
const /*RENAME*/newLocal = i++;
function F() {
}
        