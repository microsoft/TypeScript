interface Observable<T>{ }

 

interface ObservableArray<T> extends Observable<T[]>

{

    push(...values: T[]);

}

 

function observableArray<T>(): ObservableArray<T> { return null;}

 

var a =  observableArray<string>();

a.push('Some Value');
