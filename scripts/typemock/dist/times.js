"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Defines the number of times an action must have been executed during verification of a Mock.
 */
class Times {
    constructor(min, max, message) {
        this._min = min;
        this._max = max;
        this._message = message;
    }
    /**
     * Expects that an action was never executed.
     * @returns A new `Times` instance.
     */
    static none() {
        return this._none || (this._none = new Times(0, 0, `never`));
    }
    /**
     * Expects that an action was executed exactly once.
     * @returns A new `Times` instance.
     */
    static once() {
        return this._once || (this._once = new Times(1, 1, `exactly once`));
    }
    /**
     * Expects that an action was executed at least once.
     * @returns A new `Times` instance.
     */
    static atLeastOnce() {
        return this._atLeastOnce || (this._atLeastOnce = new Times(1, Number.MAX_SAFE_INTEGER, `at least once`));
    }
    /**
     * Expects that an action was executed at least the specified number of times.
     * @param count The number of times.
     * @returns A new `Times` instance.
     */
    static atLeast(count) {
        return new Times(count, Number.MAX_SAFE_INTEGER, `at least ${count} time(s)`);
    }
    /**
     * Expects that an action was executed exactly the specified number of times.
     * @param count The number of times.
     * @returns A new `Times` instance.
     */
    static exactly(count) {
        return new Times(count, count, `exactly ${count} time(s)`);
    }
    /**
     * Expects that an action was executed at most the specified number of times.
     * @param count The number of times.
     * @returns A new `Times` instance.
     */
    static atMost(count) {
        return new Times(0, count, `at most ${count} time(s)`);
    }
    /**
     * Expects that an action was executed at most once.
     * @returns A new `Times` instance.
     */
    static atMostOnce() {
        return this._atMostOnce || (this._atMostOnce = new Times(0, 1, `at most once`));
    }
    /**
     * Expects that an action was executed between a range of times, inclusive.
     * @param min The minimum number of times, inclusive.
     * @param max The maximum number of times, inclusive.
     * @returns A new `Times` instance.
     */
    static between(min, max) {
        return new Times(min, max, `between ${min} and ${max} time(s)`);
    }
    /**
     * Validates the number of times an action was executed.
     * @param count The number of times the action was executed.
     * @returns `true` if the provided count was valid; otherwise, `false`.
     */
    validate(count) {
        if (count < this._min)
            return false;
        if (count > this._max)
            return false;
        return true;
    }
    /**
     * Checks the number of times an action was executed, throwing an error if the count was not valid.
     * @param count The number of times the action was executed.
     * @param message The message to use to begin the check.
     */
    check(count, message) {
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
    toString() {
        return `<${this._message}>`;
    }
}
exports.Times = Times;

//# sourceMappingURL=times.js.map
