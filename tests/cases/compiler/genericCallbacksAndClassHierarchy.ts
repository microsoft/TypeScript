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