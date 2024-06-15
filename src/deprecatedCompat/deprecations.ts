import {
    hasProperty,
    UnionToIntersection,
    Version,
} from "./_namespaces/ts.js";
import { deprecate } from "./deprecate.js";

/** @internal */
export interface DeprecationOptions {
    message?: string;
    error?: boolean;
    since?: Version | string;
    warnAfter?: Version | string;
    errorAfter?: Version | string;
    typeScriptVersion?: Version | string;
    name?: string;
}

// The following are deprecations for the public API. Deprecated exports are removed from the compiler itself
// and compatible implementations are added here, along with an appropriate deprecation warning using
// the `@deprecated` JSDoc tag as well as the `deprecate` API.
//
// Deprecations fall into one of three categories:
//
// - "soft" - Soft deprecations are indicated with the `@deprecated` JSDoc Tag.
// - "warn" - Warning deprecations are indicated with the `@deprecated` JSDoc Tag and a diagnostic message (assuming a compatible host).
// - "error" - Error deprecations are either indicated with the `@deprecated` JSDoc tag and will throw a `TypeError` when invoked, or removed from the API entirely.
//
// Once we have determined enough time has passed after a deprecation has been marked as `"warn"` or `"error"`, it will be removed from the public API.

/**
 * Defines a list of overloads by ordinal
 *
 * @internal
 */
export type OverloadDefinitions = { readonly [P in number]: (...args: any[]) => any; };

/** A function that returns the ordinal of the overload that matches the provided arguments */
type OverloadBinder<T extends OverloadDefinitions> = (args: OverloadParameters<T>) => OverloadKeys<T> | undefined;

/**
 * Extracts the ordinals from an set of overload definitions.
 *
 * @internal
 */
export type OverloadKeys<T extends OverloadDefinitions> = Extract<keyof T, number>;

/**
 * Extracts a union of the potential parameter lists for each overload.
 *
 * @internal
 */
export type OverloadParameters<T extends OverloadDefinitions> = Parameters<{ [P in OverloadKeys<T>]: T[P]; }[OverloadKeys<T>]>;

// NOTE: the following doesn't work in TS 4.4 (the current LKG in main), so we have to use UnionToIntersection for now
// type OverloadFunction<T extends OverloadDefinitions, R extends ((...args: any[]) => any)[] = [], O = unknown> =
//     R["length"] extends keyof T ? OverloadFunction<T, [...R, T[R["length"]]], O & T[R["length"]]> :
//     unknown extends O ? never : O;
/**
 * Constructs an intersection of each overload in a set of overload definitions.
 *
 * @internal
 */
export type OverloadFunction<T extends OverloadDefinitions> = UnionToIntersection<T[keyof T]>;

/**
 * Maps each ordinal in a set of overload definitions to a function that can be used to bind its arguments.
 *
 * @internal
 */
export type OverloadBinders<T extends OverloadDefinitions> = { [P in OverloadKeys<T>]: (args: OverloadParameters<T>) => boolean | undefined; };

/**
 * Defines deprecations for specific overloads by ordinal.
 *
 * @internal
 */
export type OverloadDeprecations<T extends OverloadDefinitions> = { [P in OverloadKeys<T>]?: DeprecationOptions; };

/** @internal @knipignore */
export function createOverload<T extends OverloadDefinitions>(name: string, overloads: T, binder: OverloadBinders<T>, deprecations?: OverloadDeprecations<T>) {
    Object.defineProperty(call, "name", { ...Object.getOwnPropertyDescriptor(call, "name"), value: name });

    if (deprecations) {
        for (const key of Object.keys(deprecations)) {
            const index = +key as (keyof T & number);
            if (!isNaN(index) && hasProperty(overloads, `${index}`)) {
                overloads[index] = deprecate(overloads[index], { ...deprecations[index], name });
            }
        }
    }

    const bind = createBinder(overloads, binder);
    return call as OverloadFunction<T>;

    function call(...args: OverloadParameters<T>) {
        const index = bind(args);
        const fn = index !== undefined ? overloads[index] : undefined;
        if (typeof fn === "function") {
            return fn(...args);
        }
        throw new TypeError("Invalid arguments");
    }
}

function createBinder<T extends OverloadDefinitions>(overloads: T, binder: OverloadBinders<T>): OverloadBinder<T> {
    return args => {
        for (let i = 0; hasProperty(overloads, `${i}`) && hasProperty(binder, `${i}`); i++) {
            const fn = binder[i];
            if (fn(args)) {
                return i as OverloadKeys<T>;
            }
        }
    };
}

/** @internal */
export interface OverloadBuilder {
    overload<T extends OverloadDefinitions>(overloads: T): BindableOverloadBuilder<T>;
}

/** @internal */
export interface BindableOverloadBuilder<T extends OverloadDefinitions> {
    bind(binder: OverloadBinders<T>): BoundOverloadBuilder<T>;
}

/** @internal */
export interface FinishableOverloadBuilder<T extends OverloadDefinitions> {
    finish(): OverloadFunction<T>;
}

/** @internal */
export interface BoundOverloadBuilder<T extends OverloadDefinitions> extends FinishableOverloadBuilder<T> {
    deprecate(deprecations: OverloadDeprecations<T>): FinishableOverloadBuilder<T>;
}

// NOTE: We only use this "builder" because we don't infer correctly when calling `createOverload` directly in < TS 4.7,
//       but lib is currently at TS 4.4. We can switch to directly calling `createOverload` when we update LKG in main.

/** @internal @knipignore */
export function buildOverload(name: string): OverloadBuilder {
    return {
        overload: overloads => ({
            bind: binder => ({
                finish: () => createOverload(name, overloads, binder),
                deprecate: deprecations => ({
                    finish: () => createOverload(name, overloads, binder, deprecations),
                }),
            }),
        }),
    };
}
