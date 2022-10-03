class clodule<T> {
    id: string;
    value: T;

    static fn<U>(id: U) { }
}

module clodule {
    // error: duplicate identifier expected
    export function fn<T>(x: T, y: T): T {
        return x;
    }
}

