import { Times } from "./times";
export declare type Callable = (...args: any[]) => any;
export declare type Constructable = new (...args: any[]) => any;
export interface ThisArg {
    this: any;
}
export interface Returns<U> {
    return: U;
}
export interface Fallback {
    fallback: true;
}
export interface Throws {
    throw: any;
}
export interface Callback {
    callback: Callable;
}
export declare type Setup<U> = Returns<U> & (ThisArg & Callback | ThisArg | Callback) | Returns<U> | Throws & (ThisArg & Callback | ThisArg | Callback) | Throws | Fallback & (ThisArg & Callback | ThisArg | Callback) | Fallback | ThisArg & Callback | ThisArg | Callback;
/**
 * A mock version of another oject
 */
export declare class Mock<T extends object> {
    private _handler;
    private _proxy;
    private _revoke;
    /**
     * A mock version of another object
     * @param target The object to mock.
     * @param setups Optional setups to use
     */
    constructor(target?: T, setups?: Partial<T>);
    /**
     * Gets the mock version of the target
     */
    readonly proxy: T;
    /**
     * Creates an empty Mock object.
     */
    static object<T extends object = any>(): Mock<T>;
    /**
     * Creates an empty Mock function.
     */
    static function<T extends Callable | Constructable = Callable & Constructable>(): Mock<T>;
    /**
     * Creates a function spy.
     */
    static spy<T extends Callable | Constructable = Callable & Constructable>(): Mock<T>;
    /**
     * Creates a spy on an object or function.
     */
    static spy<T extends object>(target: T): Mock<T>;
    /**
     * Installs a spy on a method of an object. Use `revoke()` on the result to reset the spy.
     * @param object The object containing a method.
     * @param propertyKey The name of the method on the object.
     */
    static spy<T extends {
        [P in K]: (...args: any[]) => any;
    }, K extends keyof T>(object: T, propertyKey: K): Spy<T, K>;
    /**
     * Gets the mock for an object.
     * @param target The target.
     */
    static from<T extends object>(target: T): Mock<T> | undefined;
    /**
     * Performs setup of the mock object, overriding the target object's functionality with that provided by the setup
     * @param callback A function used to set up a method result.
     * @param result An object used to describe the result of the method.
     * @returns This mock instance.
     */
    setup<U = any>(callback: (value: T) => U, result?: Setup<U>): this;
    /**
     * Performs setup of the mock object, overriding the target object's functionality with that provided by the setup
     * @param setups An object whose members are used instead of the target object.
     * @returns This mock instance.
     */
    setup(setups: Partial<T>): this;
    /**
     * Performs verification that a specific action occurred at least once.
     * @param callback A callback that simulates the expected action.
     * @param message An optional message to use if verification fails.
     * @returns This mock instance.
     */
    verify<U>(callback: (value: T) => U, message?: string): this;
    /**
     * Performs verification that a specific action occurred.
     * @param callback A callback that simulates the expected action.
     * @param times The number of times the action should have occurred.
     * @param message An optional message to use if verification fails.
     * @returns This mock instance.
     */
    verify<U>(callback: (value: T) => U, times: Times, message?: string): this;
    revoke(): void;
}
export declare class Spy<T extends {
    [P in K]: (...args: any[]) => any;
}, K extends keyof T> extends Mock<T[K]> {
    private _spy;
    constructor(target: T, propertyKey: K);
    readonly installed: boolean;
    install(): this;
    uninstall(): this;
    revoke(): void;
}
