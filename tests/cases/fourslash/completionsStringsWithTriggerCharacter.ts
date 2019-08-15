/// <reference path="fourslash.ts" />

//// type A = "a/b" | "b/a";
//// const a: A = "a/*1*/";
////
//// type B = "a@b" | "b@a";
//// const a: B = "a@/*2*/";
////
//// type C = "a.b" | "b.a";
//// const c: C = "a./*3*/";
////
//// type D = "a'b" | "b'a";
//// const d: D = "a'/*4*/";
////
//// type E = "a`b" | "b`a";
//// const e: E = "a`/*5*/";
////
//// type F = 'a"b' | 'b"a';
//// const f: F = 'a"/*6*/';
////
//// type G = "a<b" | "b<a";
//// const g: G = 'a</*7*/';

verify.completions({ marker: '1', exact: ["a/b", "b/a"], triggerCharacter: "/" });
verify.completions({ marker: "2", exact: ["a@b", "b@a"], triggerCharacter: "@" });
verify.completions({ marker: "3", exact: ["a.b", "b.a"], triggerCharacter: "." });
verify.completions({ marker: "4", exact: ["a'b", "b'a"], triggerCharacter: "'" });
verify.completions({ marker: "5", exact: ["a`b", "b`a"], triggerCharacter: "`" });
verify.completions({ marker: "6", exact: ['a"b', 'b"a'], triggerCharacter: '"' });
verify.completions({ marker: "7", exact: ["a<b", "b<a"], triggerCharacter: '<' });
