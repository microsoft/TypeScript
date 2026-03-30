//// [tests/cases/compiler/reassignStaticProp.ts] ////

//// [reassignStaticProp.ts]
class foo {
 
    static bar = 1;
 
    static bar:string; // error - duplicate id
 
}
 
 



//// [reassignStaticProp.js]
"use strict";
class foo {
}
foo.bar = 1;
