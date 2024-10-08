function canonicalNumericIndexString(argument: string) {
    if (argument === "-0") {
        return -0;
    }
    const n = Number(argument);
    if (String(n) === argument) {
        return n;
    }
    return undefined;
}

function isValidIntegerIndex(argument: string | symbol) {
    if (typeof argument === "string") {
        const index = canonicalNumericIndexString(argument);
        if (index !== undefined && Number.isInteger(index)) {
            return true;
        }
    }
    return false;
}

const readonlyArrayViewBrand = new WeakSet<object>();
const readonlyArrayViewData = new WeakMap<readonly unknown[], { source: readonly unknown[], mapper: (value: any) => any}>();
const readonlyArrayViewHandler: ProxyHandler<readonly unknown[]> = {
    defineProperty(o, p, desc) {
        if (p === "length" || isValidIntegerIndex(p)) {
            const { source, mapper } = readonlyArrayViewData.get(o)!;
            const existing = Reflect.getOwnPropertyDescriptor(source, p);
            if (!existing) {
                return false;
            }
            if (p !== "length") {
                existing.value = mapper(existing.value);
            }
            return existing.get === desc.get &&
                existing.set === desc.set &&
                existing.configurable === desc.configurable &&
                existing.enumerable === desc.enumerable &&
                existing.writable === desc.writable &&
                existing.value === desc.value;
        }
        return Reflect.defineProperty(o, p, desc);
    },
    getOwnPropertyDescriptor(o, p) {
        const { source, mapper } = readonlyArrayViewData.get(o)!;
        if (p === "length") {
            return Reflect.getOwnPropertyDescriptor(source, p);
        }
        if (isValidIntegerIndex(p)) {
            const existing = Reflect.getOwnPropertyDescriptor(source, p);
            if (existing?.value !== undefined) {
                existing.value = mapper(existing.value);
            }
            return existing;
        }
        return Reflect.getOwnPropertyDescriptor(o, p);
    },
    has(o, p) {
        const { source } = readonlyArrayViewData.get(o)!;
        if (p === "length" || isValidIntegerIndex(p)) {
            return Reflect.has(source, p);
        }
        return Reflect.has(o, p);
    },
    get(o, p, receiver) {
        const { source, mapper } = readonlyArrayViewData.get(o)!;
        if (p === "length") {
            return Reflect.get(source, p, receiver);
        }
        if (isValidIntegerIndex(p)) {
            const value = Reflect.get(source, p, receiver);
            return value !== undefined ? mapper(value) : value;
        }
        return Reflect.get(o, p, receiver);
    },
    set(o, p, v, receiver) {
        if (p === "length" || isValidIntegerIndex(p)) {
            return false;
        }
        return Reflect.set(o, p, v, receiver);
    },
    deleteProperty(o, p) {
        if (p === "length" || isValidIntegerIndex(p)) {
            return false;
        }
        return Reflect.deleteProperty(o, p);
    },
    preventExtensions(_o) {
        return false;
    },
};

/** @internal */
export interface ReadonlyArrayView<U> extends ReadonlyArray<U> {
    _readonlyArrayViewBrand: any;
}

/** @internal */
export interface ReadonlyArrayViewConstructor {
    new <T, U>(source: readonly T[], mapper: (value: T) => U): ReadonlyArrayView<U>;
    isReadonlyArrayView(obj: unknown): obj is ReadonlyArrayView<unknown>;
}

/** @internal */
// eslint-disable-next-line local/only-arrow-functions
export const ReadonlyArrayView = function <T, U>(source: readonly T[], mapper: (value: T) => U) {
    const array: readonly U[] = [];
    const proxy = new Proxy<readonly any[]>(array, readonlyArrayViewHandler);
    readonlyArrayViewData.set(array, { source, mapper });
    readonlyArrayViewBrand.add(proxy);
    return proxy;
} as unknown as ReadonlyArrayViewConstructor;

ReadonlyArrayView.isReadonlyArrayView = (obj): obj is ReadonlyArrayView<unknown> => {
    return typeof obj === "object" && !!obj && readonlyArrayViewBrand.has(obj);
};
