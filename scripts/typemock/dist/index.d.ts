export { Arg } from "./arg";
export { Times } from "./times";
export { Mock, Spy, Returns, Throws, ThisArg, Callback, Fallback, Setup, Callable, Constructable } from "./mock";
export { Inject } from "./inject";
export { Timers, Timer, Timeout, Interval, Immediate, AnimationFrame } from "./timers";
import { Mock, Spy, Callable, Constructable } from "./mock";
/**
 * Creates a spy on an object or function.
 */
export declare function spy<T extends Callable | Constructable = Callable & Constructable>(): Mock<T>;
/**
 * Creates a spy on an object or function.
 */
export declare function spy<T extends object>(target: T): Mock<T>;
/**
 * Installs a spy on a method of an object. Use `revoke()` on the result to reset the spy.
 * @param object The object containing a method.
 * @param propertyKey The name of the method on the object.
 */
export declare function spy<T extends {
    [P in K]: (...args: any[]) => any;
}, K extends keyof T>(object: T, propertyKey: K): Spy<T, K>;
