////function f(): string & {(): any} {
////	return <any>{};
////}
////let x = f();
////x/**/();

goTo.marker();
verify.quickInfoIs("let x: () => any");
