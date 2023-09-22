import { Shared, SharedStructBase } from "./structs/sharedStruct";

/** @internal */
@Shared()
export class AtomicValue<T extends Shareable> extends SharedStructBase {
    @Shared() unsafeValue: T;

    constructor(value: T) {
        super();
        this.unsafeValue = value;
    }

    static load<T extends Shareable>(self: AtomicValue<T>) {
        return Atomics.load(self, "unsafeValue");
    }

    static store<T extends Shareable>(self: AtomicValue<T>, value: T) {
        return Atomics.store(self, "unsafeValue", value);
    }

    static exchange<T extends Shareable>(self: AtomicValue<T>, value: T) {
        return Atomics.exchange(self, "unsafeValue", value);
    }

    static compareExchange<T extends Shareable>(self: AtomicValue<T>, expectedValue: T, replacementValue: T) {
        return Atomics.compareExchange(self, "unsafeValue", expectedValue, replacementValue);
    }

    static compareAndSet<T extends Shareable>(self: AtomicValue<T>, expectedValue: T, replacementValue: T) {
        return expectedValue === AtomicValue.compareExchange(self, expectedValue, replacementValue);
    }

    static add(self: AtomicValue<number>, value: number) {
        let currentValue = AtomicValue.load(self);
        while (!AtomicValue.compareAndSet(self, currentValue, (currentValue + value) >> 0)) {
            currentValue = AtomicValue.load(self);
        }
        return currentValue;
    }

    static sub(self: AtomicValue<number>, value: number) {
        let currentValue = AtomicValue.load(self);
        while (!AtomicValue.compareAndSet(self, currentValue, (currentValue - value) >> 0)) {
            currentValue = AtomicValue.load(self);
        }
        return currentValue;
    }

    static increment(self: AtomicValue<number>) {
        return AtomicValue.add(self, 1);
    }

    static decrement(self: AtomicValue<number>) {
        return AtomicValue.sub(self, 1);
    }
}

/** @internal */
export class AtomicRef<T extends Shareable> {
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