//// [tests/cases/conformance/types/typeParameters/typeArgumentLists/wrappedAndRecursiveConstraints3.ts] ////

//// [wrappedAndRecursiveConstraints3.ts]
// no errors expected

class C<T extends { length: number }> {
    constructor(x: T) { }
    foo<U extends T>(x: U) {
        function bar<V extends U>(x: V) {
            return x;
        }
        return bar;
    }
}

var c = new C({ length: 2 });
var r = c.foo({ length: 3, charAt: (x: number) => { '' } });
var r2 = r('');

//// [wrappedAndRecursiveConstraints3.js]
class C {
    constructor(x) { }
    foo(x) {
        function bar(x) {
            return x;
        }
        return bar;
    }
}
var c = new C({ length: 2 });
var r = c.foo({ length: 3, charAt: (x) => {
        '';
        '';
    } });
var r2 = r('');
