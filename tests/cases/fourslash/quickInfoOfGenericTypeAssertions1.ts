/// <reference path='fourslash.ts'/>

////function f<T>(x: T): T { return null; }
////var /*1*/r = <T>(x: T) => x;
////var /*2*/r2 = < <T>(x: T) => T>f;

////var a;
////var /*3*/r3 = < <T>(x: <A>(y: A) => A) => T>a;

verify.quickInfos({
    1: "var r: <T>(x: T) => T",
    2: "var r2: <T>(x: T) => T",
    3: "var r3: <T>(x: <A>(y: A) => A) => T"
});
