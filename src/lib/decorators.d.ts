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
 * @template Class The type of the decorated class associated with this context.
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
 * Describes a function that can be used to decorate a class.
 * @template Overrides Constrains the context to specific values for `name`.
 * @template Class The constructor type of the class.
 */
type ClassDecoratorFunction<
    Overrides extends { name?: string | undefined } = {},
    Class extends abstract new (...args: any) => any = abstract new (...args: any) => any
> =
    /**
     * Describes a function that can be used to decorate a class.
     * @param target The decorated class constructor.
     * @param context Additional context about the decorated class.
     * @returns A replacement class constructor, or `undefined`.
     */
    (
        target: Class,
        context: ClassDecoratorContext<Class> & Overrides
    ) => Class | void;

// NOTE: If decorators eventually support type mutation, we will use this definition instead:
// /**
//  * Describes a function that can be used to decorate a class.
//  * @template Overrides Constrains the context to specific values for `name`.
//  * @template In The input constructor type of the class.
//  * @template Out The output constructor type of the class.
//  * @template Final The final constructor type of the class.
//  * @remarks Decorators do not currently support type mutation, so `In`, `Out`, and `Final` should be the same type.
//  */
// type ClassDecoratorFunction<
//     Overrides extends { name?: string | undefined } = {},
//     In extends abstract new (...args: any) => any = abstract new (...args: any) => any,
//     Out extends In = In,
//     Final extends Out = Out,
// > =
//     /**
//      * Describes a function that can be used to decorate a class.
//      * @param target The decorated class constructor.
//      * @param context Additional context about the decorated class.
//      * @returns A replacement class constructor, or `undefined`.
//      */
//     (
//         target: In,
//         context: ClassDecoratorContext<Final> & Overrides
//     ) => Out | void;

/**
 * Context provided to a class method decorator.
 * @template This The type on which the class element will be defined. For a static class element, this will be
 * the type of the constructor. For a non-static class element, this will be the type of the instance.
 * @template Value The type of the decorated class method.
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
 * Describes a function that can be used to decorate a class method.
 * @template Overrides Constrains the context to specific values for `name`, `private`, and `static`.
 * @template This The `this` type of the decorated class element.
 * @template Value The function type of the class method.
 */
type ClassMethodDecoratorFunction<
    Overrides extends { name?: string | symbol, private?: boolean, static?: boolean } = {},
    This = unknown,
    Value extends (this: This, ...args: any) => any = (this: This, ...args: any) => any
> =
    /**
     * Describes a function that can be used to decorate a class method.
     * @param target The function for the decorated class method.
     * @param context Additional context about the decorated class method.
     * @returns A replacement function, or `undefined`.
     */
    (
        target: Value,
        context: ClassMethodDecoratorContext<This, Value> & Overrides
    ) => Value | void;

// NOTE: If decorators eventually support type mutation, we will use this definition instead:
// /**
//  * Describes a function that can be used to decorate a class method.
//  * @template Overrides Constrains the context to specific values for `name`, `private`, and `static`.
//  * @template This The final `this` type of the decorated class element.
//  * @template In The input function type of the class method.
//  * @template Out The output function type of the class method.
//  * @template Final The final function type of the class method.
//  * @remarks Decorators do not currently support type mutation, so `In`, `Out`, and `Final` should be the same type.
//  */
// type ClassMethodDecoratorFunction<
//     Overrides extends { name?: string | symbol, private?: boolean, static?: boolean } = {},
//     This = unknown,
//     In extends (this: This, ...args: any) => any = (this: This, ...args: any) => any,
//     Out extends In = In,
//     Final extends Out = Out,
// > =
//     /**
//      * Describes a function that can be used to decorate a class method.
//      * @param target The function for the decorated class method.
//      * @param context Additional context about the decorated class method.
//      * @returns A replacement function, or `undefined`.
//      */
//     (
//         target: In,
//         context: ClassMethodDecoratorContext<This, Final> & Overrides
//     ) => Out | void;

/**
 * Context provided to a class getter decorator.
 * @template This The type on which the class element will be defined. For a static class element, this will be
 * the type of the constructor. For a non-static class element, this will be the type of the instance.
 * @template Value The property type of the decorated class getter.
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
 * Describes a function that can be used to decorate a class getter.
 * @template Overrides Constrains the context to specific values for `name`, `private`, and `static`.
 * @template This The `this` type of the decorated class element.
 * @template Value The property type of the class getter.
 */
type ClassGetterDecoratorFunction<
    Overrides extends { name?: string | symbol, private?: boolean, static?: boolean } = {},
    This = unknown,
    Value = unknown,
