/**
 * The decorator context types provided to class member decorators.
 */
type ClassMemberDecoratorContext =
    | ClassMethodDecoratorContext
    | ClassGetterDecoratorContext
    | ClassSetterDecoratorContext
    | ClassFieldDecoratorContext
    | ClassAccessorDecoratorContext
    ;

/**
 * The decorator context types provided to any decorator.
 */
type DecoratorContext =
    | ClassDecoratorContext
    | ClassMemberDecoratorContext
    ;

/**
 * Context provided to a class decorator.
 */
interface ClassDecoratorContext<
    Class extends abstract new (...args: any) => any = abstract new (...args: any) => any
> {
    /** The kind of element that was decorated. */
    readonly kind: "class";

    /** The name of the decorated class. */
    readonly name: string | undefined;

    /**
     * Adds a callback to be invoked after the class definition has been finalized.
     *
     * @example
     * ```ts
     * function customElement(name: string): ClassDecoratorFunction {
     *   return (target, { addInitializer }) => {
     *     addInitializer(function () {
     *       customElements.define(name, this);
     *     });
     *   }
     * }
     *
     * @customElement("my-element")
     * class MyElement {}
     * ```
     */
    addInitializer(initializer: (this: Class) => void): void;
}

/**
 * Describes the call signature of a generic function that can be used to decorate a class.
 * @param target The decorated class constructor.
 * @param context Additional context about the decorated class.
 * @returns A replacement class constructor, or `undefined`.
 */
type ClassDecoratorFunction<Overrides extends { name?: string | undefined } = {}> = <
    Class extends abstract new (...args: any) => any,
>(
    target: Class,
    context: ClassDecoratorContext<Class> & Overrides
) => Class | void;

/**
 * Context provided to a class method decorator.
 */
interface ClassMethodDecoratorContext<
    This = unknown,
    Value extends (this: This, ...args: any) => any = (this: This, ...args: any) => any,
> {
    /** The kind of class member that was decorated. */
    readonly kind: "method";

    /** The name of the decorated class member. */
    readonly name: string | symbol;

    /** A value indicating whether the class member is a static (`true`) or instance (`false`) member. */
    readonly static: boolean;

    /** A value indicating whether the class member has a private name. */
    readonly private: boolean;

    /** An object that can be used to access the current value of the class member at runtime. */
    readonly access: {
        /**
         * Gets the current value of the method from the provided receiver.
         *
         * @example
         * let fn = context.access.get.call(instance);
         */
        get(this: This): Value;
    };

    /**
     * Adds a callback to be invoked either before static initializers are run (when
     * decorating a `static` member), or before instance initializers are run (when
     * decorating a non-`static` member).
     *
     * @example
     * ```ts
     * const bound: ClassMethodDecoratorFunction = (value, { name, private: isPrivate, addInitializer }) {
     *   if (isPrivate) throw new TypeError("Not supported on private methods.");
     *   addInitializer(function () {
     *     this[name] = this[name].bind(this);
     *   });
     * }
     *
     * class C {
     *   message = "Hello";
     *
     *   @bound
     *   m() {
     *     console.log(this.message);
     *   }
     * }
     * ```
     */
    addInitializer(initializer: (this: This) => void): void;
}

/**
 * Describes a generic function that can be used to decorate a class method.
 * @param target The function for the decorated class method.
 * @param context Additional context about the decorated class method.
 * @returns A replacement function, or `undefined`.
 */
type ClassMethodDecoratorFunction<Overrides extends { name?: string | symbol, private?: boolean, static?: boolean } = {}> = <
    This,
    Value extends (this: This, ...args: any) => any
>(target: Value, context: ClassMethodDecoratorContext<This, Value> & Overrides) => Value | void;

/**
 * Context provided to a class `get` method decorator.
 */
interface ClassGetterDecoratorContext<
    This = unknown,
    Value = unknown,
> {
    /** The kind of class member that was decorated. */
    readonly kind: "getter";

    /** The name of the decorated class member. */
    readonly name: string | symbol;

    /** A value indicating whether the class member is a static (`true`) or instance (`false`) member. */
    readonly static: boolean;

    /** A value indicating whether the class member has a private name. */
    readonly private: boolean;

    /** An object that can be used to access the current value of the class member at runtime. */
    readonly access: {
        /**
         * Invokes the getter on the provided receiver.
         *
         * @example
         * let value = context.access.get.call(instance);
         */
        get(this: This): Value;
    };

    /**
     * Adds a callback to be invoked either before static initializers are run (when
     * decorating a `static` member), or before instance initializers are run (when
     * decorating a non-`static` member).
     */
    addInitializer(initializer: (this: This) => void): void;
}

/**
 * Describes a generic function that can be used to decorate a class `get` method.
 * @param target The getter function for the decorated class `get` method.
 * @param context Additional context about the decorated class `get` method.
 * @returns A replacement getter function, or `undefined`.
 */
type ClassGetterDecoratorFunction<Overrides extends { name?: string | symbol, private?: boolean, static?: boolean } = {}> = <
    This,
    Value,
>(
    target: (this: This) => Value,
    context: ClassGetterDecoratorContext<This, Value> & Overrides
) => ((this: This) => Value) | void;

/**
 * Context provided to a class `set` method decorator.
 */
interface ClassSetterDecoratorContext<
    This = unknown,
    Value = unknown,
