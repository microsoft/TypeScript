/// <reference path="fourslash.ts" />

//// type Test1<T> = "foo" extends keyof T ? T["/*1*/"] : never;
//// 
//// type A = { bar: string };
//// type Test2 = "foo" extends keyof A ? A["/*2*/"] : never;
////
//// type Test3<T> = "foo" extends keyof T ? "bar" extends keyof T ? T["/*3*/"] : never : never;
////
//// type Test4<T extends { foo?: string }> = "foo" extends keyof T ? T["/*4*/"] : never;
////
//// type Test5<T> = "foo" extends keyof T ? "foo" extends keyof T ? T["/*5*/"] : never : never;
////
//// type Test6<T> = ["foo"] extends [keyof T] ? T["/*6*/"] : never;
////
//// type Test7<T extends { foo: string }> = "bar" extends keyof T ? T["/*7*/"] : never;
////
//// type Test8<T> = "foo" | "bar" extends keyof T ? T["/*8*/"] : never;
////
//// type Test9<T, T2> = "foo" & T2 extends keyof T ? T["/*9*/"] : never;
////
//// type Test10<T, T2> = "foo" extends keyof T & T2 ? T["/*10*/"] : never;
////
//// type Test11<T, T2> = "foo" extends keyof T | T2 ? T["/*11*/"] : never;
////
//// type Test12<T, T2> = "foo" extends keyof T2 ? T["/*12*/"] : never;

verify.completions({ marker: ["1"], exact: ["foo"] });
verify.completions({ marker: ["2"], excludes: ["foo"] });
verify.completions({ marker: ["3"], exact: ["bar", "foo"] });
verify.completions({ marker: ["4"], exact: ["foo"] });
verify.completions({ marker: ["5"], exact: ["foo"] });
verify.completions({ marker: ["6"], exact: ["foo"] });
verify.completions({ marker: ["7"], exact: ["bar", "foo"] });
verify.completions({ marker: ["8"], excludes: ["bar", "foo"] });
verify.completions({ marker: ["9"], excludes: ["foo"] });
verify.completions({ marker: ["10"], exact: ["foo"] });
verify.completions({ marker: ["11"], excludes: ["foo"] });
verify.completions({ marker: ["12"], excludes: ["foo"] });
