//// [twoGenericInterfacesDifferingByTypeParameterName.ts]
// type parameter names are relevant when choosing whether to merge interface declarations

interface A<T> {
    x: T;
}

interface A<U> { // error
    y: U;
}

interface B<T,U> {
    x: U;
}

interface B<T,V> { // error
    y: V;
}

module M {
    interface A<T> {
        x: T;
    }

    interface A<U> { // error
        y: U;
    }

    interface B<T, U> {
        x: U;
    }

    interface B<T, V> { // error
        y: V;
    }
}

module M2 {
    interface B<T, U> {
        x: U;
    }
}

module M2 {
    interface B<T, V> { // ok, different declaration space than other M2
        y: V;
    }
}

module M3 {
    export interface B<T, U> {
        x: U;
    }
}

module M3 {
    export interface B<T, V> { // error
        y: V;
    }
}



//// [twoGenericInterfacesDifferingByTypeParameterName.js]
// type parameter names are relevant when choosing whether to merge interface declarations
