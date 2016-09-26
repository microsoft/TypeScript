/// <reference path='fourslash.ts'/>
////let o = { a: 1, b: 'no' }
////let o2 = { b: 'yes', c: true }
////let swap = { a: 'yes', b: -1 };
////let addAfter: { a: number, b: string, c: boolean } =
////    { ...o, c: false }
////let addBefore: { a: number, b: string, c: boolean } =
////    { c: false, ...o }
////let ignore: { a: number, b: string } =
////    { b: 'ignored', ...o }
////ignore./*1*/a;
////let combinedNestedChangeType: { a: number, b: boolean, c: number } =
////    { ...{ a: 1, ...{ b: false, c: 'overriden' } }, c: -1 }
////combinedNestedChangeType./*2*/a;
////let spreadNull: { a: number } =
////    { a: 7, ...null }
////let spreadUndefined: { a: number } =
////    { a: 7, ...undefined }
////spreadNull./*3*/a;
////spreadUndefined./*4*/a;
goTo.marker('1');
verify.memberListContains('a', '(property) a: number');
verify.memberListContains('b', '(property) b: string');
verify.memberListCount(2);
goTo.marker('2');
verify.memberListContains('a', '(property) a: number');
verify.memberListContains('b', '(property) b: boolean');
verify.memberListContains('c', '(property) c: number');
verify.memberListCount(3);
goTo.marker('3');
verify.memberListContains('a', '(property) a: number');
verify.memberListCount(1);
goTo.marker('4');
verify.memberListContains('a', '(property) a: number');
verify.memberListCount(1);
