// @strict: true
// @noEmit: true
// @target: es2022
// @module: esnext
// @moduleResolution: bundler

// https://github.com/microsoft/TypeScript/issues/65445

// The type of import("x") is the module's type with a synthetic default,
// which cannot reference type parameters, so inference from the callback
// does not explore its members, among them stub, whose return type is
// infinite for an erased type argument.

declare module "x" {
    type Stubable = (...args: any[]) => any;
    type Result<R> = R extends Stubable ? Provider<R> : Promise<R>;
    type MethodOrProperty<V> = V extends (...args: infer P) => infer R ? (...args: P) => Result<R> : Result<V>;
    type Provider<T> = T extends Stubable ? MethodOrProperty<T> : unknown;
    export function stub<T extends Stubable>(value: T): Provider<T>;
}

const a = import("x").then((m) => 1);
