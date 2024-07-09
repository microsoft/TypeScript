/// <reference path='fourslash.ts' />

////interface MyInt {
////    (): void;
////}

////function MyFn() { return <MyInt>MyFn; }
////var My/**/Var = MyFn();

verify.quickInfoAt("", "var MyVar: MyInt");
