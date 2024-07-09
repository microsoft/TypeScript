// some complex cases of assignment compat of generic signatures that stress contextual signature instantiation

interface I<T, S> {
    <U>(f: (x: T) => (y: S) => U): U
}

var g: <T>(x: T) => <S>(y: S) => I<T, S>
var h: <T>(x: T) => <S>(y: S) => { <U>(f: (x: T) => (y: S) => U): U }

g = h // ok