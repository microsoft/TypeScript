//// [tests/cases/compiler/checkInfiniteExpansionTermination.ts] ////

//// [checkInfiniteExpansionTermination.ts]
// Regression test for #1002
// Before fix this code would cause infinite loop

interface IObservable<T> {
    n: IObservable<T[]>; // Needed, must be T[]
}

// Needed
interface ISubject<T> extends IObservable<T> { }

interface Foo { x }
interface Bar { y }

var values: IObservable<Foo>;
var values2: ISubject<Bar>;
values = values2;


//// [checkInfiniteExpansionTermination.js]
// Regression test for #1002
// Before fix this code would cause infinite loop
var values;
var values2;
values = values2;
