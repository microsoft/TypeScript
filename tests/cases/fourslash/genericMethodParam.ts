/// <reference path='fourslash.ts' />

//// class C<T> {
////     /*1*/
//// }
//// /*2*/

verify.noErrors();
goTo.marker('1');
edit.insertLine("constructor(){}");
edit.insertLine("foo(a: T) {");
edit.insertLine("    return a;");
edit.insertLine("}");
verify.noErrors();
goTo.marker('2');
edit.insertLine("var x = new C<number>();");
edit.insertLine("var y: number = x.foo(5);");
verify.noErrors();
