// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/63270

type Recur<T> =
    (T extends  (unknown[]) ? {} : { [K in keyof T]?: Recur<T[K]>}) |
    [...Recur<T>[number][]];

function join<T>(l: Recur<T>[]): Recur<T> {
    return ['marker', ...l];
}

function a<T>(l: Recur<T>[]): void {
    const x: Recur<T> | undefined = join(l);
}
