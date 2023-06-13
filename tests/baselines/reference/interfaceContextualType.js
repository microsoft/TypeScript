//// [tests/cases/compiler/interfaceContextualType.ts] ////

//// [interfaceContextualType.ts]
export interface IOptions {
    italic?: boolean;
    bold?: boolean;
}
export interface IMap {
    [s: string]: IOptions;
}

class Bug {
    public values: IMap;
    ok() {
        this.values = {};
        this.values['comments'] = { italic: true };
    }
    shouldBeOK() {
        this.values = {
            comments: { italic: true }
        };
    }
}


//// [interfaceContextualType.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Bug = /** @class */ (function () {
    function Bug() {
    }
    Bug.prototype.ok = function () {
        this.values = {};
        this.values['comments'] = { italic: true };
    };
    Bug.prototype.shouldBeOK = function () {
        this.values = {
            comments: { italic: true }
        };
    };
    return Bug;
}());
