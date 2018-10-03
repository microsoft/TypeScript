// ==ORIGINAL==

for (let j = 0; j < 10; j++) {
    const x = /*[#|*/2 + 1/*|]*/;
}
        
// ==SCOPE::Extract to constant in enclosing scope==

for (let j = 0; j < 10; j++) {
    const newLocal = 2 + 1;
    const x = /*RENAME*/newLocal;
}
        