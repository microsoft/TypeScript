//// [promisePermutations.ts]
interface Promise<T> {
    then<U>(success?: (value: T) => Promise<U>, error?: (error: any) => Promise<U>, progress?: (progress: any) => void): Promise<U>;
    then<U>(success?: (value: T) => Promise<U>, error?: (error: any) => U, progress?: (progress: any) => void): Promise<U>;
    then<U>(success?: (value: T) => U, error?: (error: any) => Promise<U>, progress?: (progress: any) => void): Promise<U>;
    then<U>(success?: (value: T) => U, error?: (error: any) => U, progress?: (progress: any) => void): Promise<U>;
    done<U>(success?: (value: T) => any, error?: (error: any) => any, progress?: (progress: any) => void): void;
}

interface IPromise<T> {
    then<U>(success?: (value: T) => IPromise<U>, error?: (error: any) => IPromise<U>, progress?: (progress: any) => void): IPromise<U>;
    then<U>(success?: (value: T) => IPromise<U>, error?: (error: any) => U, progress?: (progress: any) => void): IPromise<U>;
    then<U>(success?: (value: T) => U, error?: (error: any) => IPromise<U>, progress?: (progress: any) => void): IPromise<U>;
    then<U>(success?: (value: T) => U, error?: (error: any) => U, progress?: (progress: any) => void): IPromise<U>;
    done? <U>(success?: (value: T) => any, error?: (error: any) => any, progress?: (progress: any) => void): void;
}

declare function testFunction(): IPromise<number>;
declare function testFunctionP(): Promise<number>;
declare function testFunction2(): IPromise<{ x: number }>;
declare function testFunction2P(): Promise<{ x: number }>;
declare function testFunction3(x: number): IPromise<number>;
declare function testFunction3P(x: number): Promise<number>;
declare function testFunction4(x: number, y?: string): IPromise<string>;
declare function testFunction4P(x: number, y?: string): Promise<string>;
declare function testFunction5(x: number, cb: (a: string) => string): IPromise<string>;
declare function testFunction5P(x: number, cb: (a: string) => string): Promise<string>;
declare function testFunction6(x: number, cb: <T>(a: T) => T): IPromise<string>;
declare function testFunction6P(x: number, cb: <T>(a: T) => T): Promise<string>;
declare function testFunction7(cb: <T>(a: T) => T): IPromise<string>;
declare function testFunction7P(cb: <T>(a: T) => T): Promise<string>;
declare function testFunction8<T>(x: T, cb: (a: T) => T): IPromise<T>;
declare function testFunction8P<T>(x: T, cb: (a: T) => T): Promise<T>;
declare function testFunction9<T>(x: T, cb: <U>(a: U) => U): IPromise<T>;
declare function testFunction9P<T>(x: T, cb: <U>(a: U) => U): Promise<T>;
declare function testFunction10<T>(cb: <U>(a: U) => U): IPromise<T>;
declare function testFunction10P<T>(cb: <U>(a: U) => U): Promise<T>;

declare function testFunction11(x: number): IPromise<number>;
declare function testFunction11(x: string): IPromise<string>;
declare function testFunction11P(x: number): Promise<number>;
declare function testFunction11P(x: string): Promise<string>;

declare function testFunction12<T>(x: T): IPromise<T>;
declare function testFunction12<T>(x: T, y: T): IPromise<T>;
declare function testFunction12P<T>(x: T): IPromise<T>;
declare function testFunction12P<T>(x: T, y: T): Promise<T>;

var r1: IPromise<number>;
var r1a = r1.then(testFunction, testFunction, testFunction);
var r1b = r1.then(testFunction, testFunction, testFunction).then(testFunction, testFunction, testFunction);
var r1c = r1.then(testFunctionP, testFunctionP, testFunctionP);
var s1: Promise<number>;
var s1a = s1.then(testFunction, testFunction, testFunction);
var s1b = s1.then(testFunctionP, testFunctionP, testFunctionP);
var s1c = s1.then(testFunctionP, testFunction, testFunction);
var s1d = s1.then(testFunctionP, testFunction, testFunction).then(testFunction, testFunction, testFunction);

