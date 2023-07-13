//// [tests/cases/compiler/esNextWeakRefs_IterableWeakMap.ts] ////

//// [esNextWeakRefs_IterableWeakMap.ts]
/** `static #cleanup` */
const IterableWeakMap_cleanup = ({ ref, set }: {
    readonly ref: WeakRef<object>;
    readonly set: Set<WeakRef<object>>;
}) => {
    set.delete(ref);
};

// Based on: https://github.com/tc39/proposal-weakrefs/blob/master/README.md#iterable-weakmaps
export class IterableWeakMap<K extends object, V> implements WeakMap<K, V> {
    declare readonly [Symbol.toStringTag]: "IterableWeakMap";

    #weakMap = new WeakMap<K, { readonly ref: WeakRef<K>; value: V }>();
    #refSet = new Set<WeakRef<K>>();
    #finalizationGroup = new FinalizationRegistry(IterableWeakMap_cleanup);

    constructor(iterable: Iterable<[key: K, value: V]> | null = null) {
        if (iterable !== null) {
            for (const { 0: key, 1: value } of iterable) {
                this.set(key, value);
            }
        }
    }

    set(key: K, value: V): this {
        const entry = this.#weakMap.get(key);
        if (entry !== undefined) {
            entry.value = value;
        } else {
            const ref = new WeakRef(key);

            this.#weakMap.set(key, { ref, value });
            this.#refSet.add(ref);
            this.#finalizationGroup.register(key, {
                set: this.#refSet,
                ref,
            }, ref);
        }
        return this;
    }

    has(key: K): boolean {
        return this.#weakMap.has(key);
    }

    get(key: K): V | undefined {
        return this.#weakMap.get(key)?.value;
    }

    delete(key: K): boolean {
        const entry = this.#weakMap.get(key);
        if (entry === undefined) {
            return false;
        }

        const { ref } = entry;
        this.#weakMap.delete(key);
        this.#refSet.delete(ref);
        this.#finalizationGroup.unregister(ref);
        return true;
    }

    declare [Symbol.iterator]: this["entries"];
    *entries(): Generator<[key: K, value: V], void> {
        for (const ref of this.#refSet) {
            const key = ref.deref();
            if (key === undefined) continue;
            const { value } = this.#weakMap.get(key)!;
            yield [key, value];
        }
    }

    *keys() {
        for (const { 0: key } of this) {
            yield key;
        }
    }

    *values() {
        for (const { 1: value } of this) {
            yield value;
        }
    }
}

Object.defineProperties(IterableWeakMap.prototype, {
    [Symbol.iterator]: {
        configurable: true,
        enumerable: false,
        writable: true,
        value: Object.getOwnPropertyDescriptor(
            IterableWeakMap.prototype,
            "entries",
        )!.value,
    },
    [Symbol.toStringTag]: {
        configurable: true,
        enumerable: false,
        writable: false,
        value: "IterableWeakMap",
    },
});


//// [esNextWeakRefs_IterableWeakMap.js]
/** `static #cleanup` */
const IterableWeakMap_cleanup = ({ ref, set }) => {
    set.delete(ref);
};
// Based on: https://github.com/tc39/proposal-weakrefs/blob/master/README.md#iterable-weakmaps
export class IterableWeakMap {
    #weakMap = new WeakMap();
    #refSet = new Set();
    #finalizationGroup = new FinalizationRegistry(IterableWeakMap_cleanup);
    constructor(iterable = null) {
        if (iterable !== null) {
            for (const { 0: key, 1: value } of iterable) {
                this.set(key, value);
            }
        }
    }
    set(key, value) {
        const entry = this.#weakMap.get(key);
        if (entry !== undefined) {
            entry.value = value;
        }
        else {
            const ref = new WeakRef(key);
            this.#weakMap.set(key, { ref, value });
            this.#refSet.add(ref);
            this.#finalizationGroup.register(key, {
                set: this.#refSet,
                ref,
            }, ref);
        }
        return this;
    }
    has(key) {
        return this.#weakMap.has(key);
    }
    get(key) {
        return this.#weakMap.get(key)?.value;
    }
    delete(key) {
        const entry = this.#weakMap.get(key);
        if (entry === undefined) {
            return false;
        }
        const { ref } = entry;
        this.#weakMap.delete(key);
        this.#refSet.delete(ref);
        this.#finalizationGroup.unregister(ref);
        return true;
    }
    *entries() {
        for (const ref of this.#refSet) {
            const key = ref.deref();
            if (key === undefined)
                continue;
            const { value } = this.#weakMap.get(key);
            yield [key, value];
        }
    }
    *keys() {
        for (const { 0: key } of this) {
            yield key;
        }
    }
    *values() {
        for (const { 1: value } of this) {
            yield value;
        }
    }
}
Object.defineProperties(IterableWeakMap.prototype, {
    [Symbol.iterator]: {
        configurable: true,
        enumerable: false,
        writable: true,
        value: Object.getOwnPropertyDescriptor(IterableWeakMap.prototype, "entries").value,
    },
    [Symbol.toStringTag]: {
        configurable: true,
        enumerable: false,
        writable: false,
        value: "IterableWeakMap",
    },
});
