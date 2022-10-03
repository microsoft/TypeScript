/// <reference path='fourslash.ts' />

////interface ProxyHandler<T extends object> {
////    getPrototypeOf?(target: T): object | null;
////}
////interface ProxyConstructor {
////    new <T extends object>(target: T, handler: ProxyHandler<T>): T;
////}
////declare var Proxy: ProxyConstructor;
////let target = {}
////let proxy = new /**/Proxy(target, {
////    getPrototypeOf()
////})

goTo.marker("");
verify.quickInfoExists();
