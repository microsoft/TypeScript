interface Base extends Derived2 { // error
    x: string;
}

interface Derived extends Base {
    y: string;
}

interface Derived2 extends Derived {
    z: string;
}

module Generic {
    interface Base<T> extends Derived2<T> { // error
        x: string;
    }

    interface Derived<T> extends Base<T> {
        y: string;
    }

    interface Derived2<T> extends Derived<T> {
        z: string;
    }
}