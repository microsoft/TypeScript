//// [tests/cases/compiler/genericObjectCreationWithoutTypeArgs.ts] ////

//// [genericObjectCreationWithoutTypeArgs.ts]
class SS<T>{

}

var x1 = new SS<number>(); // OK
var x2 = new SS<number>;   // OK 
var x3 = new SS();         // OK
var x4 = new SS;           // OK


//// [genericObjectCreationWithoutTypeArgs.js]
class SS {
}
var x1 = new SS();
var x2 = new SS;
var x3 = new SS();
var x4 = new SS;
