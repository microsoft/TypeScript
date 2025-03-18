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
class Bug {
    values;
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
