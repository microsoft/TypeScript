import { SyntaxKind } from "#enums/syntaxKind";
import type { SourceFile } from "./ast.ts";

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

export function cloneSourceFileData(sourceFile: SourceFile): Record<string, unknown> {
    return {
        statements: sourceFile.statements,
        endOfFileToken: sourceFile.endOfFileToken,
        text: sourceFile.text,
        fileName: sourceFile.fileName,
        path: sourceFile.path,
        languageVariant: sourceFile.languageVariant,
        scriptKind: sourceFile.scriptKind,
        isDeclarationFile: sourceFile.isDeclarationFile,
        referencedFiles: sourceFile.referencedFiles,
        typeReferenceDirectives: sourceFile.typeReferenceDirectives,
        libReferenceDirectives: sourceFile.libReferenceDirectives,
        imports: sourceFile.imports,
        moduleAugmentations: sourceFile.moduleAugmentations,
        ambientModuleNames: sourceFile.ambientModuleNames,
        externalModuleIndicator: sourceFile.externalModuleIndicator,
        tokenCache: undefined,
    };
}
