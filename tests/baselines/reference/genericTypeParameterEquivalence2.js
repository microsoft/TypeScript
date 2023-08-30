//// [tests/cases/compiler/genericTypeParameterEquivalence2.ts] ////

//// [genericTypeParameterEquivalence2.ts]
// compose :: (b->c) -> (a->b) -> (a->c)
function compose<A, B, C>(f: (b: B) => C, g: (a:A) => B): (a:A) => C {
    return function (a:A) : C {
        return f(g.apply(null, a));
    };
}

// forEach :: [a] -> (a -> ()) -> ()
function forEach<A>(list: A[], f: (a: A, n?: number) => void ): void {
    for (var i = 0; i < list.length; ++i) {
        f(list[i], i);
    }
}

// filter :: (a->bool) -> [a] -> [a]
function filter<A>(f: (a: A) => boolean, ar: A[]): A[] {
    var ret = [];
    forEach(ar, (el) => {
        if (f(el)) {
            ret.push(el);
        }
    } );

    return ret;
}

// length :: [a] -> Num
function length2<A>(ar: A[]): number {
    return ar.length;
}

// curry1 :: ((a,b)->c) -> (a->(b->c))
function curry1<A, B, C>(f: (a: A, b: B) => C): (ax: A) => (bx: B) => C {
    return function (ay: A) {
        return function (by: B) {
            return f(ay, by);
        };
    };
}

var cfilter = curry1(filter);

// compose :: (b->c) -> (a->b) -> (a->c)
// length :: [a] -> Num
// cfilter :: {} -> {} -> [{}]
// pred :: a -> Bool 
// cfilter(pred) :: {} -> [{}]
// length2 :: [a] -> Num
// countWhere :: (a -> Bool) -> [a] -> Num

function countWhere_1<A>(pred: (a: A) => boolean): (a: A[]) => number {
    return compose(length2, cfilter(pred));
}

function countWhere_2<A>(pred: (a: A) => boolean): (a: A[]) => number {
    var where = cfilter(pred);
    return compose(length2, where);
}

//// [genericTypeParameterEquivalence2.js]
// compose :: (b->c) -> (a->b) -> (a->c)
function compose(f, g) {
    return function (a) {
        return f(g.apply(null, a));
    };
}
// forEach :: [a] -> (a -> ()) -> ()
function forEach(list, f) {
    for (var i = 0; i < list.length; ++i) {
        f(list[i], i);
    }
}
// filter :: (a->bool) -> [a] -> [a]
function filter(f, ar) {
    var ret = [];
    forEach(ar, function (el) {
        if (f(el)) {
            ret.push(el);
        }
    });
    return ret;
}
// length :: [a] -> Num
function length2(ar) {
    return ar.length;
}
// curry1 :: ((a,b)->c) -> (a->(b->c))
function curry1(f) {
    return function (ay) {
        return function (by) {
            return f(ay, by);
        };
    };
}
var cfilter = curry1(filter);
// compose :: (b->c) -> (a->b) -> (a->c)
// length :: [a] -> Num
// cfilter :: {} -> {} -> [{}]
// pred :: a -> Bool 
// cfilter(pred) :: {} -> [{}]
// length2 :: [a] -> Num
// countWhere :: (a -> Bool) -> [a] -> Num
function countWhere_1(pred) {
    return compose(length2, cfilter(pred));
}
function countWhere_2(pred) {
    var where = cfilter(pred);
    return compose(length2, where);
}
