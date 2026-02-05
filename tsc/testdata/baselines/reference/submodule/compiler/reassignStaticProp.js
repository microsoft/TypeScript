//// [tests/cases/compiler/reassignStaticProp.ts] ////

//// [reassignStaticProp.ts]
class foo {
 
    static bar = 1;
 
    static bar:string; // errror - duplicate id
 
}
 
 



//// [reassignStaticProp.js]
"use strict";
class foo {
    static bar = 1;
    static bar; // errror - duplicate id
}
