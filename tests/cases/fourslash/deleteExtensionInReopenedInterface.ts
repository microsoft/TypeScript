/// <reference path="fourslash.ts" />

//// interface A { a: number; }
//// interface B { b: number; }
//// 
//// interface I /*del*/extends A { }
//// interface I extends B { }
//// 
//// var i: I;
//// class C /*delImplements*/implements A { }
//// var c: C;
//// c.a;

goTo.marker('del');
edit.deleteAtCaret('extends A'.length);

goTo.eof();
edit.insert("var a = i.a;");

goTo.marker('delImplements');
edit.deleteAtCaret('implements A'.length);

goTo.marker('del');
edit.insert('extends A');