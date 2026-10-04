// @declaration: true
// @strict: true
// @stableTypeOrdering: true

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
