/**
 * Represents an argument condition used during verification.
 */
export class Arg {
    private _validate: (arg: any) => boolean;
    private _message: string | Message | List;
    private _rest: boolean;

    private constructor(condition: (arg: any) => boolean, message: string | Message | List, rest = false) {
        this._validate = condition;
        this._message = message;
        this._rest = rest;
    }

    /**
     * Allows any value.
     */
    public static any<T = any>() {
        return <T & Arg>new Arg(_ => true, `any`);
    }

    /**
     * Allows a value that matches the specified condition.
     * @param constraint The condition used to match the value.
     */
    public static is<T = any>(constraint: (arg: T) => boolean) {
        return <T & Arg>new Arg(constraint, `is`);
    }

    /**
     * Allows only a null value.
     */
    public static null<T = null>() {
        return <T & Arg>new Arg(arg => arg === null, `null`);
    }

    /**
     * Allows only a non-null value.
     */
    public static notNull<T = any>() {
        return <T & Arg>Arg.not(Arg.null());
    }

    /**
     * Allows only an undefined value.
     */
    public static undefined<T = undefined>() {
        return <T & Arg>new Arg(arg => arg === undefined, `undefined`);
    }

    /**
     * Allows only a non-undefined value.
     */
    public static notUndefined<T = any>() {
        return <T & Arg>Arg.not(Arg.undefined());
    }

    /**
     * Allows only an undefined or null value.
     */
    public static nullOrUndefined<T = null | undefined>() {
        return <T & Arg>Arg.or(Arg.null(), Arg.undefined());
    }

    /**
     * Allows only a non-undefined, non-null value.
     */
    public static notNullOrUndefined<T = any>() {
        return <T & Arg>Arg.not(Arg.nullOrUndefined());
    }

    /**
     * Allows a value that matches either the specified condition, or `undefined`.
     * @param condition The condition to match.
     */
    public static optional<T = any>(condition: T | T & Arg) {
        return <T & Arg>Arg.or(condition, Arg.undefined());
    }

    /**
     * Allows any value within the provided range.
     * @param min The minimum value.
     * @param max The maximum value.
     */
    public static between<T = any>(min: T, max: T) {
        return <T & Arg>new Arg(arg => min <= arg && arg <= max, message`between ${min} and ${max}`);
    }

    /**
     * Allows any value in the provided array.
     */
    public static in<T = any>(values: object & Iterable<T>) {
        return <T & Arg>new Arg(arg => includes(values, arg), message`in ${list(values, ", ")}`);
    }

    /**
     * Allows any value not in the provided array.
     */
    public static notIn<T = any>(values: T[]) {
        return <T & Arg>Arg.not(Arg.in(values));
    }

    /**
     * Allows any value that matches the provided pattern.
     */
    public static match<T = any>(pattern: RegExp) {
        return <T & Arg>new Arg(arg => pattern.test(arg), message`matches ${pattern}`);
    }

    /**
     * Allows any string that starts with the specified substring.
     */
    public static startsWith(text: string) {
        return <string & Arg>new Arg(arg => typeof arg === "string" && arg.startsWith(text), message`starts with ${text}`);
    }

    /**
     * Allows any string that ends with the specified substring.
     */
    public static endsWith(text: string) {
        return <string & Arg>new Arg(arg => typeof arg === "string" && arg.endsWith(text), message`ends with ${text}`);
    }

    /**
     * Allows any string that includes the specified substring.
     */
    public static includes(text: string) {
        return <string & Arg>new Arg(arg => typeof arg === "string" && arg.includes(text), message`includes ${text}`);
    }

    /**
     * Allows an array that matches the specified values (or `Arg` conditions), in the same order.
     */
    public static array<T>(values: (T | T & Arg)[]): T[] & Arg {
        return <any>new Arg(arg => Array.isArray(arg) && Arg.validateAll(values.map(Arg.from), arg), message`array [${list(values, ", ")}]`);
    }

