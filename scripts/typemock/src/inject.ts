/**
 * Temporarily injects a value into an object property
 */
export class Inject<T extends object, K extends keyof T> {
    private _target: T;
    private _key: K;
    private _value: any;
    private _originalValue: any;
    private _installed: boolean = false;

    /**
     * Temporarily injects a value into an object property
     * @param target The target object into which to inject a property
     * @param propertyKey The name of the property to inject
     * @param value The value to inject
     */
    constructor(target: T, propertyKey: K, value?: T[K]) {
        this._target = target;
        this._key = propertyKey;
        this._value = arguments.length === 2 ? target[propertyKey] : value;
    }

    public get target() {
        return this._target;
    }

    public get key() {
        return this._key;
    }

    public get injectedValue(): T[K] {
        return this._installed ? this.currentValue : this._value;
    }

    public set injectedValue(value: T[K]) {
        if (this._installed) {
            this._target[this._key] = value;
        }
        this._value = value;
    }

    public get originalValue(): T[K] {
        if (this._installed) {
            return this._originalValue;
        }
        else {
            return this.currentValue;
        }
    }

    public get currentValue(): T[K] {
        return this._target[this._key];
    }

    /**
     * Gets a value indicating whether the Stub is currently installed.
     */
    public get installed(): boolean {
        return this._installed;
    }

    /**
     * Installs the stub
     */
    public install(): void {
        if (this._installed) return;
        this._originalValue = this._target[this._key];
        this._target[this._key] = this._value;
        this._installed = true;
    }

    /**
     * Uninstalls the stub
     */
    public uninstall(): void {
        if (!this._installed) return;
        this._target[this._key] = this._originalValue;
        this._installed = false;
        this._originalValue = null;
    }

    public static exec<T extends object, K extends keyof T, V>(target: T, propertyKey: K, value: T[K], action: () => V) {
        const stub = new Inject<T, K>(target, propertyKey, value);
        return stub.exec(action);
    }

    /**
     * Executes `action` with the stub installed.
     */
    public exec<V>(action: () => V): V {
        if (this._installed) {
            return action();
        }
        try {
            this.install();
            return action();
        }
        finally {
            this.uninstall();
        }
    }
}

