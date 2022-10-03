//// [checkInfiniteExpansionTermination2.ts]
// Regression test for #1002
// Before fix this code would cause infinite loop

interface IObservable<T> {
    n: IObservable<T[]>;
}
interface ISubject<T> extends IObservable<T> { }

declare function combineLatest<TOther>(x: IObservable<TOther>[]): void;
declare function combineLatest(): void;

function fn<T>() {
    var values: ISubject<any>[] = [];
    // Hang when using <T>, but not <any>
    combineLatest<T>(values);
}


//// [checkInfiniteExpansionTermination2.js]
// Regression test for #1002
// Before fix this code would cause infinite loop
function fn() {
    var values = [];
    // Hang when using <T>, but not <any>
    combineLatest(values);
}
