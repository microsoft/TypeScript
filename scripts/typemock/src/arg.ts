/**
 * Represents an argument condition used during verification.
 */
export class Arg {
    private _validate: (value: any) => boolean;
    private _message: string;
    private _rest: boolean;

    private constructor(condition: (value: any) => boolean, message: string, rest = false) {
        this._validate = condition;
        this._message = message;
        this._rest = rest;
    }

    /**
     * Allows any value.
     */
    public static any<T = any>(): T & Arg {
        return <any>new Arg(() => true, `any`);
    }

    /**
     * Allows a value that matches the specified condition.
     * @param match The condition used to match the value.
     */
    public static is<T = any>(match: (value: T) => boolean): T & Arg {
        return <any>new Arg(match, `is`);
    }

    /**
     * Allows only a null value.
     */
    public static null<T = any>(): T & Arg {
        return <any>new Arg(value => value === null, `null`);
    }

    /**
     * Allows only a non-null value.
     */
    public static notNull<T = any>(): T & Arg {
        return Arg.not(Arg.null());
    }

    /**
     * Allows only an undefined value.
     */
    public static undefined<T = any>(): T & Arg {
        return <any>new Arg(value => value === undefined, `undefined`);
    }

    /**
     * Allows only a non-undefined value.
     */
    public static notUndefined<T = any>(): T & Arg {
        return Arg.not(Arg.undefined());
    }

    /**
     * Allows only an undefined or null value.
     */
    public static nullOrUndefined<T = any>(): T & Arg {
        return Arg.or(Arg.null(), Arg.undefined());
    }

    /**
     * Allows only a non-undefined, non-null value.
     */
    public static notNullOrUndefined<T = any>(): T & Arg {
        return Arg.not(Arg.nullOrUndefined());
    }

    public static optional<T = any>(condition: T | T & Arg): T & Arg {
        return Arg.or(condition, Arg.undefined());
    }

    /**
     * Allows any value within the provided range.
     * @param min The minimum value.
     * @param max The maximum value.
     */
    public static between<T = any>(min: T, max: T): T & Arg {
        return <any>new Arg(value => min <= value && value <= max, `between ${min} and ${max}`);
    }

    /**
     * Allows any value in the provided array.
     */
    public static in<T = any>(values: T[]): T & Arg {
        return <any>new Arg(value => values.indexOf(value) > -1, `in ${values.join(", ")}`);
    }

    /**
     * Allows any value not in the provided array.
     */
    public static notIn<T = any>(values: T[]): T & Arg {
        return Arg.not(Arg.in(values));
    }

    /**
     * Allows any value that matches the provided pattern.
     */
    public static match<T = any>(pattern: RegExp): T & Arg {
        return <any>new Arg(value => pattern.test(value), `matches ${pattern}`);
    }

    public static startsWith(text: string): string & Arg {
        return <any>new Arg(value => typeof value === "string" && value.startsWith(text), `starts with ${text}`);
    }

    public static endsWith(text: string): string & Arg {
        return <any>new Arg(value => typeof value === "string" && value.endsWith(text), `ends with ${text}`);
    }

    public static includes(value: string): string & string[] & Arg;
    public static includes<T>(value: T): T[] & Arg;
    public static includes<T>(value: T): Arg {
        return new Arg(value_ => Array.isArray(value_) ? value_.includes(value) : typeof value_ === "string" && value_.includes("" + value), `contains ${value}`);
    }

    public static array<T>(values: (T | T & Arg)[]): T[] & Arg {
        const conditions = values.map(Arg.from);
        return <any>new Arg(value => value.length === conditions.length && Arg.validateAll(conditions, value), `array [${conditions.join(", ")}]`);
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
    public static typeof(tag: "object"): object & Arg;
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
    public static typeof(tag: string): any {
        return <any>new Arg(value => typeof value === tag, `typeof ${tag}`);
    }

    public static string() { return this.typeof("string"); }
    public static number() { return this.typeof("number"); }
    public static boolean() { return this.typeof("boolean"); }
    public static symbol() { return this.typeof("symbol"); }
    public static object() { return this.typeof("object"); }
    public static function() { return this.typeof("function"); }

    /**
     * Allows any value that is an instance of the provided function.
     * @param type The expected constructor.
     */
    public static instanceof<TClass extends { new (...args: any[]): object; prototype: object; }>(type: TClass): TClass["prototype"] & Arg {
        return <any>new Arg(value => value instanceof type, `instanceof ${type.name}`);
    }

    /**
     * Allows any value that has the provided property names in its prototype chain.
     */
    public static has<T>(...names: string[]): T & Arg {
        return <any>new Arg(value => names.filter(name => name in value).length === names.length, `has ${names.join(", ")}`);
    }

    /**
     * Allows any value that has the provided property names on itself but not its prototype chain.
     */
    public static hasOwn<T>(...names: string[]): T & Arg {
        return <any>new Arg(value => names.filter(name => Object.prototype.hasOwnProperty.call(value, name)).length === names.length, `hasOwn ${names.join(", ")}`);
    }

    /**
     * Allows any value that matches the provided condition for the rest of the arguments in the call.
     * @param condition The optional condition for each other element.
     */
    public static rest<T>(condition?: T | (T & Arg)): T & Arg {
        if (condition === undefined) {
            return <any>new Arg(() => true, `rest`, /*rest*/ true);
        }

        const arg = Arg.from(condition);
        return <any>new Arg(value => arg._validate(value), `rest ${arg._message}`, /*rest*/ true);
    }

    /**
     * Negates a condition.
     */
    public static not<T = any>(value: T | (T & Arg)): T & Arg {
        const arg = Arg.from(value);
        return <any>new Arg(value => !arg._validate(value), `not ${arg._message}`);
    }

    /**
     * Combines conditions, where all conditions must be `true`.
     */
    public static and<T = any>(...args: ((T & Arg) | T)[]): T & Arg {
        const conditions = args.map(Arg.from);
        return <any>new Arg(value => conditions.every(condition => condition._validate(value)), conditions.map(condition => condition._message).join(" and "));
    }

    /**
     * Combines conditions, where any conditions may be `true`.
     */
    public static or<T = any>(...args: ((T & Arg) | T)[]): T & Arg {
        const conditions = args.map(Arg.from);
        return <any>new Arg(value => conditions.some(condition => condition._validate(value)), conditions.map(condition => condition._message).join(" or "));
    }

    /**
     * Ensures the value is a `Condition`
     * @param value The value to coerce
     * @returns The condition
     */
    public static from<T>(value: T): T & Arg {
        return value instanceof Arg ? value :
            value === undefined ? Arg.undefined() :
            value === null ? Arg.null() :
            <any>new Arg(v => is(v, value), JSON.stringify(value));
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