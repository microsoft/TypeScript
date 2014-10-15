/// <reference path="fourslash.ts" />

//// interface IPromise<T> {
////     then<U>(success: (value: T) => IPromise<U>, error?: (error: any) => IPromise<U>, progress?: (progress: any) => void ): IPromise<U>;
////     then<U>(success: (value: T) => IPromise<U>, error?: (error: any) => U, progress?: (progress: any) => void ): IPromise<U>;
////     then<U>(success: (value: T) => U, error?: (error: any) => IPromise<U>, progress?: (progress: any) => void ): IPromise<U>;
////     then<U>(success: (value: T) => U, error?: (error: any) => U, progress?: (progress: any) => void ): IPromise<U>;
////     done? <U>(success: (value: T) => any, error?: (error: any) => any, progress?: (progress: any) => void ): void;
//// }
//// var p1: IPromise<string>;
//// var p/*1*/2 = p1.then(function (x/*2*/x) {
////     return xx;
//// });
//// p2.then(function (x/*3*/x) {
//// } );

goTo.marker("1");
verify.quickInfoIs('(var) p2: IPromise<string>');

goTo.marker("2");
verify.quickInfoIs('(parameter) xx: string');

goTo.marker("3");
verify.quickInfoIs('(parameter) xx: string');
