// two interfaces with different root modules should not merge

module M {
    export interface A {
        foo: string;
    }

    export interface B<T> {
        foo: T;
    }
}

module M2 {
    export interface A {
        bar: number;
    }

    var a: A;
    var r1 = a.foo; // error
    var r2 = a.bar; 

    export interface B<T> {
        bar: T;
    }

    var b: B<string>;
    var r3 = b.foo; // error
    var r4 = b.bar; 
}