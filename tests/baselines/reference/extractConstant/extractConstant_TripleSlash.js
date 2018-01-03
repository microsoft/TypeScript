// ==ORIGINAL==

/// <reference path="path.js"/>

const x = /*[#|*/2 + 1/*|]*/;
        
// ==SCOPE::Extract to constant in enclosing scope==

/// <reference path="path.js"/>

const newLocal = 2 + 1;
const x = /*RENAME*/newLocal;
        