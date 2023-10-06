import { spin } from "./spinWait";
import { Shared, SharedStructBase } from "../sharing/structs/sharedStruct";

/**
 * Atomically read and write a shared value. While this isn't strictly necessary as `Atomics` methods can be used
 * directly, it provides a convenient mechanism for updating fields marked with the TypeScript `private` keyword.
 * @internal
 */
@Shared()
export class AtomicValue<T extends Shareable> extends SharedStructBase {
    /**
     * The held value. It is not recommended to read or write from this field directly as such operations are neither
     * atomic nor sequentially consistent. Instead, you should use {@link AtomicValue.load} and {@link AtomicValue.store}.
     */
    @Shared() unsafeValue: T;

    constructor(value: T) {
        super();
        this.unsafeValue = value;
    }

    /**
     * Atomically loads and returns the underlying value. This operation is guaranteed to be sequentially consistent
     * across multiple threads/agents.
     */
    static load<T extends Shareable>(self: AtomicValue<T>) {
        return Atomics.load(self, "unsafeValue");
    }

    /**
     * Atomically replaces the underlying value with the provided value. This operation is guaranteed to be sequentially
     * consistent across multiple threads/agents.
     */
    static store<T extends Shareable>(self: AtomicValue<T>, value: T) {
        Atomics.store(self, "unsafeValue", value);
    }

    /**
     * Atomically replaces the underlying value with the provided value, returning the previous value as a
     * read-modify-write operation. This operation is guaranteed to be sequentially consistent across multiple
     * threads/agents.
     */
    static exchange<T extends Shareable>(self: AtomicValue<T>, value: T) {
        return Atomics.exchange(self, "unsafeValue", value);
    }

    /**
     * Atomically replaces the underlying value with the provided replacement value if the underling value and expected
     * value are the same, returning the previous value as a read-modify-write operation. This operation is guaranteed
     * to be sequentially consistent across multiple threads/agents.
     */
    static compareExchange<T extends Shareable>(self: AtomicValue<T>, expectedValue: T, replacementValue: T) {
        return Atomics.compareExchange(self, "unsafeValue", expectedValue, replacementValue);
    }

    static compareAndSet<T extends Shareable>(self: AtomicValue<T>, expectedValue: T, replacementValue: T) {
        return expectedValue === AtomicValue.compareExchange(self, expectedValue, replacementValue);
    }

    /**
     * Performs 32-bit signed integer addition via an atomic read-modify-write operation.
     * @returns the value prior to addition.
     */
    static add(self: AtomicValue<number>, value: number) {
        let spinCounter = 0;
        let currentValue = AtomicValue.load(self);
        while (currentValue !== AtomicValue.compareExchange(self, currentValue, (currentValue + value) >> 0)) {
            spinCounter = spin(spinCounter);
            currentValue = AtomicValue.load(self);
        }
        return currentValue;
    }

    /**
     * Performs 32-bit signed integer subtraction via an atomic read-modify-write operation.
     * @returns the value prior to subtraction.
     */
    static sub(self: AtomicValue<number>, value: number) {
        let spinCounter = 0;
        let currentValue = AtomicValue.load(self);
        while (currentValue !== AtomicValue.compareExchange(self, currentValue, (currentValue - value) >> 0)) {
            spinCounter = spin(spinCounter);
            currentValue = AtomicValue.load(self);
        }
        return currentValue;
    }

    /**
     * Atomically increments a 32-bit signed integer value.
     * @returns the value prior to subtraction.
     */
    static increment(self: AtomicValue<number>) {
        return AtomicValue.add(self, 1);
    }

    /**
     * Atomically decrements a 32-bit signed integer value.
     * @returns the value prior to subtraction.
     */
    static decrement(self: AtomicValue<number>) {
        return AtomicValue.sub(self, 1);
    }
}

/**
 * A non-shared wrapper for an {@link AtomicValue}.
 * @internal
 */
export class AtomicRef<T extends Shareable> implements Disposable {
    private _value: AtomicValue<T> | undefined;

    constructor(value: AtomicValue<T> | undefined) {
        this._value = value;
    }

    get disposed() {
        return !this._value;
    }

    get value() {
        if (!this._value) throw new ReferenceError("Object is disposed");
        return AtomicValue.load(this._value);
    }

    set value(value) {
        if (!this._value) throw new ReferenceError("Object is disposed");
        AtomicValue.store(this._value, value);
    }

    unsafeGet() {
        if (!this._value) throw new ReferenceError("Object is disposed");
        return this._value.unsafeValue;
    }

    unsafeSet(value: T) {
        if (!this._value) throw new ReferenceError("Object is disposed");
        this._value.unsafeValue = value;
    }

    exchange(value: T) {
        if (!this._value) throw new ReferenceError("Object is disposed");
        return AtomicValue.exchange(this._value, value);
    }

    compareExchange(expectedValue: T, replacementValue: T) {
        if (!this._value) throw new ReferenceError("Object is disposed");
        return AtomicValue.compareExchange(this._value, expectedValue, replacementValue);
    }

    increment(this: AtomicRef<number>) {
        if (!this._value) throw new ReferenceError("Object is disposed");
        return AtomicValue.increment(this._value);
    }

    decrement(this: AtomicRef<number>) {
        if (!this._value) throw new ReferenceError("Object is disposed");
        return AtomicValue.decrement(this._value);
    }

    add(this: AtomicRef<number>, value: number) {
        if (!this._value) throw new ReferenceError("Object is disposed");
        return AtomicValue.add(this._value, value);
    }

    sub(this: AtomicRef<number>, value: number) {
        if (!this._value) throw new ReferenceError("Object is disposed");
        return AtomicValue.sub(this._value, value);
    }

    dispose() {
        this._value = undefined;
    }

    [Symbol.dispose]() {
        this._value = undefined;
    }
}