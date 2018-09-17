/// <reference path='fourslash.ts' />

//// type A = 'foo' | 'bar' | 'baz';
//// type B<T extends A> = {};
//// type C = B<'foo' | '/**/'>

verify.completions({ marker: "", exact: ["bar", "baz"] });
edit.insert("b");
verify.completions({ exact: ["bar", "baz"] });
edit.insert("ar");
verify.completions({ exact: ["bar", "baz"] });
