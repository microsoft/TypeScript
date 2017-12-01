type Mapper<T, U> = (x: T) => U;

declare function wrap<T, U>(cb: Mapper<T, U>): Mapper<T, U>;

declare function arrayize<T, U>(cb: Mapper<T, U>): Mapper<T, U[]>;

declare function combine<A, B, C>(f: (x: A) => B, g: (x: B) => C): (x: A) => C;

declare function foo(f: Mapper<string, number>): void;

let f1: Mapper<string, number> = s => s.length;
let f2: Mapper<string, number> = wrap(s => s.length);
let f3: Mapper<string, number[]> = arrayize(wrap(s => s.length));
let f4: Mapper<string, boolean> = combine(wrap(s => s.length), wrap(n => n >= 10));

foo(wrap(s => s.length));

let a1 = ["a", "b"].map(s => s.length);
let a2 = ["a", "b"].map(wrap(s => s.length));
let a3 = ["a", "b"].map(wrap(arrayize(s => s.length)));
let a4 = ["a", "b"].map(combine(wrap(s => s.length), wrap(n => n > 10)));
let a5 = ["a", "b"].map(combine(identity, wrap(s => s.length)));
let a6 = ["a", "b"].map(combine(wrap(s => s.length), identity));

// This is a contrived class. We could do the same thing with Observables, etc.
class SetOf<A> {
  _store: A[];

  add(a: A) {
    this._store.push(a);
  }

  transform<B>(transformer: (a: SetOf<A>) => SetOf<B>): SetOf<B> {
    return transformer(this);
  }

  forEach(fn: (a: A, index: number) => void) {
      this._store.forEach((a, i) => fn(a, i));
  }
}

function compose<A, B, C, D, E>(
  fnA: (a: SetOf<A>) => SetOf<B>, 
  fnB: (b: SetOf<B>) => SetOf<C>, 
  fnC: (c: SetOf<C>) => SetOf<D>,
  fnD: (c: SetOf<D>) => SetOf<E>,
):(x: SetOf<A>) => SetOf<E>;
/* ... etc ... */
function compose<T>(...fns: ((x: T) => T)[]): (x: T) => T {
  return (x: T) => fns.reduce((prev, fn) => fn(prev), x);
}

function map<A, B>(fn: (a: A) => B): (s: SetOf<A>) => SetOf<B> {
  return (a: SetOf<A>) => {
    const b: SetOf<B> = new SetOf();
    a.forEach(x => b.add(fn(x)));
    return b;
  }
}

function filter<A>(predicate: (a: A) => boolean): (s: SetOf<A>) => SetOf<A> {
  return (a: SetOf<A>) => {
    const result = new SetOf<A>();
    a.forEach(x => {
      if (predicate(x)) result.add(x);
    });
   return result;
  }
}

const testSet = new SetOf<number>();
testSet.add(1);
testSet.add(2);
testSet.add(3);

const t1 = testSet.transform(
  compose(
    filter(x => x % 1 === 0),
    map(x => x + x),
    map(x => x + '!!!'),
    map(x => x.toUpperCase())
  )
)

declare function identity<T>(x: T): T;

const t2 = testSet.transform(
  compose(
    filter(x => x % 1 === 0),
    identity,
    map(x => x + '!!!'),
    map(x => x.toUpperCase())
  )
)
