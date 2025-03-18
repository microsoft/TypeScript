//// [tests/cases/compiler/reassignStaticProp.ts] ////

//// [reassignStaticProp.ts]
class foo {
 
    static bar = 1;
 
    static bar:string; // errror - duplicate id
 
}
 
 



//// [reassignStaticProp.js]
class foo {
    static bar = 1;
    static bar;
}
