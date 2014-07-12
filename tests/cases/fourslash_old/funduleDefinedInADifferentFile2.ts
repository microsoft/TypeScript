/// <reference path='fourslash.ts'/>

// @Filename: f1.ts
////declare module "q" {
////    export = Q;
////}
////declare function Q<T>(value: T): void;
////declare module Q {
////
////    interface Deferred<T> {
////        //		promise: Promise<T>;
////        resolve(value: T): void;
////        reject(reason: any): void;
////        notify(value: any): void;
////        makeNodeResolver(): (reason: any, value: T) => void;
////    }
////
////export function defer<T>(): Deferred<T>;
////}

// @Filename: f2.ts
///////<reference path='f1.ts'/>
////import q = require('q');
////Q.defer/**/();


goTo.marker();
verify.completionListContains('defer');
verify.numberOfErrorsInCurrentFile(0);
