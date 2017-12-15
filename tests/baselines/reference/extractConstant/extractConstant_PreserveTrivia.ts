// ==ORIGINAL==

// a
var q = /*b*/ //c
    /*d*/ /*[#|*/1 /*e*/ //f
    /*g*/ + /*h*/ //i
    /*j*/ 2/*|]*/ /*k*/ //l
    /*m*/; /*n*/ //o
// ==SCOPE::Extract to constant in enclosing scope==
const newLocal = 1 /*e*/ //f
    /*g*/ + /*h*/ //i
        /*j*/ 2;
// a
var q = /*b*/ //c
    /*d*/ /*RENAME*/newLocal /*k*/ //l
    /*m*/; /*n*/ //o