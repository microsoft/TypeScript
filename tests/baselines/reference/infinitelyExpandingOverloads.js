//// [tests/cases/compiler/infinitelyExpandingOverloads.ts] ////

//// [infinitelyExpandingOverloads.ts]
interface KnockoutSubscription2<T> {
    target: KnockoutObservableBase2<T>;
}
interface KnockoutObservableBase2<T> {
    subscribe(callback: (newValue: T) => void, target?: any, topic?: string): KnockoutSubscription2<T>;
}
interface ValidationPlacement2<TValue> {
    initialize(validatable: Validatable2<TValue>): void;
}
interface Validatable2<TValue> {
    validators: KnockoutObservableBase2<Validator2<TValue>>;
}
class Validator2<TValue> {
    private _subscription: KnockoutSubscription2<TValue>;
}
class ViewModel<TValue> {
    public validationPlacements: Array<ValidationPlacement2<TValue>> = new Array<ValidationPlacement2<TValue>>();
}
class Widget<TValue> {
    constructor(viewModelType: new () => ViewModel<TValue>); // Shouldnt error on this overload
    constructor(viewModelType: new () => ViewModel<TValue>) {
    }
    public get options(): ViewModel<TValue> {
        return null;
    }
}

//// [infinitelyExpandingOverloads.js]
var Validator2 = /** @class */ (function () {
    function Validator2() {
    }
    return Validator2;
}());
var ViewModel = /** @class */ (function () {
    function ViewModel() {
        this.validationPlacements = new Array();
    }
    return ViewModel;
}());
var Widget = /** @class */ (function () {
    function Widget(viewModelType) {
    }
    Object.defineProperty(Widget.prototype, "options", {
        get: function () {
            return null;
        },
        enumerable: false,
        configurable: true
    });
    return Widget;
}());