var r2: IPromise<{ x: number; }>;
var r2a = r2.then(testFunction2, testFunction2, testFunction2);
var r2b = r2.then(testFunction2, testFunction2, testFunction2).then(testFunction2, testFunction2, testFunction2);
var s2: Promise<{ x: number; }>;
var s2a = s2.then(testFunction2, testFunction2, testFunction2);
var s2b = s2.then(testFunction2P, testFunction2P, testFunction2P);
var s2c = s2.then(testFunction2P, testFunction2, testFunction2);
var s2d = s2.then(testFunction2P, testFunction2, testFunction2).then(testFunction2, testFunction2, testFunction2);

var r3: IPromise<number>;
var r3a = r3.then(testFunction3, testFunction3, testFunction3);
var r3b = r3.then(testFunction3, testFunction3, testFunction3).then(testFunction3, testFunction3, testFunction3);
var s3: Promise<number>;
var s3a = s3.then(testFunction3, testFunction3, testFunction3);
var s3b = s3.then(testFunction3P, testFunction3P, testFunction3P);
var s3c = s3.then(testFunction3P, testFunction3, testFunction3);
var s3d = s3.then(testFunction3P, testFunction3, testFunction3).then(testFunction3, testFunction3, testFunction3); // error

var r4: IPromise<string>;
var sIPromise: (x: any) => IPromise<string>;
var sPromise: (x: any) => Promise<string>;
var r4a = r4.then(testFunction4, testFunction4, testFunction4); // error
var r4b = r4.then(sIPromise, testFunction4, testFunction4).then(sIPromise, testFunction4, testFunction4); // ok
var s4: Promise<string>;
var s4a = s4.then(testFunction4, testFunction4, testFunction4); // error
var s4b = s4.then(testFunction4P, testFunction4P, testFunction4P); // error 
var s4c = s4.then(testFunction4P, testFunction4, testFunction4); // error
var s4d = s4.then(sIPromise, testFunction4P, testFunction4).then(sIPromise, testFunction4P, testFunction4);

var r5: IPromise<string>;
var r5a = r5.then(testFunction5, testFunction5, testFunction5); // error
var r5b = r5.then(sIPromise, sIPromise, sIPromise).then(sIPromise, sIPromise, sIPromise); // ok
var s5: Promise<string>;
var s5a = s5.then(testFunction5, testFunction5, testFunction5); // error
var s5b = s5.then(testFunction5P, testFunction5P, testFunction5P); // error
var s5c = s5.then(testFunction5P, testFunction5, testFunction5); // error
var s5d = s5.then(sPromise, sPromise, sPromise).then(sIPromise, sIPromise, sIPromise); // ok

var r6: IPromise<string>;
var r6a = r6.then(testFunction6, testFunction6, testFunction6); // error
var r6b = r6.then(sIPromise, sIPromise, sIPromise).then(sIPromise, sIPromise, sIPromise); // ok
var s6: Promise<string>;
var s6a = s6.then(testFunction6, testFunction6, testFunction6); // error
var s6b = s6.then(testFunction6P, testFunction6P, testFunction6P); // error
var s6c = s6.then(testFunction6P, testFunction6, testFunction6); // error
var s6d = s6.then(sPromise, sPromise, sPromise).then(sIPromise, sIPromise, sIPromise); // ok

var r7: IPromise<string>;
var r7a = r7.then(testFunction7, testFunction7, testFunction7); // error
var r7b = r7.then(sIPromise, sIPromise, sIPromise).then(sIPromise, sIPromise, sIPromise); // ok
var s7: Promise<string>;
var s7a = r7.then(testFunction7, testFunction7, testFunction7); // error
var s7b = r7.then(testFunction7P, testFunction7P, testFunction7P); // error
var s7c = r7.then(testFunction7P, testFunction7, testFunction7); // error
var s7d = r7.then(sPromise, sPromise, sPromise).then(sPromise, sPromise, sPromise); // ok?

