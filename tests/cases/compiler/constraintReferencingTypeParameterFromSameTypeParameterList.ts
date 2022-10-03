// used to be valid, now an error to do this

interface IComparable<T> {
}
function f<T, I extends IComparable<T>>() {
}

interface I1<T, U extends I1<T, any>> { // Error, any does not satisfy the constraint I1<T, any>
}
interface I2<T, U extends T> {
}

interface I4<T, U extends () => T> {
}

// No error
interface I3<T, U extends string> {
    method1<X, Y extends T>();
}

function foo<T, U extends <V extends T>(v: V) => void>() {
}

