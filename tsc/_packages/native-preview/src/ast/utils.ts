import { SyntaxKind } from "#enums/syntaxKind";

let syntaxKindNames: Map<number, string> | undefined;
function getSyntaxKindNames(): Map<number, string> {
    if (!syntaxKindNames) {
        syntaxKindNames = new Map<number, string>();
        for (const name of Object.keys(SyntaxKind)) {
            const val = SyntaxKind[name as keyof typeof SyntaxKind];
            if (typeof val === "number" && !syntaxKindNames.has(val)) {
                syntaxKindNames.set(val, name);
            }
        }
        syntaxKindNames.set(SyntaxKind.EndOfFile, "EndOfFileToken");
    }
    return syntaxKindNames;
}

export function formatSyntaxKind(kind: SyntaxKind): string {
    return getSyntaxKindNames().get(kind) ?? `Unknown(${kind})`;
}

export function tryCast<TOut extends TIn, TIn = any>(value: TIn | undefined, test: (value: TIn) => value is TOut): TOut | undefined {
    return value !== undefined && test(value) ? value : undefined;
}

export function cast<TOut extends TIn, TIn = any>(value: TIn | undefined, test: (value: TIn) => value is TOut): TOut {
    if (value !== undefined && test(value)) return value;

    throw new Error(`Invalid cast. The supplied value ${value} did not pass the test '${test.name}'.`);
}
