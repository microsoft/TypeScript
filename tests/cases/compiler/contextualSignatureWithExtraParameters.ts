// @strict: true
// @target: esnext
// @lib: esnext
// @noEmit: true

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

function f3(
    cb: ((a: string, b?: string) => void) | ((a: string, ...rest: string[]) => void)
  ) {}
  
f3((a) => {});
f3((a, b) => {});

function f4(
    cb: ((a: string, b: string) => void) | ((a: string, ...rest: string[]) => void)
  ) {}
  
f4((a) => {});
f4((a, b) => {});

function f5(
    cb: ((a: string, b: string) => void) | ((...rest: string[]) => void)
  ) {}
  
f5((a) => {});
f5((a, b) => {});

function f6(
  cb: ((a: string) => string) | ((a: "a" | "b") => Promise<"a" | "b">)
) {}

f6(async (a) => a);

function f7(
  cb: ((a: string) => string) | ((a: number) => Generator<number, void, unknown>)
) {}

f7(function* generator(a) {yield 0});

function f8(
  cb: ((a: string) => string) | ((a: number) => AsyncGenerator<number, void, unknown>)
) {}

f8(async function* generator(a) {yield 0});

