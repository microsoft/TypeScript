//// [tests/cases/compiler/noCrashOnThisTypeUsage.ts] ////

//// [noCrashOnThisTypeUsage.ts]
interface IListenable {
    changeListeners: Function[] | null
    observe(handler: (change: any, oldValue?: any) => void, fireImmediately?: boolean): void
}

function notifyListeners<T>(listenable: IListenable, change: T) {
}

export class ObservableValue<T> {
    constructor(
        public value: T
    ) {
        const newValue: T = value;
        const oldValue: any = null;
        notifyListeners(this, {
            type: "update",
            object: this,
            newValue,
            oldValue
        });
    }
    changeListeners: Function[] | null = [];
    observe(handler: (change: any, oldValue?: any) => void, fireImmediately?: boolean) {}
}

//// [noCrashOnThisTypeUsage.js]
function notifyListeners(listenable, change) {
}
export class ObservableValue {
    value;
    constructor(value) {
        this.value = value;
        const newValue = value;
        const oldValue = null;
        notifyListeners(this, {
            type: "update",
            object: this,
            newValue,
            oldValue
        });
    }
    changeListeners = [];
    observe(handler, fireImmediately) { }
}
