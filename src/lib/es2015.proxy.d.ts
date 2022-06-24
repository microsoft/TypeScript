interface ProxyHandler<T extends object> {
    /**
     * A trap method for a function call.
     * @param target The target callable object.
     * @param thisArg The `this` argument for the call.
     * @param argArray The list of arguments for rthe call
     */
    apply?(target: T, thisArg: any, argArray: any[]): any;

    /**
     * A trap for the `new` operator.
     * @param target The target object.
     * @param argArray The list of arguments for the constructor.
     * @param newTarget The constructor that was originally called.
     */
    construct?(target: T, argArray: any[], newTarget: Function): object;

    /**
     * A trap for `Object.defineProperty()`.
     * @param target The target object.
     * @param p The name or `Symbol` of the property whose description is to be retrieved.
     * @param attributes The descriptor for the property being defined or modified.
     * @returns A `Boolean` indicating whether or not the property has been defined.
     */
    defineProperty?(target: T, p: string | symbol, attributes: PropertyDescriptor): boolean;

    /**
     * A trap for the `delete` operator.
     * @param target The target object.
     * @param p The name or `Symbol` of the property to delete.
     * @returns A `Boolean` indicating whether or not the property was deleted.
     */
    deleteProperty?(target: T, p: string | symbol): boolean;

    /**
     * A trap for getting a property value.
     * @param target The target object.
     * @param p The name or `Symbol` of the property to get.
     * @param receiver The proxy or an object that inherits from the proxy.
     */
    get?(target: T, p: string | symbol, receiver: any): any;

    /**
     * A trap for `Object.getOwnPropertyDescriptor()`.
     * @param target The target object.
     * @param p The name of the property whose description should be retrieved.
     */
    getOwnPropertyDescriptor?(target: T, p: string | symbol): PropertyDescriptor | undefined;
    
    /**
     * A trap for the `[[GetPrototypeOf]]` internal method.
     * @param target The target object.
     */
    getPrototypeOf?(target: T): object | null;

    /**
     * A trap for the `in` operator.
     * @param target The target object.
     * @param p The name or `Symbol` of the property to check for existence.
     */
    has?(target: T, p: string | symbol): boolean;

    /**
     * A trap for `Object.isExtensible()`.
     * @param target The target object.
     */
    isExtensible?(target: T): boolean;

    /**
     * A trap for `Reflect.ownKeys()`.
     * @param target The target object.
     */
    ownKeys?(target: T): ArrayLike<string | symbol>;

    /**
     * A trap for `Object.preventExtensions()`.
     * @param target The target object.
     */
    preventExtensions?(target: T): boolean;

    /**
     * A trap for setting a property value.
     * @param target The target object.
     * @param p The name or `Symbol` of the property to set.
     * @param value The new value of the property to set.
     * @param receiver The object to which the assignment was originally directed.
     * @returns `A `Boolean` indicating whether or not the property was set.
     */
    set?(target: T, p: string | symbol, value: any, receiver: any): boolean;

    /**
     * A trap for `Object.setPrototypeOf()`.
     * @param target The target object.
     * @param v The object's new prototype or `null`.
     */
    setPrototypeOf?(target: T, v: object | null): boolean;
}

interface ProxyConstructor {
    /**
     * Creates a revocable Proxy object.
     * @param target A target object to wrap with Proxy.
     * @param handler An object whose properties define the behavior of Proxy when an operation is attempted on it.
     */
    revocable<T extends object>(target: T, handler: ProxyHandler<T>): { proxy: T; revoke: () => void; };

    /**
     * Creates a Proxy object.
     * @param target A target object to wrap with Proxy.
     * @param handler An object whose properties define the behavior of Proxy when an operation is attempted on it.
     */
    new <T extends object>(target: T, handler: ProxyHandler<T>): T;
}
declare var Proxy: ProxyConstructor;
