// @allowJs: true
// @checkJs: true
// @noEmit: true
// @strict: true
// @filename: a.js

/** @param {unknown[]} sources */
function f(sources) {
    const differences = [];
    for (const source of sources) {
        differences.push({ source });
        const expected = /** @type {{ tokens?: unknown[] }} */ (source);
        for (const x of sources) {
            const wanted = expected.tokens ? { tokens: expected.tokens } : expected;
            differences.push({ theirs: wanted });
        }
    }
    return differences;
}

/** @param {unknown[]} sources */
function g(sources) {
    const differences = [];
    for (const source of sources) {
        differences.push({ source });
        const expected = /** @type {{ [K in "tokens"]?: unknown[] }} */ (source);
        for (const x of sources) {
            const wanted = source ? { tokens: [] } : expected;
            differences.push({ theirs: wanted });
        }
    }
    return differences;
}

/** @param {unknown[]} sources */
function h(sources) {
    const differences = [];
    for (const source of sources) {
        differences.push({ source });
        const expected = /** @type {() => unknown[]} */ (source);
        for (const x of sources) {
            const wanted = source ? { tokens: [] } : expected;
            differences.push({ theirs: wanted });
        }
    }
    return differences;
}

/**
 * @template T
 * @param {T[]} sources
 */
function k(sources) {
    const differences = [];
    for (const source of sources) {
        differences.push({ source });
        const expected = /** @type {T extends string ? { a: 1 } : { b: 2 }} */ (/** @type {unknown} */ (source));
        for (const x of sources) {
            const wanted = source ? { tokens: [] } : expected;
            differences.push({ theirs: wanted });
        }
    }
    return differences;
}
