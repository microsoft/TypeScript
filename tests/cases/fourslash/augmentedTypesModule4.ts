/// <reference path='fourslash.ts'/>

////module m3d { export var y = 2; }
////declare class m3d { foo(): void }
////var /*1*/r = new m3d();
////r./*2*/
////var /*4*/r2 = m3d./*3*/

verify.quickInfoAt("1", "var r: m3d");

verify.completions({ marker: "2", exact: "foo" });
edit.insert('foo();');

verify.completions({ marker: "3", includes: "y" });
edit.insert('y;');

verify.quickInfoAt("4", "var r2: number");
