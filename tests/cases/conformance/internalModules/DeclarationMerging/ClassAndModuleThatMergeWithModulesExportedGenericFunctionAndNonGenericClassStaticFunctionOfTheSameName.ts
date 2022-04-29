class clodule<T> {
    id: string;
    value: T;

    static fn(id: string) { }
}

module clodule {
    // error: duplicate identifier expected
    export function fn<T>(x: T, y: T): T {
        return x;
    }
}

