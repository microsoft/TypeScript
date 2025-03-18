//// [tests/cases/compiler/recursiveReverseMappedType.ts] ////

//// [recursiveReverseMappedType.ts]
// Repro from #38198

type Recur<T> = (
    T extends (unknown[]) ? {} : { [K in keyof T]?: Recur<T[K]> }
) | ['marker', ...Recur<T>[]];

function join<T>(l: Recur<T>[]): Recur<T> {
    return ['marker', ...l];
}

function a<T>(l: Recur<T>[]): void {
    const x: Recur<T> | undefined = join(l);
}


//// [recursiveReverseMappedType.js]
function join(l) {
    return ['marker', ...l];
}
function a(l) {
    const x = join(l);
}
