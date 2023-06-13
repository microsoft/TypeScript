//// [tests/cases/compiler/specializeVarArgs1.ts] ////

//// [specializeVarArgs1.ts]
interface Observable<T>{ }

 

interface ObservableArray<T> extends Observable<T[]>

{

    push(...values: T[]);

}

 

function observableArray<T>(): ObservableArray<T> { return null;}

 

var a =  observableArray<string>();

a.push('Some Value');


//// [specializeVarArgs1.js]
function observableArray() { return null; }
var a = observableArray();
a.push('Some Value');
