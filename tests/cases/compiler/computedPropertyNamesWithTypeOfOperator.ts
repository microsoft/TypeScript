interface SymbolConstructor {
  observable: symbol;
}

type Observer<T> = (x: T) => void;

interface Observable<T> {
  subscribe(observer: Observer<T>): { unsubscribe(): void }
}

declare function from1<T>(obj: { [typeof Symbol.observable](): Observable<T> }): Observable<T>;
//                               ^^^^^^ Look at this use of 'typeof'.
declare function from2<T>(obj: { [Symbol.observable](): Observable<T> }): Observable<T>;