> =
    /**
     * Describes a function that can be used to decorate a class getter.
     * @param target The getter function for the decorated class getter.
     * @param context Additional context about the decorated class getter.
     * @returns A replacement getter function, or `undefined`.
     */
    (
        target: (this: This) => Value,
        context: ClassGetterDecoratorContext<This, Value> & Overrides
    ) => ((this: This) => Value) | void;

// NOTE: If decorators eventually support type mutation, we will use this definition instead:
// /**
//  * Describes a function that can be used to decorate a class getter.
//  * @template Overrides Constrains the context to specific values for `name`, `private`, and `static`.
//  * @template This The final `this` type of the decorated class element.
//  * @template In The input property type of the class getter.
//  * @template Out The output property type of the class getter.
//  * @template Final The final property type of the class getter.
//  * @remarks Decorators do not currently support type mutation, so `In`, `Out`, and `Final` should be the same type.
//  */
// type ClassGetterDecoratorFunction<
//     Overrides extends { name?: string | symbol, private?: boolean, static?: boolean } = {},
//     This = unknown,
//     In = unknown,
//     Out extends In = In,
//     Final extends Out = Out,
// > =
//     /**
//      * Describes a function that can be used to decorate a class getter.
//      * @param target The getter function for the decorated class getter.
//      * @param context Additional context about the decorated class getter.
//      * @returns A replacement getter function, or `undefined`.
//      */
//     (
//         target: (this: This) => In,
//         context: ClassGetterDecoratorContext<This, Final> & Overrides
//     ) => ((this: This) => Out) | void;

/**
 * Context provided to a class setter decorator.
 * @template This The type on which the class element will be defined. For a static class element, this will be
 * the type of the constructor. For a non-static class element, this will be the type of the instance.
 * @template Value The type of the decorated class setter.
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
 * Describes a function that can be used to decorate a class setter.
 * @template Overrides Constrains the context to specific values for `name`, `private`, and `static`.
 * @template This The `this` type of the decorated class element.
 * @template Value The property type of the class setter.
 * @remarks Decorators do not currently support type mutation, so `In`, `Out`, and `Final` should be the same type.
 */
type ClassSetterDecoratorFunction<
    Overrides extends { name?: string | symbol, private?: boolean, static?: boolean } = {},
    This = unknown,
    Value = unknown,
> =
    /**
     * Describes a function that can be used to decorate a class setter.
     * @param target The setter function for the decorated class setter.
     * @param context Additional context about the decorated class setter.
     * @returns A replacement setter function, or `undefined`.
     */
    (
        target: (this: This, value: Value) => void,
        context: ClassSetterDecoratorContext<This, Value> & Overrides
    ) => ((this: This, value: Value) => void) | void;

// NOTE: If decorators eventually support type mutation, we will use this definition instead:
// /**
//  * Describes a function that can be used to decorate a class setter.
//  * @template Overrides Constrains the context to specific values for `name`, `private`, and `static`.
//  * @template This The final `this` type of the decorated class element.
//  * @template In The input property type of the class setter.
//  * @template Out The output property type of the class setter.
//  * @template Final The final property type of the class setter.
//  * @remarks Decorators do not currently support type mutation, so `In`, `Out`, and `Final` should be the same type.
//  */
// type ClassSetterDecoratorFunction<
//     Overrides extends { name?: string | symbol, private?: boolean, static?: boolean } = {},
//     This = unknown,
//     In = unknown,
//     Out extends In = In,
//     Final extends Out = Out,
// > =
//     /**
//      * Describes a function that can be used to decorate a class setter.
//      * @param target The setter function for the decorated class setter.
//      * @param context Additional context about the decorated class setter.
//      * @returns A replacement setter function, or `undefined`.
//      */
//     (
//         target: (this: This, value: In) => void,
//         context: ClassSetterDecoratorContext<This, Final> & Overrides
//     ) => ((this: This, value: Out) => void) | void;

/**
 * Context provided to a class `accessor` field decorator.
 * @template This The type on which the class element will be defined. For a static class element, this will be
 * the type of the constructor. For a non-static class element, this will be the type of the instance.
 * @template Value The type of decorated class field.
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
 * @template This The `this` type to which the target applies.
 * @template Value The property type for the class `accessor` field.
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
 * @template This The `this` type to which the target applies.
 * @template Value The property type for the class `accessor` field.
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
 * Describes a function that can be used to decorate a class `accessor` field.
 * @template Overrides Constrains the context to specific values for `name`, `private`, and `static`.
 * @template This The `this` type of the decorated class element.
 * @template Value The property type of the class `accessor` field.
 * @remarks Decorators do not currently support type mutation, so `In`, `Out`, and `Final` should be the same type.
 */
