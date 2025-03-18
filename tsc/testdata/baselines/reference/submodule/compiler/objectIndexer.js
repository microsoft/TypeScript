//// [tests/cases/compiler/objectIndexer.ts] ////

//// [objectIndexer.ts]
export interface Callback {
    (value: any): void;
}

interface IMap {
    [s: string]: Callback;
}

class Emitter {
    private listeners: IMap;
    constructor () {
        this.listeners = {};
    }
}


//// [objectIndexer.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Emitter {
    listeners;
    constructor() {
        this.listeners = {};
    }
}
