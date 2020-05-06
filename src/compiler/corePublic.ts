namespace ts {
    // WARNING: The script `configurePrerelease.ts` uses a regexp to parse out these values.
    // If changing the text in this section, be sure to test `configurePrerelease` too.
    export const versionMajorMinor = "4.0";
    /** The version of the TypeScript compiler release */
    export const version = `${versionMajorMinor}.0-dev`;

    /**
     * Type of objects whose values are all of the same type.
     * The `in` and `for-in` operators can *not* be safely used,
     * since `Object.prototype` may be modified by outside code.
     */
    export interface MapLike<T> {
        [index: string]: T;
    }

    export interface SortedReadonlyArray<T> extends ReadonlyArray<T> {
        " __sortedArrayBrand": any;
    }

    export interface SortedArray<T> extends Array<T> {
        " __sortedArrayBrand": any;
    }

    /** ES6 Map interface, only read methods included. */
    export interface ReadonlyMap<T> {
        get(key: string): T | undefined;
        has(key: string): boolean;
        forEach(action: (value: T, key: string) => void): void;
        readonly size: number;
        keys(): Iterator<string>;
        values(): Iterator<T>;
        entries(): Iterator<[string, T]>;
    }

    /** ES6 Map interface. */
    export interface Map<T> extends ReadonlyMap<T> {
        set(key: string, value: T): this;
        delete(key: string): boolean;
        clear(): void;
    }

    /* @internal */
    export interface MapConstructor {
        // eslint-disable-next-line @typescript-eslint/prefer-function-type
        new <T>(): Map<T>;
    }

    /**
     * Returns the native Map implementation if it is available and compatible (i.e. supports iteration).
     */
    /* @internal */
    export function tryGetNativeMap(): MapConstructor | undefined {
        // Internet Explorer's Map doesn't support iteration, so don't use it.
        // Natives
        // NOTE: TS doesn't strictly allow in-line declares, but if we suppress the error, the declaration
        // is still used for typechecking _and_ correctly elided, which is out goal, as this prevents us from
        // needing to pollute an outer scope with a declaration of `Map` just to satisfy the checks in this function
        //@ts-ignore
        declare const Map: (new <T>() => Map<T>) | undefined;
        // eslint-disable-next-line no-in-operator
        return typeof Map !== "undefined" && "entries" in Map.prototype ? Map : undefined;
    }

    /* @internal */
    export const Map: MapConstructor = tryGetNativeMap() || (() => {
        // NOTE: createMapShim will be defined for typescriptServices.js but not for tsc.js, so we must test for it.
        if (typeof createMapShim === "function") {
            return createMapShim();
        }
        throw new Error("TypeScript requires an environment that provides a compatible native Map implementation.");
    })();

    /** ES6 Iterator type. */
    export interface Iterator<T> {
        next(): { value: T, done?: false } | { value: never, done: true };
    }

    /** Array that is only intended to be pushed to, never read. */
    export interface Push<T> {
        push(...values: T[]): void;
    }

    /* @internal */
    export type EqualityComparer<T> = (a: T, b: T) => boolean;

    /* @internal */
    export type Comparer<T> = (a: T, b: T) => Comparison;

    /* @internal */
    export const enum Comparison {
        LessThan    = -1,
        EqualTo     = 0,
        GreaterThan = 1
    }
}