// ==ORIGINAL==

"strict";

const x = /*[#|*/2 + 1/*|]*/;
        
// ==SCOPE::Extract to constant in enclosing scope==

"strict";

const newLocal = 2 + 1;
const x = /*RENAME*/newLocal;
        