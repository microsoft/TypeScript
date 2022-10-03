/// <reference path='fourslash.ts'/>

////declare class m3e { foo(): void }
////module m3e { export var y = 2; }
////var /*1*/r = new m3e();
////r./*2*/
////var /*4*/r2 = m3e./*3*/

verify.quickInfoAt("1", "var r: m3e");

verify.completions({ marker: "2", exact: "foo" });

edit.insert('foo();');

verify.completions({ marker: "3", includes: "y" });
edit.insert('y;');

verify.quickInfoAt("4", "var r2: number");
