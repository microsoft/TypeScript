////function f(): string & {(): any} {
////	return <any>{};
////}
////let x = f();
////x/**/();

verify.quickInfoAt("", "let x: () => any");
