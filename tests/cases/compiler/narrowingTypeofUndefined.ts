declare const a: { error: { a: string }, result: undefined } | { error: undefined, result: { b: number } }

if (typeof a.error === 'undefined') {
    a.result.b; // ok
}