> {
    /** The kind of class member that was decorated. */
    readonly kind: "setter";

    /** The name of the decorated class member. */
    readonly name: string | symbol;

    /** A value indicating whether the class member is a static (`true`) or instance (`false`) member. */
    readonly static: boolean;

    /** A value indicating whether the class member has a private name. */
    readonly private: boolean;

    /** An object that can be used to access the current value of the class member at runtime. */
    readonly access: {
        /**
         * Invokes the setter on the provided receiver.
         *
         * @example
         * context.access.set.call(instance, value);
         */
        set(this: This, value: Value): void;
    };

    /**
     * Adds a callback to be invoked either before static initializers are run (when
     * decorating a `static` member), or before instance initializers are run (when
     * decorating a non-`static` member).
     */
    addInitializer(initializer: (this: This) => void): void;
}

/**
 * Describes a generic function that can be used to decorate a class `set` method.
 * @param target The setter function for the decorated class `set` method.
 * @param context Additional context about the decorated class `set` method.
 * @returns A replacement setter function, or `undefined`.
 */
type ClassSetterDecoratorFunction<Overrides extends { name?: string | symbol, private?: boolean, static?: boolean } = {}> = <
    This,
    Value,
>(
    target: (this: This, value: Value) => void,
    context: ClassSetterDecoratorContext<This, Value> & Overrides
) => ((this: This, value: Value) => void) | void;

/**
 * Context provided to a class `accessor` field decorator.
 */
interface ClassAccessorDecoratorContext<
    This = unknown,
    Value = unknown,
> {
    /** The kind of class member that was decorated. */
    readonly kind: "accessor";

    /** The name of the decorated class member. */
    readonly name: string | symbol;

    /** A value indicating whether the class member is a static (`true`) or instance (`false`) member. */
    readonly static: boolean;

    /** A value indicating whether the class member has a private name. */
    readonly private: boolean;

    /** An object that can be used to access the current value of the class member at runtime. */
    readonly access: {
        /**
         * Invokes the getter on the provided receiver.
         *
         * @example
         * let value = context.access.get.call(instance);
         */
        get(this: This): Value;

        /**
         * Invokes the setter on the provided receiver.
         *
         * @example
         * context.access.set.call(instance, value);
         */
        set(this: This, value: Value): void;
    };

    /**
     * Adds a callback to be invoked either before static initializers are run (when
     * decorating a `static` member), or before instance initializers are run (when
     * decorating a non-`static` member).
     */
    addInitializer(initializer: (this: This) => void): void;
}

/**
 * Describes the target provided to class `accessor` field decorators.
 */
interface ClassAccessorDecoratorTarget<This, Value> {
    /**
     * Invokes the getter that was defined prior to decorator application.
     *
     * @example
     * let value = target.get.call(instance);
     */
    get(this: This): Value;

    /**
     * Invokes the setter that was defined prior to decorator application.
     *
     * @example
     * target.set.call(instance, value);
     */
    set(this: This, value: Value): void;
}

/**
 * Describes the allowed return value from a class `accessor` field decorator.
 */
interface ClassAccessorDecoratorResult<This, Value> {
    /**
     * An optional replacement getter function. If not provided, the existing getter function is used instead.
     */
    get?(this: This): Value;

    /**
     * An optional replacement setter function. If not provided, the existing setter function is used instead.
     */
    set?(this: This, value: Value): void;

    /**
     * An optional initializer mutator that is invoked when the underlying field initializer is evaluated.
     * @param value The incoming initializer value.
     * @returns The replacement initializer value.
     */
    init?(this: This, value: Value): Value;
}

/**
 * Describes a generic function that can be used to decorate a class `accessor` field.
 * @param target The {@link ClassAccessorDecoratorTarget} the decorated class `accessor` field.
 * @param context Additional context about the decorated class `accessor` field.
 * @returns A {@link ClassAccessorDecoratorResult} that is used to replace the getter or setter or to inject an initializer mutator, or `undefined` to use the existing getter and setter.
 */
type ClassAccessorDecoratorFunction<Overrides extends { name?: string | symbol, private?: boolean, static?: boolean } = {}> = <
    This,
    Value,
>(
    target: ClassAccessorDecoratorTarget<This, Value>,
    context: ClassAccessorDecoratorContext<This, Value> & Overrides
) => ClassAccessorDecoratorResult<This, Value> | void;

/**
 * Context provided to a class field decorator.
 */
interface ClassFieldDecoratorContext<
    This = unknown,
    Value = unknown,
> {
    /** The kind of class member that was decorated. */
    readonly kind: "field";

    /** The name of the decorated class member. */
    readonly name: string | symbol;

    /** A value indicating whether the class member is a static (`true`) or instance (`false`) member. */
    readonly static: boolean;

    /** A value indicating whether the class member has a private name. */
    readonly private: boolean;

    /** An object that can be used to access the current value of the class member at runtime. */
    readonly access: {
        /**
         * Gets the value of the field on the provided receiver.
         */
        get(this: This): Value;

        /**
         * Sets the value of the field on the provided receiver.
         */
        set(this: This, value: Value): void;
    };

    /**
     * Adds a callback to be invoked either before static initializers are run (when
     * decorating a `static` member), or before instance initializers are run (when
     * decorating a non-`static` member).
     */
    addInitializer(initializer: (this: This) => void): void;
}

/**
 * Describes a generic function that can be used to decorate a class field.
 * @param target Class field decorators always receive `undefined`.
 * @param context Additional context about the decorated class field.
 * @returns An initializer mutator function, or `undefined`.
 */
type ClassFieldDecoratorFunction<Overrides extends { name?: string | symbol, private?: boolean, static?: boolean } = {}> = <
    This,
    Value,
>(
    target: undefined,
    context: ClassFieldDecoratorContext<This, Value> & Overrides
) => ((this: This, initialValue: Value) => Value) | void;
