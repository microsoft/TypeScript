// @strict: true

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