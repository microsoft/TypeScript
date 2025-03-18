//// [tests/cases/conformance/types/typeParameters/typeParameterLists/typeParametersAvailableInNestedScope.ts] ////

//// [typeParametersAvailableInNestedScope.ts]
class C<T> {
    data: T;

    x = <U>(a: U) => {
        var y: T;
        return y;
    }

    foo() {
        function temp<U>(a: U) {
            var y: T;
            return y;
        }
        return temp(<T>null);
    }
}

var c = new C<number>();
c.data = c.x(null);
c.data = c.foo();


//// [typeParametersAvailableInNestedScope.js]
class C {
    data;
    x = (a) => {
        var y;
        return y;
    };
    foo() {
        function temp(a) {
            var y;
            return y;
        }
        return temp(null);
    }
}
var c = new C();
c.data = c.x(null);
c.data = c.foo();
