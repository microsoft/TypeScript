// @strict: true

// https://github.com/microsoft/TypeScript/issues/64892

export class C {
    m1<T>(
        item: T,
        callback: T extends string
            ? (item: T) => void
            : (item: T) => void
    ): void {
        callback(item);
        callback(item as T extends string ? T : T);
    }

    m2(
        item: string,
        callback?: (item: string) => void
    ): void;
    m2<T>(
        item: T,
        callback: (item: T) => void
    ): void;
    m2<T>(
        item: T,
        callback: T extends string
            ? ((item: T) => void) | undefined
            : (item: T) => void
    ): void {
        if (callback) {
            callback(item);
            callback(item as T extends string ? T : T);
        }
    }
}
