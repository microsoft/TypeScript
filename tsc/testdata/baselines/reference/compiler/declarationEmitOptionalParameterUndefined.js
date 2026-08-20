//// [tests/cases/compiler/declarationEmitOptionalParameterUndefined.ts] ////

//// [declarationEmitOptionalParameterUndefined.ts]
export function simple_primitive(
    foo: number | boolean | null = 2,
    _: string,
) {}

export function simple_primitive_with_explicit_undefined(
    foo: number | boolean | null | undefined = 2,
    _: string,
) {}

export function simple_nonPrimitive(
    foo: number | RegExp | null = 2,
    _: string,
) {}

export function simple_nonPrimitive_with_explicit_undefined(
    foo: number | RegExp | null | undefined = 2,
    _: string,
) {}

export function curry(
    foo: number | RegExp | null = 2,
    _: string,
) {
    return (bar = foo, _: string) => (buzz = bar, _: string) => {}
}

export function curry_with_explicit_undefined(
    foo: number | RegExp | null | undefined = 2,
    _: string,
) {
    return (bar = foo, _: string) => (buzz = bar, _: string) => {}
}


//// [declarationEmitOptionalParameterUndefined.js]
export function simple_primitive(foo = 2, _) { }
export function simple_primitive_with_explicit_undefined(foo = 2, _) { }
export function simple_nonPrimitive(foo = 2, _) { }
export function simple_nonPrimitive_with_explicit_undefined(foo = 2, _) { }
export function curry(foo = 2, _) {
    return (bar = foo, _) => (buzz = bar, _) => { };
}
export function curry_with_explicit_undefined(foo = 2, _) {
    return (bar = foo, _) => (buzz = bar, _) => { };
}


//// [declarationEmitOptionalParameterUndefined.d.ts]
export declare function simple_primitive(foo: number | boolean | null | undefined, _: string): void;
export declare function simple_primitive_with_explicit_undefined(foo: number | boolean | null | undefined, _: string): void;
export declare function simple_nonPrimitive(foo: number | RegExp | null | undefined, _: string): void;
export declare function simple_nonPrimitive_with_explicit_undefined(foo: number | RegExp | null | undefined, _: string): void;
export declare function curry(foo: number | RegExp | null | undefined, _: string): (bar: number | RegExp | null | undefined, _: string) => (buzz: number | RegExp | null | undefined, _: string) => void;
export declare function curry_with_explicit_undefined(foo: number | RegExp | null | undefined, _: string): (bar: number | RegExp | null | undefined, _: string) => (buzz: number | RegExp | null | undefined, _: string) => void;
