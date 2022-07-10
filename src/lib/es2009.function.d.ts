/**
 * Creates a new function.
 */
 interface Function {
    /**
     * Calls the function, substituting the specified object for the this value of the function, and the specified array for the arguments of the function.
     * @param thisArg The object to be used as the this object.
     * @param argArray A set of arguments to be passed to the function.
     */
    apply(this: Function, thisArg: any, argArray?: any): any;

    /**
     * Calls a method of an object, substituting another object for the current object.
     * @param thisArg The object to be used as the current object.
     * @param argArray A list of arguments to be passed to the method.
     */
    call(this: Function, thisArg: any, ...argArray: any[]): any;

    /**
     * For a given function, creates a bound function that has the same body as the original function.
     * The this object of the bound function is associated with the specified object, and has the specified initial parameters.
     * @param thisArg An object to which the this keyword can refer inside the new function.
     * @param argArray A list of arguments to be passed to the new function.
     */
    bind(this: Function, thisArg: any, ...argArray: any[]): any;

    /** Returns a string representation of a function. */
    toString(): string;

    prototype: any;
    readonly length: number;

    // Non-standard extensions
    arguments: any;
    caller: Function;
}

interface FunctionConstructor {
    /**
     * Creates a new function.
     * @param args A list of arguments the function accepts.
     */
    new(...args: string[]): Function;
    (...args: string[]): Function;
    readonly prototype: Function;
}

declare var Function: FunctionConstructor;

/**
 * Extracts the type of the 'this' parameter of a function type, or 'unknown' if the function type has no 'this' parameter.
 */
 type ThisParameterType<T> = T extends (this: infer U, ...args: never) => any ? U : unknown;

 /**
  * Removes the 'this' parameter from a function type.
  */
 type OmitThisParameter<T> = unknown extends ThisParameterType<T> ? T : T extends (...args: infer A) => infer R ? (...args: A) => R : T;

 interface CallableFunction extends Function {
     /**
      * Calls the function with the specified object as the this value and the elements of specified array as the arguments.
      * @param thisArg The object to be used as the this object.
      * @param args An array of argument values to be passed to the function.
      */
     apply<T, R>(this: (this: T) => R, thisArg: T): R;
     apply<T, A extends any[], R>(this: (this: T, ...args: A) => R, thisArg: T, args: A): R;

     /**
      * Calls the function with the specified object as the this value and the specified rest arguments as the arguments.
      * @param thisArg The object to be used as the this object.
      * @param args Argument values to be passed to the function.
      */
     call<T, A extends any[], R>(this: (this: T, ...args: A) => R, thisArg: T, ...args: A): R;

     /**
      * For a given function, creates a bound function that has the same body as the original function.
      * The this object of the bound function is associated with the specified object, and has the specified initial parameters.
      * @param thisArg The object to be used as the this object.
      * @param args Arguments to bind to the parameters of the function.
      */
     bind<T>(this: T, thisArg: ThisParameterType<T>): OmitThisParameter<T>;
     bind<T, A0, A extends any[], R>(this: (this: T, arg0: A0, ...args: A) => R, thisArg: T, arg0: A0): (...args: A) => R;
     bind<T, A0, A1, A extends any[], R>(this: (this: T, arg0: A0, arg1: A1, ...args: A) => R, thisArg: T, arg0: A0, arg1: A1): (...args: A) => R;
     bind<T, A0, A1, A2, A extends any[], R>(this: (this: T, arg0: A0, arg1: A1, arg2: A2, ...args: A) => R, thisArg: T, arg0: A0, arg1: A1, arg2: A2): (...args: A) => R;
     bind<T, A0, A1, A2, A3, A extends any[], R>(this: (this: T, arg0: A0, arg1: A1, arg2: A2, arg3: A3, ...args: A) => R, thisArg: T, arg0: A0, arg1: A1, arg2: A2, arg3: A3): (...args: A) => R;
     bind<T, AX, R>(this: (this: T, ...args: AX[]) => R, thisArg: T, ...args: AX[]): (...args: AX[]) => R;
 }

 interface NewableFunction extends Function {
     /**
      * Calls the function with the specified object as the this value and the elements of specified array as the arguments.
      * @param thisArg The object to be used as the this object.
      * @param args An array of argument values to be passed to the function.
      */
     apply<T>(this: new () => T, thisArg: T): void;
     apply<T, A extends any[]>(this: new (...args: A) => T, thisArg: T, args: A): void;

     /**
      * Calls the function with the specified object as the this value and the specified rest arguments as the arguments.
      * @param thisArg The object to be used as the this object.
      * @param args Argument values to be passed to the function.
      */
     call<T, A extends any[]>(this: new (...args: A) => T, thisArg: T, ...args: A): void;

     /**
      * For a given function, creates a bound function that has the same body as the original function.
      * The this object of the bound function is associated with the specified object, and has the specified initial parameters.
      * @param thisArg The object to be used as the this object.
      * @param args Arguments to bind to the parameters of the function.
      */
     bind<T>(this: T, thisArg: any): T;
     bind<A0, A extends any[], R>(this: new (arg0: A0, ...args: A) => R, thisArg: any, arg0: A0): new (...args: A) => R;
     bind<A0, A1, A extends any[], R>(this: new (arg0: A0, arg1: A1, ...args: A) => R, thisArg: any, arg0: A0, arg1: A1): new (...args: A) => R;
     bind<A0, A1, A2, A extends any[], R>(this: new (arg0: A0, arg1: A1, arg2: A2, ...args: A) => R, thisArg: any, arg0: A0, arg1: A1, arg2: A2): new (...args: A) => R;
     bind<A0, A1, A2, A3, A extends any[], R>(this: new (arg0: A0, arg1: A1, arg2: A2, arg3: A3, ...args: A) => R, thisArg: any, arg0: A0, arg1: A1, arg2: A2, arg3: A3): new (...args: A) => R;
     bind<AX, R>(this: new (...args: AX[]) => R, thisArg: any, ...args: AX[]): new (...args: AX[]) => R;
 }

 interface IArguments {
     [index: number]: any;
     length: number;
     callee: Function;
 }
