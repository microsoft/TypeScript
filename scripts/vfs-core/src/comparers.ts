export function compareNumbers(a: number, b: number): number {
    if (a === b) return 0;
    if (a === undefined) return -1;
    if (b === undefined) return +1;
    return a < b ? -1 : +1;
}

export function compareStrings(a: string, b: string, ignoreCase: boolean): number {
    return ignoreCase
        ? compareStringsCaseInsensitive(a, b)
        : compareStringsCaseSensitive(a, b);
}

// NOTE: This is a duplicate of `compareNumbers` above, but is intended to be used only with
//       strings to reduce polymorphism.
export function compareStringsCaseSensitive(a: string, b: string): number {
    if (a === b) return 0;
    if (a === undefined) return -1;
    if (b === undefined) return +1;
    return a < b ? -1 : +1;
}

export function compareStringsCaseInsensitive(a: string, b: string): number {
    if (a === b) return 0;
    if (a === undefined) return -1;
    if (b === undefined) return +1;
    a = a.toUpperCase();
    b = b.toUpperCase();
    return a < b ? -1 : a > b ? +1 : 0;
}

export function equateStringsCaseSensitive(a: string, b: string): boolean {
    return a === b;
}

export function equateStringsCaseInsensitive(a: string, b: string): boolean {
    return a === b
        || a !== undefined
        && b !== undefined
        && a.toUpperCase() === b.toUpperCase();
}
