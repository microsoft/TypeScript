/// <reference path="fourslash.ts" />

//// interface IPromise<T> {
////     then<U>(success?: (value: T) => IPromise<U>, error?: (error: any) => IPromise<U>, progress?: (progress: any) => void ): IPromise<U>;
////     then<U>(success?: (value: T) => IPromise<U>, error?: (error: any) => U, progress?: (progress: any) => void ): IPromise<U>;
////     then<U>(success?: (value: T) => U, error?: (error: any) => IPromise<U>, progress?: (progress: any) => void ): IPromise<U>;
////     then<U>(success?: (value: T) => U, error?: (error: any) => U, progress?: (progress: any) => void ): IPromise<U>;
////     done? <U>(success?: (value: T) => any, error?: (error: any) => any, progress?: (progress: any) => void ): void;
//// }
//// var p1: IPromise<number> = null;
//// p/*1*/1.then(function (x/*2*/x) { }); 
//// var p/*3*/2 = p1.then(function (x/*4*/x) { return "hello"; })
//// var p/*5*/3 = p2.then(function (x/*6*/x) {
////     return x/*7*/x;
//// });


goTo.marker("1");
verify.quickInfoIs('IPromise<number>');

goTo.marker("2");
verify.quickInfoIs('number');

goTo.marker("3");
verify.quickInfoIs('IPromise<string>');

goTo.marker("4");
verify.quickInfoIs('number');

goTo.marker("5");
verify.quickInfoIs('IPromise<string>');

goTo.marker("6");
verify.quickInfoIs('string');

goTo.marker("7");
verify.quickInfoIs('string');