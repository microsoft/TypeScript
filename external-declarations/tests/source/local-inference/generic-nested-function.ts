// @strict: true
// @target: es2015

export function makeEnforcePredicate<V>(predicateName: string, predicate: (v: unknown) => v is V) {
    return <T>(object: T, key: keyof T): V => {
        const value = object[key] as unknown;
        if (predicate(value)) return value;

        throw new Error(
            `expected ${predicateName} value for key ${JSON.stringify(key)}, ` +
                `instead got: ${JSON.stringify(value)}`
        );
    };
}
