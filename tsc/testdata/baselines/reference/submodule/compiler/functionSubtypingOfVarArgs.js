//// [tests/cases/compiler/functionSubtypingOfVarArgs.ts] ////

//// [functionSubtypingOfVarArgs.ts]
class EventBase {
    private _listeners = [];

    add(listener: (...args: any[]) => void): void {
        this._listeners.push(listener);
    }
}

class StringEvent extends EventBase { // should work
    add(listener: (items: string) => void ) { // valid, items is subtype of args
        super.add(listener);
    }
}


//// [functionSubtypingOfVarArgs.js]
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
