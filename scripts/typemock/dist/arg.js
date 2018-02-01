"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Represents an argument condition used during verification.
 */
class Arg {
    constructor(condition, message, rest = false) {
        this._validate = condition;
        this._message = message;
        this._rest = rest;
    }
    /**
     * Allows any value.
     */
    static any() {
        return new Arg(_ => true, `any`);
    }
    /**
     * Allows a value that matches the specified condition.
     * @param constraint The condition used to match the value.
     */
    static is(constraint) {
        return new Arg(constraint, `is`);
    }
    /**
     * Allows only a null value.
     */
    static null() {
        return new Arg(arg => arg === null, `null`);
    }
    /**
     * Allows only a non-null value.
     */
    static notNull() {
        return Arg.not(Arg.null());
    }
    /**
     * Allows only an undefined value.
     */
    static undefined() {
        return new Arg(arg => arg === undefined, `undefined`);
    }
    /**
     * Allows only a non-undefined value.
     */
    static notUndefined() {
        return Arg.not(Arg.undefined());
    }
    /**
     * Allows only an undefined or null value.
     */
    static nullOrUndefined() {
        return Arg.or(Arg.null(), Arg.undefined());
    }
    /**
     * Allows only a non-undefined, non-null value.
     */
    static notNullOrUndefined() {
        return Arg.not(Arg.nullOrUndefined());
    }
    /**
     * Allows a value that matches either the specified condition, or `undefined`.
     * @param condition The condition to match.
     */
    static optional(condition) {
        return Arg.or(condition, Arg.undefined());
    }
    /**
     * Allows any value within the provided range.
     * @param min The minimum value.
     * @param max The maximum value.
     */
    static between(min, max) {
        return new Arg(arg => min <= arg && arg <= max, message `between ${min} and ${max}`);
    }
    /**
     * Allows any value in the provided array.
     */
    static in(values) {
        return new Arg(arg => includes(values, arg), message `in ${list(values, ", ")}`);
    }
    /**
     * Allows any value not in the provided array.
     */
    static notIn(values) {
        return Arg.not(Arg.in(values));
    }
    /**
     * Allows any value that matches the provided pattern.
     */
    static match(pattern) {
        return new Arg(arg => pattern.test(arg), message `matches ${pattern}`);
    }
    /**
     * Allows any string that starts with the specified substring.
     */
    static startsWith(text) {
        return new Arg(arg => typeof arg === "string" && arg.startsWith(text), message `starts with ${text}`);
    }
    /**
     * Allows any string that ends with the specified substring.
     */
    static endsWith(text) {
        return new Arg(arg => typeof arg === "string" && arg.endsWith(text), message `ends with ${text}`);
    }
    /**
     * Allows any string that includes the specified substring.
     */
    static includes(text) {
        return new Arg(arg => typeof arg === "string" && arg.includes(text), message `includes ${text}`);
    }
    /**
     * Allows an array that matches the specified values (or `Arg` conditions), in the same order.
     */
    static array(values) {
        return new Arg(arg => Array.isArray(arg) && Arg.validateAll(values.map(Arg.from), arg), message `array [${list(values, ", ")}]`);
    }
    static typeof(tag) {
        return new Arg(arg => typeof arg === tag, message `typeof ${tag}`);
    }
    /**
     * Allows any `string`.
     */
    static string() { return this.typeof("string"); }
    /**
     * Allows any `number`.
     */
    static number() { return this.typeof("number"); }
    /**
     * Allows any `boolean`.
     */
    static boolean() { return this.typeof("boolean"); }
    /**
     * Allows any `symbol`.
     */
    static symbol() { return this.typeof("symbol"); }
    /**
     * Allows any `object` (including functions but excluding `null`).
     */
    static object() {
        return new Arg(arg => typeof arg === "object" && arg !== null || typeof arg === "function", `object`);
    }
    /**
     * Allows any `Function` value.
     */
    static function() { return this.typeof("function"); }
    /**
     * Allows any value that is an instance of the provided function.
     * @param type The expected constructor.
     */
    static instanceof(type) {
        return new Arg(arg => arg instanceof type, message `instanceof ${type.name}`);
    }
    /**
     * Allows any value that has the provided property names in its prototype chain.
     */
    static has(...names) {
        return new Arg(arg => count(names, name => has(arg, name)) === names.length, message `has ${list(names, ", ")}`);
    }
    /**
     * Allows any value that has the provided property names on itself but not its prototype chain.
     */
    static hasOwn(...names) {
        return new Arg(arg => count(names, name => hasOwn(arg, name)) === names.length, message `hasOwn ${list(names, ", ")}`);
    }
    /**
     * Allows any array that contains the specified value.
     */
    static hasElement(value) {
        return new Arg(arg => includes(arg, value), message `has element ${value}`);
    }
    /**
     * Allows any value that matches the provided condition for the rest of the arguments in the call.
     * @param condition The optional condition for each other element.
     */
    static rest(condition) {
        return arguments.length === 0
            ? new Arg(() => true, `rest`, /*rest*/ true)
            : new Arg(arg => Arg.from(condition)._validate(arg), message `rest ${condition}`, /*rest*/ true);
    }
    /**
     * Negates a condition.
     */
    static not(condition) {
        return new Arg(arg => !Arg.from(condition)._validate(arg), message `not ${condition}`);
    }
    /**
     * Combines conditions, where all conditions must be `true`.
     */
    static and(...conditions) {
        return new Arg(arg => conditions.every(condition => Arg.from(condition)._validate(arg)), list(conditions, " and "));
    }
    /**
     * Combines conditions, where any conditions may be `true`.
     */
    static or(...conditions) {
        return new Arg(arg => conditions.some(condition => Arg.from(condition)._validate(arg)), list(conditions, " or "));
    }
    /**
     * Ensures the value is a `Condition`
     * @param value The value to coerce
     * @returns The condition
     */
    static from(value) {
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
    static validate(condition, arg) {
        return condition._validate(arg);
    }
    /**
     * Validates the arguments against the condition.
     * @param conditions The conditions to validate.
     * @param args The arguments for the execution.
     */
    static validateAll(conditions, args) {
        const length = Math.max(conditions.length, args.length);
        let conditionIndex = 0;
        let argIndex = 0;
        while (argIndex < length) {
            const condition = conditionIndex < conditions.length ? conditions[conditionIndex] : undefined;
            const arg = argIndex < args.length ? args[argIndex] : undefined;
            if (!condition)
                return false;
            if (argIndex >= args.length && condition._rest)
                return true;
            if (!condition._validate(arg))
                return false;
            if (!condition._rest)
                conditionIndex++;
            argIndex++;
        }
        return true;
    }
    /**
     * Gets the message associated with the provided `Arg`.
     */
    static messageFor(arg) {
        return typeof arg._message === "string" ? arg._message : arg._message.toString();
    }
    /**
     * Gets a string that represents this condition.
     */
    toString() {
        return `<${this._message}>`;
    }
}
exports.Arg = Arg;
/**
 * SameValueZero (from ECMAScript spec), which has stricter equality sematics than "==" or "===".
 */
function is(x, y) {
    return (x === y) ? (x !== 0 || 1 / x === 1 / y) : (x !== x && y !== y);
}
function message(strings, ...args) {
    return args.some(isDeferred)
        ? new Message(() => String.raw(strings, ...args.map(formatArg)))
        : String.raw(strings, ...args.map(formatArg));
}
class Message {
    constructor(callback) {
        this._callback = callback;
    }
    toString() {
        if (this._message === undefined)
            this._message = this._callback();
        return this._message;
    }
}
function list(list, separator) {
    return some(list, isDeferred)
        ? new List(list, separator)
        : formatIterableObject(list, separator);
}
class List {
    constructor(items, separator) {
        this._items = items;
        this._separator = separator;
    }
    toString() {
        if (this._message === undefined)
            this._message = formatIterableObject(this._items, this._separator);
        return this._message;
    }
}
function isDeferred(arg) {
    return arg instanceof Message || arg instanceof List || arg instanceof Arg;
}
function isIterableObject(value) {
    return typeof value === "object" && value !== null && typeof value[Symbol.iterator] === "function";
}
function formatArg(arg) {
    return isIterableObject(arg) ? formatIterableObject(arg, ", ") :
        arg instanceof Arg ? Arg.messageFor(arg) :
            arg;
}
function formatIterableObject(arg, separator) {
    let result = "";
    for (const item of arg) {
        if (result)
            result += separator;
        result += item instanceof Arg ? Arg.messageFor(item) : item;
    }
    return result;
}
function count(array, predicate) {
    let result = 0;
    for (const item of array) {
        if (predicate(item))
            result++;
    }
    return result;
}
function has(object, key) {
    return Reflect.has(object, key);
}
function hasOwn(object, key) {
    return Object.prototype.hasOwnProperty.call(object, key);
}
function includes(object, condition) {
    if (condition instanceof Arg) {
        for (const item of object)
            if (Arg.validate(condition, item))
                return true;
        return false;
    }
    if (Array.isArray(object))
        return object.indexOf(condition) >= 0;
    if (object instanceof Set)
        return object.has(condition);
    for (const item of object)
        if (is(item, condition))
            return true;
    return false;
}
function some(object, predicate) {
    if (Array.isArray(object))
        return object.some(predicate);
    for (const item of object)
        if (predicate(item))
            return true;
    return false;
}

//# sourceMappingURL=arg.js.map
