class SS<T>{

}

var x1 = new SS<number>(); // OK
var x2 = new SS<number>;   // OK 
var x3 = new SS();         // OK
var x4 = new SS;           // OK
