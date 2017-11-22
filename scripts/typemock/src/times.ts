/**
 * Defines the number of times an action must have been executed during verification of a Mock.
 */
export class Times {
    private static _none: Times | undefined;
    private static _once: Times | undefined;
    private static _atLeastOnce: Times | undefined;
    private static _atMostOnce: Times | undefined;

    private _min: number;
    private _max: number;
    private _message: string;

    private constructor(min: number, max: number, message: string) {
        this._min = min;
        this._max = max;
        this._message = message;
    }

    /**
     * Expects that an action was never executed.
     * @returns A new `Times` instance.
     */
    public static none(): Times {
        return this._none || (this._none = new Times(0, 0, `never`));
    }

    /**
     * Expects that an action was executed exactly once.
     * @returns A new `Times` instance.
     */
    public static once(): Times {
        return this._once || (this._once = new Times(1, 1, `exactly once`));
    }

    /**
     * Expects that an action was executed at least once.
     * @returns A new `Times` instance.
     */
    public static atLeastOnce(): Times {
        return this._atLeastOnce || (this._atLeastOnce = new Times(1, Number.MAX_SAFE_INTEGER, `at least once`));
    }

    /**
     * Expects that an action was executed at least the specified number of times.
     * @param count The number of times.
     * @returns A new `Times` instance.
     */
    public static atLeast(count: number): Times {
        return new Times(count, Number.MAX_SAFE_INTEGER, `at least ${count} time(s)`);
    }

    /**
     * Expects that an action was executed exactly the specified number of times.
     * @param count The number of times.
     * @returns A new `Times` instance.
     */
    public static exactly(count: number): Times {
        return new Times(count, count, `exactly ${count} time(s)`);
    }

    /**
     * Expects that an action was executed at most the specified number of times.
     * @param count The number of times.
     * @returns A new `Times` instance.
     */
    public static atMost(count: number): Times {
        return new Times(0, count, `at most ${count} time(s)`);
    }

    /**
     * Expects that an action was executed at most once.
     * @returns A new `Times` instance.
     */
    public static atMostOnce(): Times {
        return this._atMostOnce || (this._atMostOnce = new Times(0, 1, `at most once`));
    }

    /**
     * Expects that an action was executed between a range of times, inclusive.
     * @param min The minimum number of times, inclusive.
     * @param max The maximum number of times, inclusive.
     * @returns A new `Times` instance.
     */
    public static between(min: number, max: number): Times {
        return new Times(min, max, `between ${min} and ${max} time(s)`);
    }

    /**
     * Validates the number of times an action was executed.
     * @param count The number of times the action was executed.
     * @returns `true` if the provided count was valid; otherwise, `false`.
     */
    public validate(count: number): boolean {
        if (count < this._min) return false;
        if (count > this._max) return false;
        return true;
    }

    /**
     * Checks the number of times an action was executed, throwing an error if the count was not valid.
     * @param count The number of times the action was executed.
     * @param message The message to use to begin the check.
     */
    public check(count: number, message: string): void {
        if (!this.validate(count)) {
            const expectedMessage = this._message === `never`
                ? `Expected to never be executed.`
                : `Expected to be executed ${this._message}.`;
            throw new Error(`${message}\n${expectedMessage} Actually executed ${count} time(s).`);
        }
    }

    /**
     * Gets the string representation of this object.
     */
    public toString(): string {
        return `<${this._message}>`;
    }
}
