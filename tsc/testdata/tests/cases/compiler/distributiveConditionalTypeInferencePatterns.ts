// @strict: true
// @noEmit: true

namespace IntersectionInference {
    type Result<T> = T extends { a: infer U & string; b: infer U } ? T : never;
    type NonDistributive<T> = [T] extends [{ a: infer U & string; b: infer U }] ? T : never;

    export function generic<T extends { a: string; b: number }>(value: T): Result<T> {
        return value; // Error: string is removed before inferring U from b.
    }

    export function nonDistributive<T extends { a: string; b: number }>(value: T): NonDistributive<T> {
        return value; // Error
    }

    export const rejected: Result<{ a: string; b: number }> = { a: "", b: 1 }; // Error
    export const accepted: Result<{ a: string; b: string }> = { a: "", b: "" };

    type Covariant<T> = T extends { a: infer U; b: infer U } ? T : never;
    type ObjectIntersection<T> = T extends { a: infer U } & { b: number } ? T : never;

    export function covariant<T extends { a: string; b: number }>(value: T): Covariant<T> {
        return value;
    }

    export function objectIntersection<T extends { a: string; b: number }>(value: T): ObjectIntersection<T> {
        return value;
    }
}

namespace DependentConstraints {
    interface Dep<A, B extends A> {
        a: A;
        b: B;
    }

    type Result<T> = T extends Dep<infer A, infer B> ? T : never;
    type NonDistributive<T> = [T] extends [Dep<infer A, infer B>] ? T : never;

    export function generic<T extends { a: string; b: number }>(value: T): Result<T> {
        return value; // Error: the inferred B must satisfy the same A.
    }

    export function nonDistributive<T extends { a: string; b: number }>(value: T): NonDistributive<T> {
        return value; // Error
    }

    export const rejected: Result<{ a: string; b: number }> = { a: "", b: 1 }; // Error
    export const accepted: Result<{ a: string; b: string }> = { a: "", b: "" };

    interface Independent<A, B extends string> {
        a: A;
        b: B;
    }

    type IndependentResult<T> = T extends Independent<infer A, infer B> ? T : never;

    export function independent<T extends { a: number; b: string }>(value: T): IndependentResult<T> {
        return value;
    }
}

namespace InferredBranchDependence {
    type Box<T> = T extends infer U ? { value?: U } : never;
    type PropertyBox<T> = T extends { value: infer U } ? { copy?: U } : never;
    type Constant<T> = T extends infer U ? { done: true } : never;

    export function box<T>(): Box<T> {
        return {}; // Error: Box<never> is never even though the branch only references U.
    }

    export function propertyBox<T extends { value: unknown }>(): PropertyBox<T> {
        return {}; // Error
    }

    export function constant<T>(): Constant<T> {
        return { done: true }; // Error: an unused infer binder still requires a nonempty check type.
    }

    export const rejectedBox: Box<never> = {}; // Error
    export const rejectedProperty: PropertyBox<never> = {}; // Error
    export const rejectedConstant: Constant<never> = { done: true }; // Error

    type NonDistributive<T> = [T] extends [infer U] ? { value?: U } : never;

    export function nonDistributive<T>(): NonDistributive<T> {
        return {};
    }

    export const emptyNonDistributive: NonDistributive<never> = {};

    export function nonNeverUnion<T>(): Box<T | number> {
        return {};
    }

    export function nonNeverProperty<T extends { value: unknown }>(): PropertyBox<T | { value: number }> {
        return {};
    }

    export function nonNeverObject<T>(): Box<{ value: T }> {
        return {};
    }

    export function nonNeverConditional<T>(): Box<[T] extends [never] ? { value: T } : number> {
        return {};
    }

    type Identity<T> = T extends infer U ? U : never;

    export function identity<T>(value: T): Identity<T> {
        return value;
    }
}
