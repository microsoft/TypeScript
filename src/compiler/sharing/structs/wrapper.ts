import { Debug } from "../../debug";

/**
 * Used in a `declare` instance field of a struct type to override the type we use for a wrapper object generated for
 * the struct. We do this because we cannot properly infer correct generic instantiations from generic static methods.
 * This declaration intentionally does not produce an actual value as it should only be used in an ambient context.
 * @internal
 */
export declare const StructWrapperTypes: unique symbol;

/** @internal */
export type StructWrapper<TInstance extends SharedStruct, TStatics extends object> =
    TInstance extends { [StructWrapperTypes]: infer T extends [any, any][] } ?
        T[number] extends [TStatics, infer U] ? U :
        SynthesizedStructWrapper<TInstance, TStatics> :
    SynthesizedStructWrapper<TInstance, TStatics>;

type SynthesizedStructInstanceFields<TInstance extends SharedStruct> = {
    [P in keyof TInstance & string as Exclude<P, "__tag__" | "__hash__">]: TInstance[P];
};

type SynthesizedStructInstanceMethods<TInstance extends SharedStruct, TStatics extends object> = {
    [P in keyof TStatics & string as TStatics[P] extends (self: TInstance, ...args: any) => any ? Exclude<P, `_${string}`> : never]:
    TStatics[P] extends (self: TInstance, ...args: infer A) => infer R ? (...args: A) => R : never;
};

type SynthesizedStructWrapper<TInstance extends SharedStruct, TStatics extends object> =
    & SynthesizedStructInstanceFields<TInstance>
    & SynthesizedStructInstanceMethods<TInstance, TStatics>
    ;

/**
 * Generates a simple, shallow proxy for a shared struct that treats static methods as instance methods with the first
 * parameter bound to the instance.
 * @internal
 */
export function wrapStruct<TInstance extends SharedStruct, TStatics extends object>(instance: TInstance, statics: TStatics): StructWrapper<TInstance, TStatics> {
    const wrapper = {} as any;
    for (const key of Reflect.ownKeys(instance) as Iterable<keyof TInstance>) {
        if (typeof key !== "string") continue;
        if (key === "__tag__" || key == "__hash__") continue;
        Object.defineProperty(wrapper, key, {
            enumerable: true,
            configurable: false,
            get: () => instance[key],
            set: (value: TInstance[typeof key]) => instance[key] = value
        });
    }

    for (const key of Reflect.ownKeys(statics) as Iterable<keyof TStatics>) {
        if (typeof key !== "string") continue;
        if (key.startsWith("_")) continue;
        const value = statics[key];
        if (typeof value !== "function") continue;
        if (Object.prototype.hasOwnProperty.call(value, key)) Debug.fail(`static method name '${key}' conflicts with same named instance field`);
        Object.defineProperty(wrapper, key, {
            enumerable: false,
            configurable: false,
            writable: false,
            value: value.bind(/*thisArg*/ undefined, instance)
        });
    }

    return wrapper as StructWrapper<TInstance, TStatics>;
}
