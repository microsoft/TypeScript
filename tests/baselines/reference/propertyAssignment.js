//// [propertyAssignment.ts]
var foo1: { new ():any; }   
var bar1: { x : number; }

var foo2: { [index]; } // should be an error, used to be indexer, now it is a computed property
var bar2: { x : number; }

var foo3: { ():void; }
var bar3: { x : number; }



foo1 = bar1; // should be an error
foo2 = bar2; 
foo3 = bar3; // should be an error

//// [propertyAssignment.js]
var foo1;
var bar1;
var foo2; // should be an error, used to be indexer, now it is a computed property
var bar2;
var foo3;
var bar3;
foo1 = bar1; // should be an error
foo2 = bar2;
foo3 = bar3; // should be an error
