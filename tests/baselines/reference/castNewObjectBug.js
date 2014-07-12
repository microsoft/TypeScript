//// [castNewObjectBug.ts]
interface Foo { }
var xx = <Foo> new Object();

//// [castNewObjectBug.js]
var xx = new Object();
