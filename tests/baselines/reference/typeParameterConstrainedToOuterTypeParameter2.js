//// [tests/cases/compiler/typeParameterConstrainedToOuterTypeParameter2.ts] ////

//// [typeParameterConstrainedToOuterTypeParameter2.ts]
interface A<T> {
    foo<U extends T>(x: A<A<U>>)
}

interface B<T> {
    foo<U extends T>(x: B<B<U>>)
}

var a: A<string>
var b: B<string> = a;

//// [typeParameterConstrainedToOuterTypeParameter2.js]
var a;
var b = a;
