//// [inferFromGenericFunctionReturnTypes1.ts]
// Repro from #15680

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

testSet.transform(
  compose(
    filter(x => x % 1 === 0),
    map(x => x + x),
    map(x => x + '!!!'),
    map(x => x.toUpperCase())
  )
)

testSet.transform(
  compose(
    filter(x => x % 1 === 0),
    map(x => x + x),
    map(x => 123),  // Whoops a bug
    map(x => x.toUpperCase()) // causes an error!
  )
)


//// [inferFromGenericFunctionReturnTypes1.js]
// Repro from #15680
// This is a contrived class. We could do the same thing with Observables, etc.
var SetOf = /** @class */ (function () {
    function SetOf() {
    }
    SetOf.prototype.add = function (a) {
        this._store.push(a);
    };
    SetOf.prototype.transform = function (transformer) {
        return transformer(this);
    };
    SetOf.prototype.forEach = function (fn) {
        this._store.forEach(function (a, i) { return fn(a, i); });
    };
    return SetOf;
}());
/* ... etc ... */
function compose() {
    var fns = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        fns[_i] = arguments[_i];
    }
    return function (x) { return fns.reduce(function (prev, fn) { return fn(prev); }, x); };
}
function map(fn) {
    return function (a) {
        var b = new SetOf();
        a.forEach(function (x) { return b.add(fn(x)); });
        return b;
    };
}
function filter(predicate) {
    return function (a) {
        var result = new SetOf();
        a.forEach(function (x) {
            if (predicate(x))
                result.add(x);
        });
        return result;
    };
}
var testSet = new SetOf();
testSet.add(1);
testSet.add(2);
testSet.add(3);
testSet.transform(compose(filter(function (x) { return x % 1 === 0; }), map(function (x) { return x + x; }), map(function (x) { return x + '!!!'; }), map(function (x) { return x.toUpperCase(); })));
testSet.transform(compose(filter(function (x) { return x % 1 === 0; }), map(function (x) { return x + x; }), map(function (x) { return 123; }), // Whoops a bug
map(function (x) { return x.toUpperCase(); }) // causes an error!
));
