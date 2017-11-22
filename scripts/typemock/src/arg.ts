/**
 * Represents an argument condition used during verification.
 */
export class Arg {
    private _condition: (value: any, args: ReadonlyArray<any>, index: number) => { valid: boolean, next?: number };
    private _message: string;

    private constructor(condition: (value: any, args: ReadonlyArray<any>, index: number) => { valid: boolean, next?: number }, message: string) {
        this._condition = condition;
        this._message = message;
    }

    /**
     * Allows any value.
     */
    public static any<T = any>(): T & Arg {
        return <any>new Arg(() => ({ valid: true }), `any`);
    }

    /**
     * Allows a value that matches the specified condition.
     * @param match The condition used to match the value.
     */
    public static is<T = any>(match: (value: T) => boolean): T & Arg {
        return <any>new Arg(value => ({ valid: match(value) }), `is`);
    }

    /**
     * Allows only a null value.
     */
    public static null<T = any>(): T & Arg {
        return <any>new Arg(value => ({ valid: value === null }), `null`);
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
        return <any>new Arg(value => ({ valid: value === undefined }), `undefined`);
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

    /**
     * Allows any value within the provided range.
     * @param min The minimum value.
     * @param max The maximum value.
     */
    public static between<T = any>(min: T, max: T): T & Arg {
        return <any>new Arg(value => ({ valid: min <= value && value <= max }), `between ${min} and ${max}`);
    }

    /**
     * Allows any value in the provided array.
     */
    public static in<T = any>(values: T[]): T & Arg {
        return <any>new Arg(value => ({ valid: values.indexOf(value) > -1 }), `in ${values.join(", ")}`);
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
        return <any>new Arg(value => ({ valid: pattern.test(value) }), `matches ${pattern}`);
    }

    public static startsWith(text: string): string & Arg {
        return <any>new Arg(value => ({ valid: String(value).startsWith(text) }), `starts with ${text}`);
    }

    public static endsWith(text: string): string & Arg {
        return <any>new Arg(value => ({ valid: String(value).endsWith(text) }), `ends with ${text}`);
    }

    public static includes(text: string): string & Arg {
        return <any>new Arg(value => ({ valid: String(value).includes(text) }), `contains ${text}`);
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
        return <any>new Arg(value => ({ valid: typeof value === tag }), `typeof ${tag}`);
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
        return <any>new Arg(value => ({ valid: value instanceof type }), `instanceof ${type.name}`);
    }

    /**
     * Allows any value that has the provided property names in its prototype chain.
     */
    public static has<T>(...names: string[]): T & Arg {
        return <any>new Arg(value => ({ valid: names.filter(name => name in value).length === names.length }), `has ${names.join(", ")}`);
    }

    /**
     * Allows any value that has the provided property names on itself but not its prototype chain.
     */
    public static hasOwn<T>(...names: string[]): T & Arg {
        return <any>new Arg(value => ({ valid: names.filter(name => Object.prototype.hasOwnProperty.call(value, name)).length === names.length }), `hasOwn ${names.join(", ")}`);
    }

    /**
     * Allows any value that matches the provided condition for the rest of the arguments in the call.
     * @param condition The optional condition for each other element.
     */
    public static rest<T>(condition?: T | (T & Arg)): T & Arg {
        if (condition === undefined) {
            return <any>new Arg((_, args) => ({ valid: true, next: args.length }), `rest`);
        }

        const arg = Arg.from(condition);
        return <any>new Arg(
            (_, args, index) => {
                while (index < args.length) {
                    const { valid, next } = Arg.validate(arg, args, index);
                    if (!valid) return { valid: false };
                    index = typeof next === "undefined" ? index + 1 : next;
                }
                return { valid: true, next: index };
            },
            `rest ${arg._message}`
        );
    }

    /**
     * Negates a condition.
     */
    public static not<T = any>(value: T | (T & Arg)): T & Arg {
        const arg = Arg.from(value);
        return <any>new Arg((value, args, index) => {
            const result = arg._condition(value, args, index);
            return { valid: !result.valid, next: result.next };
        }, `not ${arg._message}`);
    }

    /**
     * Combines conditions, where all conditions must be `true`.
     */
    public static and<T = any>(...args: ((T & Arg) | T)[]): T & Arg {
        const conditions = args.map(Arg.from);
        return <any>new Arg((value, args, index) => {
            for (const condition of conditions) {
                const result = condition._condition(value, args, index);
                if (!result.valid) return { valid: false };
            }
            return { valid: true };
        }, conditions.map(condition => condition._message).join(" and "));
    }

    /**
     * Combines conditions, where no condition may be `true`.
     */
    public static nand<T = any>(...args: ((T & Arg) | T)[]): T & Arg {
        return this.not(this.and(...args));
    }

    /**
     * Combines conditions, where any conditions may be `true`.
     */
    public static or<T = any>(...args: ((T & Arg) | T)[]): T & Arg {
        const conditions = args.map(Arg.from);
        return <any>new Arg((value, args, index) => {
            for (const condition of conditions) {
                const result = condition._condition(value, args, index);
                if (result.valid) return { valid: true };
            }
            return { valid: false };
        }, conditions.map(condition => condition._message).join(" or "));
    }

    /**
     * Combines conditions, where all conditions must be `true`.
     */
    public static nor<T = any>(...args: ((T & Arg) | T)[]): T & Arg {
        return this.not(this.or(...args));
    }

    /**
     * Ensures the value is a `Condition`
     * @param value The value to coerce
     * @returns The condition
     */
    public static from<T>(value: T): T & Arg {
        if (value instanceof Arg) {
            return value;
        }

        return <any>new Arg(v => ({ valid: is(v, value) }), JSON.stringify(value));
    }

    /**
     * Validates the arguments against the condition.
     * @param args The arguments for the execution
     * @param index The current index into the `args` array
     * @returns An object that specifies whether the condition is `valid` and what the `next` index should be.
     */
    public static validate(arg: Arg, args: ReadonlyArray<any>, index: number): { valid: boolean, next?: number } {
        const value = index >= 0 && index < args.length ? args[index] : undefined;
        const { valid, next } = arg._condition(value, args, index);
        return valid
            ? { valid: true, next: next === undefined ? index + 1 : next }
            : { valid: false };
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