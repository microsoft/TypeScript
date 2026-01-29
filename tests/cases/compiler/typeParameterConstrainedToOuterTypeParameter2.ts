// @target: es2015
// @strict: false
interface A<T> {
    foo<U extends T>(x: A<A<U>>)
}

interface B<T> {
    foo<U extends T>(x: B<B<U>>)
}

var a: A<string>
var b: B<string> = a;