var r8: IPromise<number>;
var nIPromise: (x: any) => IPromise<number>;
var nPromise: (x: any) => Promise<number>;
var r8a = r8.then(testFunction8, testFunction8, testFunction8); // error
var r8b = r8.then(nIPromise, nIPromise, nIPromise).then(nIPromise, nIPromise, nIPromise); // ok
var s8: Promise<number>;
var s8a = s8.then(testFunction8, testFunction8, testFunction8); // error
var s8b = s8.then(testFunction8P, testFunction8P, testFunction8P); // error
var s8c = s8.then(testFunction8P, testFunction8, testFunction8); // error
var s8d = s8.then(nIPromise, nIPromise, nIPromise).then(nIPromise, nIPromise, nIPromise); // ok

var r9: IPromise<number>;
var r9a = r9.then(testFunction9, testFunction9, testFunction9); // error
var r9b = r9.then(sIPromise, sIPromise, sIPromise); // ok
var r9c = r9.then(nIPromise, nIPromise, nIPromise); // ok
var r9d = r9.then(testFunction, sIPromise, nIPromise); // ok
var r9e = r9.then(testFunction, nIPromise, sIPromise).then(sIPromise, sIPromise, sIPromise); // ok
var s9: Promise<number>;
var s9a = s9.then(testFunction9, testFunction9, testFunction9); // error
var s9b = s9.then(testFunction9P, testFunction9P, testFunction9P); // error
var s9c = s9.then(testFunction9P, testFunction9, testFunction9); // error
var s9d = s9.then(sPromise, sPromise, sPromise); // ok
var s9e = s9.then(nPromise, nPromise, nPromise); // ok
var s9f = s9.then(testFunction, sIPromise, nIPromise); // error
var s9g = s9.then(testFunction, nIPromise, sIPromise).then(sIPromise, sIPromise, sIPromise); // ok

var r10 = testFunction10(x => x);
var r10a = r10.then(testFunction10, testFunction10, testFunction10); // ok
var r10b = r10.then(sIPromise, sIPromise, sIPromise); // ok
var r10c = r10.then(nIPromise, nIPromise, nIPromise); // ok
var r10d = r10.then(testFunction, sIPromise, nIPromise); // ok
var r10e = r10.then(testFunction, nIPromise, sIPromise).then(sIPromise, sIPromise, sIPromise); // ok
var s10 = testFunction10P(x => x);
var s10a = s10.then(testFunction10, testFunction10, testFunction10); // ok
var s10b = s10.then(testFunction10P, testFunction10P, testFunction10P); // ok
var s10c = s10.then(testFunction10P, testFunction10, testFunction10); // ok
var s10d = s10.then(sPromise, sPromise, sPromise); // ok
var s10e = s10.then(nIPromise, nPromise, nIPromise); // ok
var s10f = s10.then(testFunctionP, sIPromise, nIPromise); // error
var s10g = s10.then(testFunctionP, nIPromise, sIPromise).then(sPromise, sIPromise, sIPromise); // ok

var r11: IPromise<number>;
var r11a = r11.then(testFunction11, testFunction11, testFunction11); // error
var s11: Promise<number>;
var s11a = s11.then(testFunction11, testFunction11, testFunction11); // ok
var s11b = s11.then(testFunction11P, testFunction11P, testFunction11P); // error
var s11c = s11.then(testFunction11P, testFunction11, testFunction11); // error

var r12 = testFunction12(x => x);
var r12a = r12.then(testFunction12, testFunction12, testFunction12); // ok
var s12 = testFunction12(x => x);
var s12a = s12.then(testFunction12, testFunction12, testFunction12); // ok
var s12b = s12.then(testFunction12P, testFunction12P, testFunction12P); // ok
var s12c = s12.then(testFunction12P, testFunction12, testFunction12); // ok