    /**
     * Allows any value with the provided `typeof` tag.
     */
    public static typeof(tag: "string"): string & Arg;
    /**
     * Allows any value with the provided `typeof` tag.
     */
    public static typeof(tag: "number"): number & Arg;
    /**
     * Allows any value with the provided `typeof` tag.
     */
    public static typeof(tag: "boolean"): boolean & Arg;
    /**
     * Allows any value with the provided `typeof` tag.
     */
    public static typeof(tag: "symbol"): symbol & Arg;
    /**
     * Allows any value with the provided `typeof` tag.
     */
    public static typeof(tag: "object"): object & null & Arg;
    /**
     * Allows any value with the provided `typeof` tag.
     */
    public static typeof(tag: "function"): ((...args: any[]) => any) & Arg;
    /**
     * Allows any value with the provided `typeof` tag.
     */
    public static typeof(tag: "undefined"): undefined & Arg;
    /**
     * Allows any value with the provided `typeof` tag.
     */
    public static typeof<T = any>(tag: string): T & Arg;
    public static typeof<T = any>(tag: string) {
        return <T & Arg>new Arg(arg => typeof arg === tag, message`typeof ${tag}`);
    }

    /**
     * Allows any `string`.
     */
    public static string() { return this.typeof("string"); }

    /**
     * Allows any `number`.
     */
    public static number() { return this.typeof("number"); }

    /**
     * Allows any `boolean`.
     */
    public static boolean() { return this.typeof("boolean"); }

    /**
     * Allows any `symbol`.
     */
    public static symbol() { return this.typeof("symbol"); }

    /**
     * Allows any `object` (including functions but excluding `null`).
     */
    public static object<T extends object = object>() {
        return <T & Arg>new Arg(arg => typeof arg === "object" && arg !== null || typeof arg === "function", `object`);
    }

    /**
     * Allows any `Function` value.
     */
    public static function() { return this.typeof("function"); }

    /**
     * Allows any value that is an instance of the provided function.
     * @param type The expected constructor.
     */
    public static instanceof<TClass extends { new (...args: any[]): object; prototype: object; }>(type: TClass) {
        return <TClass["prototype"] & Arg>new Arg(arg => arg instanceof type, message`instanceof ${type.name}`);
    }

    /**
     * Allows any value that has the provided property names in its prototype chain.
     */
    public static has<T>(...names: string[]) {
        return <T & Arg>new Arg(arg => count(names, name => has(arg, name)) === names.length, message`has ${list(names, ", ")}`);
    }

    /**
     * Allows any value that has the provided property names on itself but not its prototype chain.
     */
    public static hasOwn<T>(...names: string[]) {
        return <T & Arg>new Arg(arg => count(names, name => hasOwn(arg, name)) === names.length, message`hasOwn ${list(names, ", ")}`);
    }

    /**
     * Allows any array that contains the specified value.
     */
    public static hasElement<T>(value: T | T & Arg) {
        return <T[] & Arg>new Arg(arg => includes(arg, value), message`has element ${value}`);
    }

    /**
     * Allows any value that matches the provided condition for the rest of the arguments in the call.
     * @param condition The optional condition for each other element.
     */
    public static rest<T>(condition?: T | (T & Arg)) {
        return arguments.length === 0
            ? <T & Arg>new Arg(() => true, `rest`, /*rest*/ true)
            : <T & Arg>new Arg(arg => Arg.from(condition)._validate(arg), message`rest ${condition}`, /*rest*/ true);
    }

    /**
     * Negates a condition.
     */
    public static not<T = any>(condition: T | (T & Arg)) {
        return <T & Arg>new Arg(arg => !Arg.from(condition)._validate(arg), message`not ${condition}`);
    }

    /**
     * Combines conditions, where all conditions must be `true`.
     */
    public static and<T = any>(...conditions: ((T & Arg) | T)[]) {
        return <T & Arg>new Arg(arg => conditions.every(condition => Arg.from(condition)._validate(arg)), list(conditions, " and "));
    }

    /**
     * Combines conditions, where any conditions may be `true`.
     */
    public static or<T = any>(...conditions: ((T & Arg) | T)[]) {
        return <T & Arg>new Arg(arg => conditions.some(condition => Arg.from(condition)._validate(arg)), list(conditions, " or "));
    }

    /**
     * Ensures the value is a `Condition`
     * @param value The value to coerce
     * @returns The condition
     */
    public static from<T>(value: T) {
        return value instanceof Arg ? value :
            value === undefined ? Arg.undefined() :
            value === null ? Arg.null() :
            new Arg(arg => is(arg, value), new Message(() => JSON.stringify(value)));
    }

