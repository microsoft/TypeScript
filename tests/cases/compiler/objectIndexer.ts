//@module: amd
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
