/// <reference path='fourslash.ts'/>

////type Tail<T extends any[]> =
////	((...args: T) => any) extends ((head: any, ...tail: infer R) => any) ? R : never;
////
////type Reverse<List extends any[]> = _Reverse<List, []>;
////
////type _Reverse<Source extends any[], Result extends any[] = []> = {
////	1: Result,
////	0: _Reverse<Tail<Source>, 0>,
////}[Source extends [] ? 1 : 0];
////
////type Foo = Reverse<[0,/**/]>;

verify.signatureHelp({
    marker: "",
    text: "Reverse<List extends any[]>",
});