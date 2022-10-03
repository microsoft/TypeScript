/// <reference path="fourslash.ts" />

//// interface IFoo<T> {
////     foo<T>(): T;
//// }
//// function foo<string>(/**/): string { return null; }
//// function foo<T>(x: T): T { return null; }

goTo.marker();
edit.insert("x: string");
