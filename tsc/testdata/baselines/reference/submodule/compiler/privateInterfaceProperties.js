//// [tests/cases/compiler/privateInterfaceProperties.ts] ////

//// [privateInterfaceProperties.ts]
interface i1 { name:string; }
 
// should be an error 
class c1 implements i1 { private name:string; }
 
// should be ok 
class c2 implements i1 { public name:string; }

 

//// [privateInterfaceProperties.js]
// should be an error 
class c1 {
    name;
}
// should be ok 
class c2 {
    name;
}
