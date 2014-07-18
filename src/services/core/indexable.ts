///<reference path='references.ts'/>

module TypeScript {
    export interface IIndexable<T> {
        [s: string]: T;
    }
}