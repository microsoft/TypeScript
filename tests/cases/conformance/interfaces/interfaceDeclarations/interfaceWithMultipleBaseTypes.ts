// an interface may have multiple bases with properties of the same name as long as the interface's implementation satisfies all base type versions

interface Base1 {
    x: {
        a: string;
    }
}

interface Base2 {
    x: {
        b: string;
    }
}

interface Derived extends Base1, Base2 {
    x: {
        a: string; b: string;
    }
}

interface Derived2 extends Base1, Base2 { // error
    x: {
        a: string; b: number;
    }
}

module Generic {
    interface Base1<T> {
        x: {
            a: T;
        }
    }

    interface Base2<T> {
        x: {
            b: T;
        }
    }

    interface Derived<T> extends Base1<string>, Base2<number> {
        x: {
            a: string; b: number;
        }
    }

    interface Derived2<T, U> extends Base1<T>, Base2<U> {
        x: {
            a: T; b: U;
        }
    }

    interface Derived3<T> extends Base1<number>, Base2<number> { } // error

    interface Derived4<T> extends Base1<number>, Base2<number> { // error
        x: {
            a: T; b: T;
        }
    }

    interface Derived5<T> extends Base1<T>, Base2<T> { // error
        x: T;
    }
}