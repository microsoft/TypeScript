/**
 * Represents an argument condition used during verification.
 */
export declare class Arg {
    private _validate;
    private _message;
    private _rest;
    private constructor();
    /**
     * Allows any value.
     */
    static any<T = any>(): T & Arg;
    /**
     * Allows a value that matches the specified condition.
     * @param constraint The condition used to match the value.
     */
    static is<T = any>(constraint: (arg: T) => boolean): T & Arg;
    /**
     * Allows only a null value.
     */
    static null<T = null>(): T & Arg;
    /**
     * Allows only a non-null value.
     */
    static notNull<T = any>(): T & Arg;
    /**
     * Allows only an undefined value.
     */
    static undefined<T = undefined>(): T & Arg;
    /**
     * Allows only a non-undefined value.
     */
    static notUndefined<T = any>(): T & Arg;
    /**
     * Allows only an undefined or null value.
     */
    static nullOrUndefined<T = null | undefined>(): T & Arg;
    /**
     * Allows only a non-undefined, non-null value.
     */
    static notNullOrUndefined<T = any>(): T & Arg;
    /**
     * Allows a value that matches either the specified condition, or `undefined`.
     * @param condition The condition to match.
     */
    static optional<T = any>(condition: T | T & Arg): T & Arg;
    /**
     * Allows any value within the provided range.
     * @param min The minimum value.
     * @param max The maximum value.
     */
    static between<T = any>(min: T, max: T): T & Arg;
    /**
     * Allows any value in the provided array.
     */
    static in<T = any>(values: object & Iterable<T>): T & Arg;
    /**
     * Allows any value not in the provided array.
     */
    static notIn<T = any>(values: T[]): T & Arg;
    /**
     * Allows any value that matches the provided pattern.
     */
    static match<T = any>(pattern: RegExp): T & Arg;
    /**
     * Allows any string that starts with the specified substring.
     */
    static startsWith(text: string): string & Arg;
    /**
     * Allows any string that ends with the specified substring.
     */
    static endsWith(text: string): string & Arg;
    /**
     * Allows any string that includes the specified substring.
     */
    static includes(text: string): string & Arg;
    /**
     * Allows an array that matches the specified values (or `Arg` conditions), in the same order.
     */
    static array<T>(values: (T | T & Arg)[]): T[] & Arg;
    /**
     * Allows any value with the provided `typeof` tag.
     */
    static typeof(tag: "string"): string & Arg;
    /**
     * Allows any value with the provided `typeof` tag.
     */
    static typeof(tag: "number"): number & Arg;
    /**
     * Allows any value with the provided `typeof` tag.
     */
    static typeof(tag: "boolean"): boolean & Arg;
    /**
     * Allows any value with the provided `typeof` tag.
     */
    static typeof(tag: "symbol"): symbol & Arg;
    /**
     * Allows any value with the provided `typeof` tag.
     */
    static typeof(tag: "object"): object & null & Arg;
    /**
     * Allows any value with the provided `typeof` tag.
     */
    static typeof(tag: "function"): ((...args: any[]) => any) & Arg;
    /**
     * Allows any value with the provided `typeof` tag.
     */
    static typeof(tag: "undefined"): undefined & Arg;
    /**
     * Allows any value with the provided `typeof` tag.
     */
    static typeof<T = any>(tag: string): T & Arg;
    /**
     * Allows any `string`.
     */
    static string(): string & Arg;
    /**
     * Allows any `number`.
     */
    static number(): number & Arg;
    /**
     * Allows any `boolean`.
     */
    static boolean(): (true & Arg) | (false & Arg);
    /**
     * Allows any `symbol`.
     */
    static symbol(): symbol & Arg;
    /**
     * Allows any `object` (including functions but excluding `null`).
     */
    static object<T extends object = object>(): T & Arg;
    /**
     * Allows any `Function` value.
     */
    static function(): ((...args: any[]) => any) & Arg;
    /**
     * Allows any value that is an instance of the provided function.
     * @param type The expected constructor.
     */
    static instanceof<TClass extends {
        new (...args: any[]): object;
        prototype: object;
    }>(type: TClass): TClass["prototype"] & Arg;
    /**
     * Allows any value that has the provided property names in its prototype chain.
     */
    static has<T>(...names: string[]): T & Arg;
    /**
     * Allows any value that has the provided property names on itself but not its prototype chain.
     */
    static hasOwn<T>(...names: string[]): T & Arg;
    /**
     * Allows any array that contains the specified value.
     */
    static hasElement<T>(value: T | T & Arg): T[] & Arg;
    /**
     * Allows any value that matches the provided condition for the rest of the arguments in the call.
     * @param condition The optional condition for each other element.
     */
    static rest<T>(condition?: T | (T & Arg)): T & Arg;
    /**
     * Negates a condition.
     */
    static not<T = any>(condition: T | (T & Arg)): T & Arg;
    /**
     * Combines conditions, where all conditions must be `true`.
     */
    static and<T = any>(...conditions: ((T & Arg) | T)[]): T & Arg;
    /**
     * Combines conditions, where any conditions may be `true`.
     */
    static or<T = any>(...conditions: ((T & Arg) | T)[]): T & Arg;
    /**
     * Ensures the value is a `Condition`
     * @param value The value to coerce
     * @returns The condition
     */
    static from<T>(value: T): Arg;
    /**
     * Validates an argument against a condition
     * @param condition The condition to validate.
     * @param arg The argument to validate against the condition.
     */
    static validate(condition: Arg, arg: any): boolean;
    /**
     * Validates the arguments against the condition.
     * @param conditions The conditions to validate.
     * @param args The arguments for the execution.
     */
    static validateAll(conditions: ReadonlyArray<Arg>, args: ReadonlyArray<any>): boolean;
    /**
     * Gets the message associated with the provided `Arg`.
     */
    static messageFor(arg: Arg): string;
    /**
     * Gets a string that represents this condition.
     */
    toString(): string;
}
