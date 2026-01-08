// @strict: true
// @lib: esnext
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/57905

export abstract class Storage {
    abstract get<T extends string>(): T | Promise<T>;
}

export abstract class SyncStorage extends Storage {
    abstract override get<T extends string>(): T;
}

export abstract class ASyncStorage extends Storage {
    abstract override get<T extends string>(): Promise<T>;
}
