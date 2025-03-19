//// [tests/cases/compiler/classVarianceResolveCircularity1.ts] ////

//// [classVarianceResolveCircularity1.ts]
// Issue #52813

class Bar<T> {
    num!: number;
    Value = callme(this).num;
    Field: number = callme(this).num;
}
declare function callme(x: Bar<any>): Bar<any>;
declare function callme(x: object): string;

//// [classVarianceResolveCircularity1.js]
// Issue #52813
class Bar {
    num;
    Value = callme(this).num;
    Field = callme(this).num;
}
