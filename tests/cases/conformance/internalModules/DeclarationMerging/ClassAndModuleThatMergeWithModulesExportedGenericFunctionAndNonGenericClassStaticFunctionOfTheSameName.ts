class clodule<T> {
    id: string;
    value: T;

    static fn(id: string) { }
}

namespace clodule {
    // error: duplicate identifier expected
    export function fn<T>(x: T, y: T): T {
        return x;
    }
}