//// [promisePermutations.js]
var r1;
var r1a = r1.then(testFunction, testFunction, testFunction);
var r1b = r1.then(testFunction, testFunction, testFunction).then(testFunction, testFunction, testFunction);
var r1c = r1.then(testFunctionP, testFunctionP, testFunctionP);
var s1;
var s1a = s1.then(testFunction, testFunction, testFunction);
var s1b = s1.then(testFunctionP, testFunctionP, testFunctionP);
var s1c = s1.then(testFunctionP, testFunction, testFunction);
var s1d = s1.then(testFunctionP, testFunction, testFunction).then(testFunction, testFunction, testFunction);
var r2;
var r2a = r2.then(testFunction2, testFunction2, testFunction2);
var r2b = r2.then(testFunction2, testFunction2, testFunction2).then(testFunction2, testFunction2, testFunction2);
var s2;
var s2a = s2.then(testFunction2, testFunction2, testFunction2);
var s2b = s2.then(testFunction2P, testFunction2P, testFunction2P);
var s2c = s2.then(testFunction2P, testFunction2, testFunction2);
var s2d = s2.then(testFunction2P, testFunction2, testFunction2).then(testFunction2, testFunction2, testFunction2);
var r3;
var r3a = r3.then(testFunction3, testFunction3, testFunction3);
var r3b = r3.then(testFunction3, testFunction3, testFunction3).then(testFunction3, testFunction3, testFunction3);
var s3;
var s3a = s3.then(testFunction3, testFunction3, testFunction3);
var s3b = s3.then(testFunction3P, testFunction3P, testFunction3P);
var s3c = s3.then(testFunction3P, testFunction3, testFunction3);
var s3d = s3.then(testFunction3P, testFunction3, testFunction3).then(testFunction3, testFunction3, testFunction3); // error
var r4;
var sIPromise;
var sPromise;
var r4a = r4.then(testFunction4, testFunction4, testFunction4); // error
var r4b = r4.then(sIPromise, testFunction4, testFunction4).then(sIPromise, testFunction4, testFunction4); // ok
var s4;
var s4a = s4.then(testFunction4, testFunction4, testFunction4); // error
var s4b = s4.then(testFunction4P, testFunction4P, testFunction4P); // error 
var s4c = s4.then(testFunction4P, testFunction4, testFunction4); // error
var s4d = s4.then(sIPromise, testFunction4P, testFunction4).then(sIPromise, testFunction4P, testFunction4);
var r5;
var r5a = r5.then(testFunction5, testFunction5, testFunction5); // error
var r5b = r5.then(sIPromise, sIPromise, sIPromise).then(sIPromise, sIPromise, sIPromise); // ok
var s5;
var s5a = s5.then(testFunction5, testFunction5, testFunction5); // error
var s5b = s5.then(testFunction5P, testFunction5P, testFunction5P); // error
var s5c = s5.then(testFunction5P, testFunction5, testFunction5); // error
var s5d = s5.then(sPromise, sPromise, sPromise).then(sIPromise, sIPromise, sIPromise); // ok
var r6;
var r6a = r6.then(testFunction6, testFunction6, testFunction6); // error
var r6b = r6.then(sIPromise, sIPromise, sIPromise).then(sIPromise, sIPromise, sIPromise); // ok
var s6;
var s6a = s6.then(testFunction6, testFunction6, testFunction6); // error
var s6b = s6.then(testFunction6P, testFunction6P, testFunction6P); // error
var s6c = s6.then(testFunction6P, testFunction6, testFunction6); // error
var s6d = s6.then(sPromise, sPromise, sPromise).then(sIPromise, sIPromise, sIPromise); // ok
var r7;
var r7a = r7.then(testFunction7, testFunction7, testFunction7); // error
var r7b = r7.then(sIPromise, sIPromise, sIPromise).then(sIPromise, sIPromise, sIPromise); // ok
var s7;
var s7a = r7.then(testFunction7, testFunction7, testFunction7); // error
var s7b = r7.then(testFunction7P, testFunction7P, testFunction7P); // error
var s7c = r7.then(testFunction7P, testFunction7, testFunction7); // error
var s7d = r7.then(sPromise, sPromise, sPromise).then(sPromise, sPromise, sPromise); // ok?
var r8;
var nIPromise;
var nPromise;
var r8a = r8.then(testFunction8, testFunction8, testFunction8); // error
var r8b = r8.then(nIPromise, nIPromise, nIPromise).then(nIPromise, nIPromise, nIPromise); // ok
var s8;
var s8a = s8.then(testFunction8, testFunction8, testFunction8); // error
var s8b = s8.then(testFunction8P, testFunction8P, testFunction8P); // error
var s8c = s8.then(testFunction8P, testFunction8, testFunction8); // error
var s8d = s8.then(nIPromise, nIPromise, nIPromise).then(nIPromise, nIPromise, nIPromise); // ok
var r9;
var r9a = r9.then(testFunction9, testFunction9, testFunction9); // error
var r9b = r9.then(sIPromise, sIPromise, sIPromise); // ok
var r9c = r9.then(nIPromise, nIPromise, nIPromise); // ok
var r9d = r9.then(testFunction, sIPromise, nIPromise); // ok
var r9e = r9.then(testFunction, nIPromise, sIPromise).then(sIPromise, sIPromise, sIPromise); // ok
var s9;
var s9a = s9.then(testFunction9, testFunction9, testFunction9); // error
var s9b = s9.then(testFunction9P, testFunction9P, testFunction9P); // error
var s9c = s9.then(testFunction9P, testFunction9, testFunction9); // error
var s9d = s9.then(sPromise, sPromise, sPromise); // ok
var s9e = s9.then(nPromise, nPromise, nPromise); // ok
var s9f = s9.then(testFunction, sIPromise, nIPromise); // error
var s9g = s9.then(testFunction, nIPromise, sIPromise).then(sIPromise, sIPromise, sIPromise); // ok
var r10 = testFunction10(function (x) { return x; });
var r10a = r10.then(testFunction10, testFunction10, testFunction10); // ok
var r10b = r10.then(sIPromise, sIPromise, sIPromise); // ok
var r10c = r10.then(nIPromise, nIPromise, nIPromise); // ok
var r10d = r10.then(testFunction, sIPromise, nIPromise); // ok
var r10e = r10.then(testFunction, nIPromise, sIPromise).then(sIPromise, sIPromise, sIPromise); // ok
var s10 = testFunction10P(function (x) { return x; });
var s10a = s10.then(testFunction10, testFunction10, testFunction10); // ok
var s10b = s10.then(testFunction10P, testFunction10P, testFunction10P); // ok
var s10c = s10.then(testFunction10P, testFunction10, testFunction10); // ok
var s10d = s10.then(sPromise, sPromise, sPromise); // ok
var s10e = s10.then(nIPromise, nPromise, nIPromise); // ok
var s10f = s10.then(testFunctionP, sIPromise, nIPromise); // error
var s10g = s10.then(testFunctionP, nIPromise, sIPromise).then(sPromise, sIPromise, sIPromise); // ok
var r11;
var r11a = r11.then(testFunction11, testFunction11, testFunction11); // error
var s11;
var s11a = s11.then(testFunction11, testFunction11, testFunction11); // ok
var s11b = s11.then(testFunction11P, testFunction11P, testFunction11P); // error
var s11c = s11.then(testFunction11P, testFunction11, testFunction11); // error
var r12 = testFunction12(function (x) { return x; });
var r12a = r12.then(testFunction12, testFunction12, testFunction12); // ok
var s12 = testFunction12(function (x) { return x; });
var s12a = s12.then(testFunction12, testFunction12, testFunction12); // ok
var s12b = s12.then(testFunction12P, testFunction12P, testFunction12P); // ok
var s12c = s12.then(testFunction12P, testFunction12, testFunction12); // ok