    /**
     * Validates an argument against a condition
     * @param condition The condition to validate.
     * @param arg The argument to validate against the condition.
     */
    public static validate(condition: Arg, arg: any): boolean {
        return condition._validate(arg);
    }

    /**
     * Validates the arguments against the condition.
     * @param conditions The conditions to validate.
     * @param args The arguments for the execution.
     */
    public static validateAll(conditions: ReadonlyArray<Arg>, args: ReadonlyArray<any>): boolean {
        const length = Math.max(conditions.length, args.length);
        let conditionIndex = 0;
        let argIndex = 0;
        while (argIndex < length) {
            const condition = conditionIndex < conditions.length ? conditions[conditionIndex] : undefined;
            const arg = argIndex < args.length ? args[argIndex] : undefined;
            if (!condition) return false;
            if (argIndex >= args.length && condition._rest) return true;
            if (!condition._validate(arg)) return false;
            if (!condition._rest) conditionIndex++;
            argIndex++;
        }
        return true;
    }

    /**
     * Gets the message associated with the provided `Arg`.
     */
    public static messageFor(arg: Arg) {
        return typeof arg._message === "string" ? arg._message : arg._message.toString();
    }

    /**
     * Gets a string that represents this condition.
     */
    public toString(): string {
        return `<${this._message}>`;
    }
}

/**
 * SameValueZero (from ECMAScript spec), which has stricter equality sematics than "==" or "===".
 */
function is(x: any, y: any) {
    return (x === y) ? (x !== 0 || 1 / x === 1 / y) : (x !== x && y !== y);
}

function message(strings: TemplateStringsArray, ...args: any[]) {
    return args.some(isDeferred)
        ? new Message(() => String.raw(strings, ...args.map(formatArg)))
        : String.raw(strings, ...args.map(formatArg));
}

class Message {
    private _callback: () => string;
    private _message: string | undefined;

    constructor(callback: () => string) {
        this._callback = callback;
    }

    public toString(): string {
        if (this._message === undefined) this._message = this._callback();
        return this._message;
    }
}

function list(list: Iterable<any>, separator: string) {
    return some(list, isDeferred)
        ? new List(list, separator)
        : formatIterableObject(list, separator);
}

class List {
    private _items: Iterable<any>;
    private _separator: string;
    private _message: string | undefined;

    constructor(items: Iterable<any>, separator: string) {
        this._items = items;
        this._separator = separator;
    }

    public toString() {
        if (this._message === undefined) this._message = formatIterableObject(this._items, this._separator);
        return this._message;
    }
}

function isDeferred(arg: any): boolean {
    return arg instanceof Message || arg instanceof List || arg instanceof Arg;
}

function isIterableObject(value: any): value is Iterable<any> {
    return typeof value === "object" && value !== null && typeof value[Symbol.iterator] === "function";
}

function formatArg(arg: any) {
    return isIterableObject(arg) ? formatIterableObject(arg, ", ") :
        arg instanceof Arg ? Arg.messageFor(arg) :
        arg;
}

function formatIterableObject(arg: Iterable<any>, separator: string) {
    let result = "";
    for (const item of arg) {
        if (result) result += separator;
        result += item instanceof Arg ? Arg.messageFor(item) : item;
    }
    return result;
}

function count<T>(array: T[], predicate: (value: T) => boolean): number {
    let result = 0;
    for (const item of array) {
        if (predicate(item)) result++;
    }
    return result;
}

function has(object: any, key: PropertyKey) {
    return Reflect.has(object, key);
}

function hasOwn(object: any, key: PropertyKey) {
    return Object.prototype.hasOwnProperty.call(object, key);
}

function includes<T>(object: Iterable<T>, condition: T) {
    if (condition instanceof Arg) {
        for (const item of object) if (Arg.validate(condition, item)) return true;
        return false;
    }

    if (Array.isArray(object)) return object.indexOf(condition) >= 0;
    if (object instanceof Set) return object.has(condition);
    for (const item of object) if (is(item, condition)) return true;
    return false;
}

function some<T>(object: Iterable<T>, predicate: (a: T) => boolean) {
    if (Array.isArray(object)) return object.some(predicate);
    for (const item of object) if (predicate(item)) return true;
    return false;
}