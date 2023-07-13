//// [tests/cases/compiler/typeParameterConstrainedToOuterTypeParameter.ts] ////

//// [typeParameterConstrainedToOuterTypeParameter.ts]
interface A<T> {
    <U extends T>(x: U[])
}

interface B<T> {
    <U extends T>(x: U)
}

var a: A<string>
var b: B<string> = a; // assignment should be legal (both U's get instantiated to any for comparison)

//// [typeParameterConstrainedToOuterTypeParameter.js]
var a;
var b = a; // assignment should be legal (both U's get instantiated to any for comparison)
