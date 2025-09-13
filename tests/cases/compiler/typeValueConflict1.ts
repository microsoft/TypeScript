namespace M1 {
 export class A {
 }
}
namespace M2 {
 var M1 = 0;
 // Should error.  M1 should bind to the variable, not to the module.
 class B extends M1.A {
 }
}
