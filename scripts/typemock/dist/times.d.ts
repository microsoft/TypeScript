/**
 * Defines the number of times an action must have been executed during verification of a Mock.
 */
export declare class Times {
    private static _none;
    private static _once;
    private static _atLeastOnce;
    private static _atMostOnce;
    private _min;
    private _max;
    private _message;
    private constructor();
    /**
     * Expects that an action was never executed.
     * @returns A new `Times` instance.
     */
    static none(): Times;
    /**
     * Expects that an action was executed exactly once.
     * @returns A new `Times` instance.
     */
    static once(): Times;
    /**
     * Expects that an action was executed at least once.
     * @returns A new `Times` instance.
     */
    static atLeastOnce(): Times;
    /**
     * Expects that an action was executed at least the specified number of times.
     * @param count The number of times.
     * @returns A new `Times` instance.
     */
    static atLeast(count: number): Times;
    /**
     * Expects that an action was executed exactly the specified number of times.
     * @param count The number of times.
     * @returns A new `Times` instance.
     */
    static exactly(count: number): Times;
    /**
     * Expects that an action was executed at most the specified number of times.
     * @param count The number of times.
     * @returns A new `Times` instance.
     */
    static atMost(count: number): Times;
    /**
     * Expects that an action was executed at most once.
     * @returns A new `Times` instance.
     */
    static atMostOnce(): Times;
    /**
     * Expects that an action was executed between a range of times, inclusive.
     * @param min The minimum number of times, inclusive.
     * @param max The maximum number of times, inclusive.
     * @returns A new `Times` instance.
     */
    static between(min: number, max: number): Times;
    /**
     * Validates the number of times an action was executed.
     * @param count The number of times the action was executed.
     * @returns `true` if the provided count was valid; otherwise, `false`.
     */
    validate(count: number): boolean;
    /**
     * Checks the number of times an action was executed, throwing an error if the count was not valid.
     * @param count The number of times the action was executed.
     * @param message The message to use to begin the check.
     */
    check(count: number, message: string): void;
    /**
     * Gets the string representation of this object.
     */
    toString(): string;
}
