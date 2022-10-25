type ClassMemberDecoratorContext =
    | ClassMethodDecoratorContext
    | ClassGetterDecoratorContext
    | ClassSetterDecoratorContext
    | ClassFieldDecoratorContext
    | ClassAccessorDecoratorContext
    ;

type DecoratorContext =
    | ClassDecoratorContext
    | ClassMemberDecoratorContext
    ;

/**
 * Context provided to a class decorator.
 */
interface ClassDecoratorContext<Class extends abstract new (...args: any) => any = abstract new (...args: any) => any> {
    readonly kind: "class";
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

// #region type ClassDecoratorFunction

/**
 * Describes a function that can be used to decorate a class.
 */
type ClassDecoratorFunction = <
    In extends abstract new (...args: any[]) => any,
    Out extends abstract new (...args: any[]) => any = In,
    Class extends abstract new (...args: any[]) => any = Out
>(target: In, context: ClassDecoratorContext<Class>) => Out | void;

// #endregion

/**
 * Context provided to a class method decorator.
 */
interface ClassMethodDecoratorContext<This = unknown, Value extends (this: This, ...args: any) => any = (this: This, ...args: any) => any> {
    readonly kind: "method";
    readonly name: string | symbol;
    readonly static: boolean;
    readonly private: boolean;
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

// #region type ClassMethodDecoratorFunction
/**
 * Describes a function that can be used to decorate a class method.
 */
type ClassMethodDecoratorFunction<Traits extends { name?: string | symbol, static?: boolean, private?: boolean } = {}> = <
    This,
    In extends (this: This, ...args: any[]) => any,
    Out extends (this: This, ...args: any[]) => any = In,
    Value extends (this: This, ...args: any[]) => any = Out
>(target: In, context: ClassMethodDecoratorContext<This, Value> & Readonly<Pick<Traits, "name" | "static" | "private">>) => Out | void;
// #endregion

/**
 * Context provided to a class `get` method decorator.
 */
interface ClassGetterDecoratorContext<This = unknown, Value = unknown> {
    readonly kind: "getter";
    readonly name: string | symbol;
    readonly static: boolean;
    readonly private: boolean;
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

// #region type ClassGetterDecoratorFunction
/**
 * Describes a function that can be used to decorate a class `get` method.
 */
type ClassGetterDecoratorFunction = <
    This,
    In,
    Out = In,
    Value = Out,
>(target: (this: This) => In, context: ClassGetterDecoratorContext<This, Value>) => ((this: This) => Out) | void;
// #endregion

/**
 * Context provided to a class `set` method decorator.
 */
interface ClassSetterDecoratorContext<This = unknown, Value = unknown> {
    readonly kind: "setter";
    readonly name: string | symbol;
    readonly static: boolean;
    readonly private: boolean;
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

// #region type ClassSetterDecoratorFunction
/**
 * Describes a function that can be used to decorate a class `set` method.
 */
type ClassSetterDecoratorFunction = <
    This,
    In,
    Out = In,
    Value = Out
>(target: (this: This, value: In) => void, context: ClassSetterDecoratorContext<This, Value>) => ((this: This, value: Out) => void) | void;
// #endregion

/**
 * Context provided to a class `accessor` field decorator.
 */
interface ClassAccessorDecoratorContext<This = unknown, Value = unknown> {
    readonly kind: "accessor";
    readonly name: string | symbol;
    readonly static: boolean;
    readonly private: boolean;
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

interface ClassAccessorDecoratorTarget<This, In> {
    get(this: This): In;
    set(this: This, value: In): void;
}

interface ClassAccessorDecoratorResult<This, In, Out> {
    get?(this: This): Out;
    set?(this: This, value: Out): void;
    init?(this: This, value: In): Out
}

// #region type ClassAccessorDecoratorFunction
/**
 * Describes a function that can be used to decorate a class `accessor` field.
 */
type ClassAccessorDecoratorFunction = <
    This,
    In,
    Out = In,
    Value = Out
>(
    target: ClassAccessorDecoratorTarget<This, In>,
    context: ClassAccessorDecoratorContext<This, Value>
) => ClassAccessorDecoratorResult<This, In, Out> | void;
// #endregion

/**
 * Context provided to a class field decorator.
 */
interface ClassFieldDecoratorContext<This = unknown, Value = unknown> {
    readonly kind: "field";
    readonly name: string | symbol;
    readonly static: boolean;
    readonly private: boolean;
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

// #region type ClassFieldDecoratorFunction
/**
 * Describes a function that can be used to decorate a class field.
 */
type ClassFieldDecoratorFunction = <
    This,
    In,
    Out = In,
    Value = Out
>(target: undefined, context: ClassAccessorDecoratorContext<This, Value>) => ((this: This, initialValue: In) => Out) | void;
// #endregion
