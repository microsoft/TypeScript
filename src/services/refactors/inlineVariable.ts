import {
    CancellationToken,
    Debug,
    Diagnostics,
    emptyArray,
    Expression,
    FindAllReferences,
    getLocaleSpecificMessage,
    getTokenAtPosition,
    isVariableDeclaration,
    isVariableDeclarationInVariableStatement,
    mapDefined,
    Node,
    NoopCancellationToken,
    Program,
    refactor,
    SourceFile,
    textChanges,
    VariableDeclaration,
} from "../_namespaces/ts";
import { RefactorErrorInfo, registerRefactor } from "../_namespaces/ts.refactor";

const refactorName = "Inline variable";
const refactorDescription = getLocaleSpecificMessage(Diagnostics.Inline_variable);

const inlineVariableAction = {
    name: refactorName,
    description: refactorDescription,
    kind: "refactor" // TODO: Not sure what the logic for defining these is.
};

interface InliningInfo {
    references: Node[];
    declaration: VariableDeclaration;
    replacement: Expression;
}

registerRefactor(refactorName, {
    kinds: [ inlineVariableAction.kind ],

    getAvailableActions(context) {
        const {
            cancellationToken,
            file,
            program,
            preferences,
            startPosition
        } = context;

        const info = getInliningInfo(file, startPosition, program, cancellationToken);

        if (refactor.isRefactorErrorInfo(info) && preferences.provideRefactorNotApplicableReason) {
            return [{
                name: refactorName,
                description: refactorDescription,
                actions: [{
                    ...inlineVariableAction,
                    notApplicableReason: info.error
                }]
            }];
        }

        if (info) {
            return [{
                name: refactorName,
                description: refactorDescription,
                actions: [inlineVariableAction]
            }];
        }

        return emptyArray;
    },

    getEditsForAction(context, actionName) {
        Debug.assert(actionName === refactorName, "Unexpected refactor invoked");

        const {
            cancellationToken,
            file,
            program,
            startPosition
        } = context;

        const info = getInliningInfo(file, startPosition, program, cancellationToken);

        if (!info || refactor.isRefactorErrorInfo(info)) {
            return undefined;
        }

        const { references, declaration, replacement } = info;
        const edits = textChanges.ChangeTracker.with(context, tracker => {
            for (const node of references) {
                tracker.replaceNode(file, node, replacement);
            }
            tracker.delete(file, declaration);
        });

        return { edits };
    }
});

function getInliningInfo(file: SourceFile, startPosition: number, program: Program, cancellationToken: CancellationToken = NoopCancellationToken): InliningInfo | RefactorErrorInfo | undefined {
    const token = getTokenAtPosition(file, startPosition);
    const parent = token.parent;

    // Make sure the token is inside a variable declaration and the declaration
    // is not in a catch clause or for-loop.
    if (isVariableDeclaration(parent) && isVariableDeclarationInVariableStatement(parent)) {
        // We only care if the declaration has a value (since that's the thing we're inlining).
        if (!parent.initializer) {
            return undefined;
        }

        // Find all references to the variable.
        const name = parent.name;
        const referencedSymbols = FindAllReferences.Core.getReferencedSymbolsForNode(name.pos, name, program, program.getSourceFiles(), cancellationToken);
        if (!referencedSymbols || referencedSymbols.length !== 1) {
            return undefined;
        }

        // Only replace node references, and exclude the original variable too.
        const references = mapDefined(referencedSymbols[0].references, entry =>
            entry.kind === FindAllReferences.EntryKind.Node ? entry.node === name ? undefined : entry.node : undefined
        );

        return references.length === 0 ? undefined : { references, declaration: parent, replacement: parent.initializer };
    }

    // TODO: Do we want to have other errors too?
    return { error: getLocaleSpecificMessage(Diagnostics.Could_not_find_variable_to_inline) };
}