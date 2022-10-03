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

verify.quickInfos({
    1: "var p1: IPromise<number>",
    2: "(parameter) xx: number",
    3: "var p2: IPromise<string>",
    4: "(parameter) xx: number",
    5: "var p3: IPromise<string>",
    6: "(parameter) xx: string",
    7: "(parameter) xx: string"
});
