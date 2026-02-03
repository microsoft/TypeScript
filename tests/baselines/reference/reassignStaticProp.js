//// [tests/cases/compiler/reassignStaticProp.ts] ////

//// [reassignStaticProp.ts]
class foo {
 
    static bar = 1;
 
    static bar:string; // errror - duplicate id
 
}
 
 



//// [reassignStaticProp.js]
let foo = (() => {
    class foo {
    }
    foo.bar = 1;
    return foo;
})();
