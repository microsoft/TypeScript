/// <reference path='fourslash.ts' />

//// /*1*/function f () : void { }
//// /*2*/function f<A>   () : void { }
//// /*3*/function f<A extends B<A>>   ()  :void { }
//// /*4*/function f<A extends C<B<A>>>     ()  :   void { }

format.document();

goTo.marker("1");
verify.currentLineContentIs("function f(): void { }");

goTo.marker("2");
verify.currentLineContentIs("function f<A>(): void { }");

goTo.marker("3");
verify.currentLineContentIs("function f<A extends B<A>>(): void { }");

goTo.marker("4");
verify.currentLineContentIs("function f<A extends C<B<A>>>(): void { }");
