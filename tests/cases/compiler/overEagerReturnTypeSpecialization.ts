//Note: Below simpler repro

interface I1<T> {
    func<U>(callback: (value: T) => U): I1<U>;
}
 
declare var v1: I1<number>;
var r1: I1<string> = v1.func(num => num.toString()) // Correctly returns an I1<string>
           .func(str => str.length);    // should error

var r2: I1<number> = v1.func(num => num.toString()) // Correctly returns an I1<string>
           .func(str => str.length);    // should be ok 
 
 