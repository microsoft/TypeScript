// ==ORIGINAL==

// a
var q = /*b*/ //c
    /*d*/ /*[#|*/1 /*e*/ //f
    /*g*/ + /*h*/ //i
    /*j*/ 2/*|]*/ /*k*/ //l
    /*m*/; /*n*/ //o
// ==SCOPE::Extract to function in global scope==

// a
var q = /*b*/ //c
    /*d*/ /*RENAME*/newFunction() /*k*/ //l
    /*m*/; /*n*/ //o

function newFunction() {
    return 1 /*e*/ //f
        /*g*/ + /*h*/ //i
            /*j*/ 2;
}
