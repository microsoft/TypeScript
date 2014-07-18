/// <reference path='references.ts' />

module TypeScript {
    export interface Iterator<T> {
        moveNext(): boolean;
        current(): T;
    }
}