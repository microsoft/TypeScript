//// [tests/cases/compiler/fusedSyntaxTransforms.ts] ////

//// [fusedSyntaxTransforms.ts]
declare function receiver(): { value?: number, method?(): number };
declare function key(): "value";
declare function fallback(): number;

export function assignments() {
    receiver()[key()] ??= receiver().method?.() ?? fallback();
    receiver().value ||= receiver()?.value ?? fallback();
    receiver().value &&= receiver()?.method?.();
}

export function defaults(
    value = receiver()?.value ?? fallback(),
    next = () => receiver().value ??= value,
) {
    try {
        return next() ?? value;
    }
    catch {
        return delete receiver()?.value;
    }
}

export function calls() {
    return (receiver()?.method)?.() ?? (receiver().method)?.();
}

export async function asyncBody(values: AsyncIterable<number>) {
    for await (const value of values) {
        const { method, ...rest } = receiver();
        rest.value ??= (await method?.()) ?? value ** 2;
    }
}


//// [fusedSyntaxTransforms.js]
export function assignments() {
    receiver()[key()] ??= receiver().method?.() ?? fallback();
    receiver().value ||= receiver()?.value ?? fallback();
    receiver().value &&= receiver()?.method?.();
}
export function defaults(value = receiver()?.value ?? fallback(), next = () => receiver().value ??= value) {
    try {
        return next() ?? value;
    }
    catch {
        return delete receiver()?.value;
    }
}
export function calls() {
    return (receiver()?.method)?.() ?? (receiver().method)?.();
}
export async function asyncBody(values) {
    for await (const value of values) {
        const { method, ...rest } = receiver();
        rest.value ??= (await method?.()) ?? value ** 2;
    }
}
//# sourceMappingURL=fusedSyntaxTransforms.js.map