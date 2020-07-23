interface WeakRef<T extends object> {
    readonly [Symbol.toStringTag]: "WeakRef";

    /**
     * Returns the WeakRef instance's target object, or undefined if the target object has been
     * reclaimed.
     */
    deref(): T | undefined;
}

interface WeakRefConstructor {
    readonly prototype: WeakRef<any>;

    /**
     * Creates a WeakRef instance for the given target object.
     * @param target The target object for the WeakRef instance.
     */
    new<T extends object>(target?: T): WeakRef<T>;
}

declare var WeakRef: WeakRefConstructor;

interface FinalizationRegistry {
    readonly [Symbol.toStringTag]: "FinalizationRegistry";

    /**
     * Registers an object with the registry.
     * @param target The target object to register.
     * @param heldValue The value to pass to the finalizer for this object. This cannot be the
     * target object.
     * @param unregisterToken The token to pass to the unregister method to unregister the target
     * object. If provided (and not undefined), this must be an object. If not provided, the target
     * cannot be unregistered.
     */
    register(target: object, heldValue: any, unregisterToken?: object): void;

    /**
     * Unregisters an object from the registry.
     * @param unregisterToken The token that was used as the unregisterToken argument when calling
     * register to register the target object.
     */
    unregister(unregisterToken: object): void;
}

interface FinalizationRegistryConstructor {
    readonly prototype: FinalizationRegistry;

    /**
     * Creates a finalization registry with an associated cleanup callback
     * @param cleanupCallback The callback to call after an object in the registry has been reclaimed.
     */
    new(cleanupCallback: (heldValue: any) => void): FinalizationRegistry;
}

declare var FinalizationRegistry: FinalizationRegistryConstructor;
