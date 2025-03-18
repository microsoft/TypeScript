//// [tests/cases/compiler/genericClassPropertyInheritanceSpecialization.ts] ////

//// [genericClassPropertyInheritanceSpecialization.ts]
interface KnockoutObservableBase<T> {
    peek(): T;
    (): T;
    (value: T): void;
}

interface KnockoutObservable<T> extends KnockoutObservableBase<T> {
    equalityComparer(a: T, b: T): boolean;
    valueHasMutated(): void;
    valueWillMutate(): void;
}

interface KnockoutObservableArray<T> extends KnockoutObservable<T[]> {
    indexOf(searchElement: T, fromIndex?: number): number;
    slice(start: number, end?: number): T[];
    splice(start: number, deleteCount?: number, ...items: T[]): T[];
    pop(): T;
    push(...items: T[]): void;
    shift(): T;
    unshift(...items: T[]): number;
    reverse(): T[];
    sort(compareFunction?: (a: T, b: T) => number): void;
    replace(oldItem: T, newItem: T): void;
    remove(item: T): T[];
    removeAll(items?: T[]): T[];
    destroy(item: T): void;
    destroyAll(items?: T[]): void;
}

interface KnockoutObservableArrayStatic {
    fn: KnockoutObservableArray<any>;

    <T>(value?: T[]): KnockoutObservableArray<T>;
}

declare module ko {
    export var observableArray: KnockoutObservableArrayStatic;
}

module Portal.Controls.Validators {

    export class Validator<TValue> {
        private _subscription;
        public message: KnockoutObservable<string>;
        public validationState: KnockoutObservable<number>;
        public validate: KnockoutObservable<TValue>;
        constructor(message?: string) { }
        public destroy(): void { }
        public _validate(value: TValue): number {return 0 }
    }
}

module PortalFx.ViewModels.Controls.Validators {

    export class Validator<TValue> extends Portal.Controls.Validators.Validator<TValue> {

        constructor(message?: string) {
            super(message);
        }
    }

}

interface Contract<TValue> {

    validators: KnockoutObservableArray<PortalFx.ViewModels.Controls.Validators.Validator<TValue>>;
}


class ViewModel<TValue> implements Contract<TValue> {

    public validators: KnockoutObservableArray<PortalFx.ViewModels.Controls.Validators.Validator<TValue>> = ko.observableArray<PortalFx.ViewModels.Controls.Validators.Validator<TValue>>();
}



//// [genericClassPropertyInheritanceSpecialization.js]
var Portal;
(function (Portal) {
    let Controls;
    (function (Controls) {
        let Validators;
        (function (Validators) {
            class Validator {
                _subscription;
                message;
                validationState;
                validate;
                constructor(message) { }
                destroy() { }
                _validate(value) { return 0; }
            }
            Validators.Validator = Validator;
        })(Validators = Controls.Validators || (Controls.Validators = {}));
    })(Controls = Portal.Controls || (Portal.Controls = {}));
})(Portal || (Portal = {}));
var PortalFx;
(function (PortalFx) {
    let ViewModels;
    (function (ViewModels) {
        let Controls;
        (function (Controls) {
            let Validators;
            (function (Validators) {
                class Validator extends Portal.Controls.Validators.Validator {
                    constructor(message) {
                        super(message);
                    }
                }
                Validators.Validator = Validator;
            })(Validators = Controls.Validators || (Controls.Validators = {}));
        })(Controls = ViewModels.Controls || (ViewModels.Controls = {}));
    })(ViewModels = PortalFx.ViewModels || (PortalFx.ViewModels = {}));
})(PortalFx || (PortalFx = {}));
class ViewModel {
    validators = ko.observableArray();
}