type ClassAccessorDecoratorFunction<
    Overrides extends { name?: string | symbol, private?: boolean, static?: boolean } = {},
    This = unknown,
    Value = unknown,
> =
    /**
     * Describes a function that can be used to decorate a class `accessor` field.
     * @param target The {@link ClassAccessorDecoratorTarget} the decorated class `accessor` field.
     * @param context Additional context about the decorated class `accessor` field.
     * @returns A {@link ClassAccessorDecoratorResult} that is used to replace the getter or setter or to inject an initializer mutator, or `undefined` to use the existing getter and setter.
     */
    (
        target: ClassAccessorDecoratorTarget<This, Value>,
        context: ClassAccessorDecoratorContext<This, Value> & Overrides
    ) => ClassAccessorDecoratorResult<This, Value> | void;

// NOTE: If decorators eventually support type mutation, we will use this definition instead:
// /**
//  * Describes a function that can be used to decorate a class `accessor` field.
//  * @template Overrides Constrains the context to specific values for `name`, `private`, and `static`.
//  * @template This The final `this` type of the decorated class element.
//  * @template In The input property type of the class `accessor` field.
//  * @template Out The output property type of the class `accessor` field.
//  * @template Final The final property type of the class `accessor` field.
//  * @remarks Decorators do not currently support type mutation, so `In`, `Out`, and `Final` should be the same type.
//  */
// type ClassAccessorDecoratorFunction<
//     Overrides extends { name?: string | symbol, private?: boolean, static?: boolean } = {},
//     This = unknown,
//     In = unknown,
//     Out extends In = In,
//     Final extends Out = Out,
// > =
//     /**
//      * Describes a function that can be used to decorate a class `accessor` field.
//      * @param target The {@link ClassAccessorDecoratorTarget} the decorated class `accessor` field.
//      * @param context Additional context about the decorated class `accessor` field.
//      * @returns A {@link ClassAccessorDecoratorResult} that is used to replace the getter or setter or to inject an initializer mutator, or `undefined` to use the existing getter and setter.
//      */
//     (
//         target: ClassAccessorDecoratorTarget<This, In>,
//         context: ClassAccessorDecoratorContext<This, Final> & Overrides
//     ) => ClassAccessorDecoratorResult<This, Out> | void;

/**
 * Context provided to a class field decorator.
 * @template This The type on which the class element will be defined. For a static class element, this will be
 * the type of the constructor. For a non-static class element, this will be the type of the instance.
 * @template Value The type of the decorated class field.
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
 * Describes a function that can be used to decorate a class field.
 * @template Overrides Constrains the context to specific values for `name`, `private`, and `static`.
 * @template This The `this` type of the decorated class element.
 * @template Value The property type of the class field.
 * @remarks Decorators do not currently support type mutation, so `In`, `Out`, and `Final` should be the same type.
 */
type ClassFieldDecoratorFunction<
    Overrides extends { name?: string | symbol, private?: boolean, static?: boolean } = {},
    This = unknown,
    Value = unknown,
> =
    /**
     * Describes a function that can be used to decorate a class field.
     * @param target Class field decorators always receive `undefined`.
     * @param context Additional context about the decorated class field.
     * @returns An initializer mutator function, or `undefined`.
     */
    (
        target: undefined,
        context: ClassFieldDecoratorContext<This, Value> & Overrides
    ) => ((this: This, initialValue: Value) => Value) | void;

// NOTE: If decorators eventually support type mutation, we will use this definition instead:
// /**
//  * Describes a function that can be used to decorate a class field.
//  * @template Overrides Constrains the context to specific values for `name`, `private`, and `static`.
//  * @template This The final `this` type of the decorated class element.
//  * @template In The input property type of the class field.
//  * @template Out The output property type of the class field.
//  * @template Final The final property type of the class field.
//  * @remarks Decorators do not currently support type mutation, so `In`, `Out`, and `Final` should be the same type.
//  */
// type ClassFieldDecoratorFunction<
//     Overrides extends { name?: string | symbol, private?: boolean, static?: boolean } = {},
//     This = unknown,
//     In = unknown,
//     Out extends In = In,
//     Final extends Out = Out,
// > =
//     /**
//      * Describes a function that can be used to decorate a class field.
//      * @param target Class field decorators always receive `undefined`.
//      * @param context Additional context about the decorated class field.
//      * @returns An initializer mutator function, or `undefined`.
//      */
//     (
//         target: undefined,
//         context: ClassFieldDecoratorContext<This, Final> & Overrides
//     ) => ((this: This, initialValue: In) => Out) | void;
