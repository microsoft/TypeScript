/**
 * Temporarily injects a value into an object property
 */
export declare class Inject<T extends object, K extends keyof T> {
    private _target;
    private _key;
    private _injectedValue;
    private _originalValue;
    private _installed;
    /**
     * Temporarily injects a value into an object property
     * @param target The target object into which to inject a property
     * @param propertyKey The name of the property to inject
     * @param injectedValue The value to inject
     */
    constructor(target: T, propertyKey: K, injectedValue?: T[K]);
    readonly target: T;
    readonly key: K;
    injectedValue: T[K];
    readonly originalValue: T[K];
    readonly currentValue: T[K];
    /**
     * Gets a value indicating whether `injectedValue` is currently installed.
     */
    readonly installed: boolean;
    /**
     * Installs `injectedValue`
     */
    install(): void;
    /**
     * Uninstalls `injectedValue`
     */
    uninstall(): void;
    /**
     * Executes `action` with `injectedValue` installed on `target`.
     */
    static exec<T extends object, K extends keyof T, V>(target: T, propertyKey: K, injectedValue: T[K], action: () => V): V;
    /**
     * Executes `action` with `injectedValue` installed.
     */
    exec<V>(action: () => V): V;
}
