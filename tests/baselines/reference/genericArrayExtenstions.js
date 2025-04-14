//// [tests/cases/compiler/genericArrayExtenstions.ts] ////

//// [genericArrayExtenstions.ts]
export declare class ObservableArray<T> implements Array<T> { // MS.Entertainment.ObservableArray
concat<U extends T[]>(...items: U[]): T[];
concat(...items: T[]): T[];
}


//// [genericArrayExtenstions.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
