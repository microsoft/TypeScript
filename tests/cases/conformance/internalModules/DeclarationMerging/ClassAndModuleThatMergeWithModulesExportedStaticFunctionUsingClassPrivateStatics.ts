class clodule<T> {
    id: string;
    value: T;

    private static sfn(id: string) { return 42; }
}

module clodule {
    // error: duplicate identifier expected
    export function fn<T>(x: T, y: T): number {
        return clodule.sfn('a');
    }
}

