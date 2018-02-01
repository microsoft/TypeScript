"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Temporarily injects a value into an object property
 */
class Inject {
    /**
     * Temporarily injects a value into an object property
     * @param target The target object into which to inject a property
     * @param propertyKey The name of the property to inject
     * @param injectedValue The value to inject
     */
    constructor(target, propertyKey, injectedValue) {
        this._installed = false;
        this._target = target;
        this._key = propertyKey;
        this._injectedValue = arguments.length === 2 ? target[propertyKey] : injectedValue;
    }
    get target() {
        return this._target;
    }
    get key() {
        return this._key;
    }
    get injectedValue() {
        return this._injectedValue;
    }
    set injectedValue(value) {
        if (this._installed) {
            this._target[this._key] = value;
        }
        this._injectedValue = value;
    }
    get originalValue() {
        if (this._installed) {
            return this._originalValue;
        }
        else {
            return this.currentValue;
        }
    }
    get currentValue() {
        return this._target[this._key];
    }
    /**
     * Gets a value indicating whether `injectedValue` is currently installed.
     */
    get installed() {
        return this._installed;
    }
    /**
     * Installs `injectedValue`
     */
    install() {
        if (this._installed)
            return;
        this._originalValue = this._target[this._key];
        this._target[this._key] = this._injectedValue;
        this._installed = true;
    }
    /**
     * Uninstalls `injectedValue`
     */
    uninstall() {
        if (!this._installed)
            return;
        this._target[this._key] = this._originalValue;
        this._installed = false;
        this._originalValue = null;
    }
    /**
     * Executes `action` with `injectedValue` installed on `target`.
     */
    static exec(target, propertyKey, injectedValue, action) {
        const injector = new Inject(target, propertyKey, injectedValue);
        return injector.exec(action);
    }
    /**
     * Executes `action` with `injectedValue` installed.
     */
    exec(action) {
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
exports.Inject = Inject;

//# sourceMappingURL=inject.js.map
