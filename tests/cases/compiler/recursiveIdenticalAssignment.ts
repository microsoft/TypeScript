interface A<T> {
    x: A<T>
}

interface B<T extends B<B<T>>> { // error, constraint referencing itself
    x: B<T>
}

var a: A<A<any>>
var b: B<B<any>> = a // Error, any does not satisfy constraint B<B<T>>
