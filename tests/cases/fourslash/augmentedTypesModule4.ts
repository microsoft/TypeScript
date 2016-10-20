/// <reference path='fourslash.ts'/>

////module m3d { export var y = 2; } 
////declare class m3d { foo(): void }
////var /*1*/r = new m3d();
////r./*2*/
////var /*4*/r2 = m3d./*3*/

verify.quickInfoAt("1", "var r: m3d");

goTo.marker('2');
verify.completionListContains('foo');
edit.insert('foo();');

goTo.marker('3');
verify.completionListContains('y');
edit.insert('y;');

verify.quickInfoAt("4", "var r2: number");
