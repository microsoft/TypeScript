//// [tests/cases/compiler/functionSubtypingOfVarArgs2.ts] ////

//// [functionSubtypingOfVarArgs2.ts]
class EventBase {
    private _listeners: { (...args: any[]): void; }[] = [];

    add(listener: (...args: any[]) => void): void {
        this._listeners.push(listener);
    }
}

class StringEvent extends EventBase {
    add(listener: (items: string, moreitems: number) => void ) {
        super.add(listener);
    }
}


//// [functionSubtypingOfVarArgs2.js]
class EventBase {
    _listeners = [];
    add(listener) {
        this._listeners.push(listener);
    }
}
class StringEvent extends EventBase {
    add(listener) {
        super.add(listener);
    }
}
