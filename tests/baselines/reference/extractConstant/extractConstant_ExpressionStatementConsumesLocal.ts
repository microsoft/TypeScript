// ==ORIGINAL==

function F() {
    let i = 0;
    /*[#|*/i++/*|]*/;
}
        
// ==SCOPE::Extract to constant in enclosing scope==

function F() {
    let i = 0;
    const /*RENAME*/newLocal = i++;
}
        