//// [tests/cases/compiler/augmentArray.ts] ////

//// [augmentArray.ts]
interface Array<T> {
    (): any[];
}

//// [augmentArray.js]
