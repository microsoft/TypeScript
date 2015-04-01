//// [tests/cases/compiler/crashInResolveInterface.ts] ////

//// [file1.ts]
interface Q<T> {
    each(action: (item: T, index: number) => void): void;
}
var q1: Q<{ a: number; }>;
var x = q1.each(x => c.log(x));

//// [file2.ts]
///<reference path='file1.ts'/>
declare var c: C;
interface C {
    count(countTitle?: string): void;
}
interface C {
    log(message?: any, ...optionalParams: any[]): void;
}


//// [file1.js]
var q1;
var x = q1.each(function (x) { return c.log(x); });
//// [file2.js]
///<reference path='file1.ts'/>
