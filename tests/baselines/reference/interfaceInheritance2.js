//// [interfaceInheritance2.ts]
interface I6 {
 ():void;
}

interface I7 extends I6 { }

var v1:I7;
v1();


//// [interfaceInheritance2.js]
var v1;
v1();
