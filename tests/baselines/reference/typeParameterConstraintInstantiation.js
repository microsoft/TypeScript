//// [tests/cases/compiler/typeParameterConstraintInstantiation.ts] ////

//// [typeParameterConstraintInstantiation.ts]
// Check that type parameter constraints are properly instantiated

interface Mapper<T> {
    map<U extends T, V extends U[]>(f: (item: T) => U): V;
}

var m: Mapper<string>;
var a = m.map((x: string) => x);  // string[]


//// [typeParameterConstraintInstantiation.js]
// Check that type parameter constraints are properly instantiated
var m;
var a = m.map(function (x) { return x; }); // string[]
