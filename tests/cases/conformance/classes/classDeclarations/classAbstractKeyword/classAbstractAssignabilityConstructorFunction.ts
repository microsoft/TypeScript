abstract class A { }

// var AA: typeof A;
var AAA: new() => A;

// AA = A; // okay
AAA = A; // error. 
AAA = "asdf";