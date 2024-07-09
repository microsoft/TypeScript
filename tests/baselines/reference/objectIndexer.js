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
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Emitter = /** @class */ (function () {
        function Emitter() {
            this.listeners = {};
        }
        return Emitter;
    }());
});
