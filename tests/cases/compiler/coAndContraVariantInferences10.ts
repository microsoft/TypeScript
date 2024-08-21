// @strict: true
// @noEmit: true

// based on https://github.com/microsoft/TypeScript/issues/59656

interface Observable<T> {
  pipe: <A>(op: (source: Observable<T>) => Observable<A>) => Observable<A>;
  _v: T;
}
declare function tap<T>(
  next: (value: T) => void,
): (source: Observable<T>) => Observable<T>;

declare const obs1: Observable<{
  prop?: string;
}>;
function test1(): Observable<{}> {
  return obs1.pipe(tap((arg) => {}));
}

declare const obs2: Observable<{
  prop: string;
}>;
function test2(): Observable<{}> {
  return obs2.pipe(tap((arg) => {}));
}

declare const obs3: Observable<{
  prop: string;
  prop2?: number;
}>;
function test3(): Observable<{}> {
  return obs3.pipe(tap((arg) => {}));
}

declare const obs4: Observable<{
  prop?: string;
  prop2?: number;
}>;
function test4(): Observable<{ prop?: string }> {
  return obs4.pipe(tap((arg) => {}));
}

declare const obs5: Observable<{
  prop: string;
  prop2?: number;
}>;
function test5(): Observable<{ prop: string }> {
  return obs5.pipe(tap((arg) => {}));
}

declare const obs6: Observable<{
  prop: string;
  prop2?: number;
}>;
function test6(): Observable<{ prop2?: number }> {
  return obs6.pipe(tap((arg) => {}));
}

declare const obs7: Observable<{
  prop?: string;
}>;
function test7(): Observable<any> {
  return obs7.pipe(tap((arg) => {}));
}

declare const obs8: Observable<{
  prop?: string;
}>;
function test8(): Observable<unknown> {
  return obs8.pipe(tap((arg) => {}));
}
