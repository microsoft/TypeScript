import type { Diagnostic } from "./proto.ts";

/**
 * Returns a sorted copy, removing diagnostics with identical file names, ranges,
 * codes, categories, sources, text, message chains, and related information.
 * File names and localized text are compared case-sensitively. More elaborated
 * message chains and related information sort first; distinct details are retained.
 */
export function sortAndDeduplicateDiagnostics<T extends Diagnostic>(diagnostics: readonly T[]): T[] {
    const sorted = diagnostics.slice().sort(compareDiagnostics);
    return sorted.filter((diagnostic, index) => index === 0 || compareDiagnostics(sorted[index - 1], diagnostic) !== 0);
}

function compareValues(a: string | number, b: string | number): number {
    return a < b ? -1 : a > b ? 1 : 0;
}

function compareDiagnostics(a: Diagnostic, b: Diagnostic): number {
    if (a === b) return 0;
    return compareValues(a.fileName ?? "", b.fileName ?? "") ||
        a.pos - b.pos ||
        a.end - b.end ||
        a.code - b.code ||
        a.category - b.category ||
        compareValues(a.source ?? "", b.source ?? "") ||
        compareValues(a.text, b.text) ||
        compareMessageChainSize(a.messageChain ?? [], b.messageChain ?? []) ||
        compareDiagnosticLists(a.messageChain ?? [], b.messageChain ?? []) ||
        compareDiagnosticLists(a.relatedInformation ?? [], b.relatedInformation ?? []);
}

function compareMessageChainSize(a: readonly Diagnostic[], b: readonly Diagnostic[]): number {
    const result = b.length - a.length;
    if (result) return result;
    for (let i = 0; i < a.length; i++) {
        const result = compareMessageChainSize(a[i].messageChain ?? [], b[i].messageChain ?? []);
        if (result) return result;
    }
    return 0;
}

function compareDiagnosticLists(a: readonly Diagnostic[], b: readonly Diagnostic[]): number {
    const result = b.length - a.length;
    if (result) return result;
    for (let i = 0; i < a.length; i++) {
        const result = compareDiagnostics(a[i], b[i]);
        if (result) return result;
    }
    return 0;
}
