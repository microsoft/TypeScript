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
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObservableValue = void 0;
function notifyListeners(listenable, change) {
}
var ObservableValue = /** @class */ (function () {
    function ObservableValue(value) {
        this.value = value;
        this.changeListeners = [];
        var newValue = value;
        var oldValue = null;
        notifyListeners(this, {
            type: "update",
            object: this,
            newValue: newValue,
            oldValue: oldValue
        });
    }
    ObservableValue.prototype.observe = function (handler, fireImmediately) { };
    return ObservableValue;
}());
exports.ObservableValue = ObservableValue;
