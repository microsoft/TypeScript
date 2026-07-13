import { CharacterCodes } from "#enums/characterCodes";
import { SyntaxKind } from "#enums/syntaxKind";
import type {
    __String,
    HasExpression,
    HasInitializer,
    ObjectAssignmentInitializer,
    SourceFile,
} from "./ast.ts";
import type { Node } from "./ast.ts";

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

/**
 * Remove one extra leading underscore from an identifier name, recovering the
 * display form from its escaped {@link __String} key.
 */
export function unescapeLeadingUnderscores(identifier: __String): string {
    const id = identifier as string;
    return id.length >= 3 && id.charCodeAt(0) === CharacterCodes._ && id.charCodeAt(1) === CharacterCodes._ && id.charCodeAt(2) === CharacterCodes._
        ? id.slice(1)
        : id;
}

/**
 * Add an extra leading underscore to a display name that already begins with
 * `__`, producing its escaped {@link __String} key.
 */
export function escapeLeadingUnderscores(identifier: string): __String {
    return (identifier.length >= 2 && identifier.charCodeAt(0) === CharacterCodes._ && identifier.charCodeAt(1) === CharacterCodes._
        ? "_" + identifier
        : identifier) as __String;
}

export function tryCast<TOut extends TIn, TIn = any>(value: TIn | undefined, test: (value: TIn) => value is TOut): TOut | undefined {
    return value !== undefined && test(value) ? value : undefined;
}

export function cast<TOut extends TIn, TIn = any>(value: TIn | undefined, test: (value: TIn) => value is TOut): TOut {
    if (value !== undefined && test(value)) return value;

    throw new Error(`Invalid cast. The supplied value ${value} did not pass the test '${test.name}'.`);
}

export function hasExpression(node: Node): node is HasExpression {
    return "expression" in node;
}

export function hasInitializer(node: Node): node is HasInitializer {
    return "initializer" in node;
}

export function hasObjectAssignmentInitializer(node: Node): node is ObjectAssignmentInitializer {
    return "objectAssignmentInitializer" in node;
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
