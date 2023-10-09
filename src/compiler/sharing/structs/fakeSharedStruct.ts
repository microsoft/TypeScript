import { isNull } from "../../core";

// can only contain shareable primitives and other shared structs.
const allFakeSharedStructInstances = new WeakSet<object>();
const allFakeSharedArrayInstances = new WeakSet<object>();

// Emulates the behavior of the Shared Structs origin trial, for forwards compatibility.
const proxyHandler: ProxyHandler<object> = {
    set(target, p, value, receiver) {
        switch (typeof value) {
            case "undefined":
            case "string":
            case "number":
            case "boolean":
                break;
            case "object":
                if (isNull(value) || allFakeSharedStructInstances.has(value) || allFakeSharedArrayInstances.has(value)) { // eslint-disable-line no-null/no-null
                    break;
                }
                // falls through
            default:
                throw new TypeError("value not shareable");
        }
        return Reflect.set(target, p, value, receiver);
    },
    defineProperty(target, property, attributes) {
        const { value } = attributes;
        switch (typeof value) {
            case "undefined":
            case "string":
            case "number":
            case "boolean":
                break;
            case "object":
                if (isNull(value) || allFakeSharedStructInstances.has(value) || allFakeSharedArrayInstances.has(value)) { // eslint-disable-line no-null/no-null
                    break;
                }
                // falls through
            default:
                throw new TypeError("value not shareable");
        }
        return Reflect.defineProperty(target, property, attributes);
    },
};

/**
 * Creates a new fake SharedStructType constructor that emulates fixed-shape object behavior, though the result can't
 * actually be shared across threads. Fake shared structs are useful in single-threaded scenarios when SharedStructType
 * isn't available and allows us to write single threaded code that is forwards-compatible with eventual multi-threaded
 * code.
 * @internal
 */
export const FakeSharedStructType = class FakeSharedStructType {
    constructor(fields: readonly string[]) {
        const thisFakeSharedStructInstances = new WeakSet<object>();
        class FakeSharedStruct { // eslint-disable-line @typescript-eslint/no-unsafe-declaration-merging
            constructor() {
                // Fields must be explicitly defined and are not configurable.
                for (const field of fields) {
                    Object.defineProperty(this, field, {
                        enumerable: false,
                        configurable: false,
                        writable: true,
                        value: undefined
                    });
                }
                Object.setPrototypeOf(this, null); // eslint-disable-line no-null/no-null
                Object.preventExtensions(this);

                const fakeSharedStruct = new Proxy(this, proxyHandler);
                allFakeSharedStructInstances.add(fakeSharedStruct);
                thisFakeSharedStructInstances.add(fakeSharedStruct);
                return fakeSharedStruct as this;
            }

            static [Symbol.hasInstance](value: unknown) {
                try {
                    return typeof value === "object" && !isNull(value) && thisFakeSharedStructInstances.has(value);
                }
                catch {
                    return false;
                }
            }
        }

        // augment the interface with the brand from `SharedStruct`.
        interface FakeSharedStruct extends SharedStruct { // eslint-disable-line @typescript-eslint/no-unsafe-declaration-merging
        }

        Object.setPrototypeOf(FakeSharedStruct.prototype, null); // eslint-disable-line no-null/no-null
        return FakeSharedStruct;
    }

    static isSharedStruct(value: unknown): value is SharedStruct {
        try {
            return typeof value === "object" && !isNull(value) && allFakeSharedStructInstances.has(value);
        }
        catch {
            return false;
        }
    }
} as SharedStructTypeConstructor;

/**
 * Creates a new fake SharedArray constructor that emulates fixed-shape object behavior, though the result can't
 * actually be shared across threads. Fake shared structs are useful in single-threaded scenarios when SharedStructType
 * isn't available and allows us to write single threaded code that is forwards-compatible with eventual multi-threaded
 * code.
 * @internal
 */
export const FakeSharedArray = class FakeSharedArray {
    constructor(length: number) {
        for (let i = 0; i < length; i++) {
            Object.defineProperty(this, i, {
                enumerable: false,
                configurable: false,
                writable: true,
                value: undefined
            });
        }
        Object.defineProperty(this, "length", {
            enumerable: false,
            configurable: false,
            writable: false,
            value: length
        });
        Object.setPrototypeOf(this, null); // eslint-disable-line no-null/no-null
        Object.preventExtensions(this);

        const fakeSharedArray = new Proxy(this, proxyHandler);
        allFakeSharedArrayInstances.add(fakeSharedArray);
        return fakeSharedArray as this;
    }

    static [Symbol.hasInstance](value: unknown) {
        try {
            return typeof value === "object" && !isNull(value) && allFakeSharedArrayInstances.has(value);
        }
        catch {
            return false;
        }
    }
} as SharedArrayConstructor;
