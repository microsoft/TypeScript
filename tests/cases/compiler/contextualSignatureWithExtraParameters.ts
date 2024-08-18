// https://github.com/microsoft/TypeScript/issues/59309
function f1(
    cb: ((item: number) => void) | ((item: number, extra: string) => void),
  ) {}
  
  f1((item) => {});

function f2<T>(
    arr: T[],
    cb: ((item: T) => void) | ((item: T, extra: unknown) => void),
  ) {}
  
f2([1, 2, 3], (item) => {});

export interface AsyncResultCallback<T, E = Error> {
    (err?: E | null, result?: T): void;
}

export interface AsyncResultIterator<T, R, E = Error> {
    (item: T, callback: AsyncResultCallback<R, E>): void;
}
export interface AsyncResultIteratorPromise<T, R> {
    (item: T): Promise<R>;
}

declare function mapLimit<T, R, E = Error>(
    arr: T[],
    limit: number,
    iterator:  AsyncResultIteratorPromise<T, R> | AsyncResultIterator<T, R, E>,
): Promise<R[]>;

mapLimit([1,2,3], 3, async (n) => {
    return n ** 2;
});