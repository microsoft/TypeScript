//// [tests/cases/compiler/genericCallbacksAndClassHierarchy.ts] ////

//// [genericCallbacksAndClassHierarchy.ts]
module M {
    export interface I<T> {
        subscribe(callback: (newValue: T) => void ): any;
    }
    export class C1<T> {
        public value: I<T>;
    }
    export class A<T> {
        public dummy: any;
    }
    export class B<T> extends C1<A<T>> { }
    export class D<T> {
        _subscribe(viewModel: B<T>): void {
            var f = (newValue: A<T>) => { };

            var v: I<A<T>> = viewModel.value;

            // both of these should work
            v.subscribe(f);
            v.subscribe((newValue: A<T>) => { });
        }
    }
}

//// [genericCallbacksAndClassHierarchy.js]
var M;
(function (M) {
    class C1 {
        value;
    }
    M.C1 = C1;
    class A {
        dummy;
    }
    M.A = A;
    class B extends C1 {
    }
    M.B = B;
    class D {
        _subscribe(viewModel) {
            var f = (newValue) => { };
            var v = viewModel.value;
            v.subscribe(f);
            v.subscribe((newValue) => { });
        }
    }
    M.D = D;
})(M || (M = {}));
