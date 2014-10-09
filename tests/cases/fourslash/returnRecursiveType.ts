/// <reference path='fourslash.ts' />

////interface MyInt {
////    (): void;
////}

////function MyFn() { return <MyInt>MyFn; }
////var My/**/Var = MyFn();

goTo.marker();
verify.quickInfoIs('(var) MyVar: MyInt');