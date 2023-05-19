import {
    CancellationToken,
    Debug,
    Diagnostics,
    emptyArray,
    Expression,
    factory,
    FindAllReferences,
    getExpressionPrecedence,
    getLocaleSpecificMessage,
    getTokenAtPosition,
    isExpression,
    isIdentifier,
    isInitializedVariable,
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
            startPosition,
            triggerReason
        } = context;

        // tryWithReferenceToken is true below when triggerReason === "invoked", since we want to
        // always provide the refactor in the declaration site but only show it in references when
        // the refactor is explicitly invoked.
        const info = getInliningInfo(file, startPosition, triggerReason === "invoked", program, cancellationToken);
        if (!info) {
            return emptyArray;
        }

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

        if (!refactor.isRefactorErrorInfo(info)) {
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
            startPosition,
        } = context;

        const info = getInliningInfo(file, startPosition, /*tryWithReferenceToken*/ true, program, cancellationToken);

        if (!info || refactor.isRefactorErrorInfo(info)) {
            return undefined;
        }

        const { references, declaration, replacement } = info;
        const edits = textChanges.ChangeTracker.with(context, tracker => {
            for (const node of references) {
                tracker.replaceNode(file, node, getReplacementExpression(node, replacement));
            }
            tracker.delete(file, declaration);
        });

        return { edits };
    }
});

function getInliningInfo(file: SourceFile, startPosition: number, tryWithReferenceToken: boolean, program: Program, cancellationToken: CancellationToken = NoopCancellationToken): InliningInfo | RefactorErrorInfo | undefined {
    const token = getTokenAtPosition(file, startPosition);
    const parent = token.parent;

    // If the node is a variable declaration, make sure it's not in a catch clause or for-loop
    // and that it has a value.
    if (isInitializedVariable(parent) && isVariableDeclarationInVariableStatement(parent)) {
        // Find all references to the variable.
        const name = parent.name;
        const referencedSymbols = FindAllReferences.Core.getReferencedSymbolsForNode(name.pos, name, program, program.getSourceFiles(), cancellationToken);
        if (!referencedSymbols || referencedSymbols.length !== 1) {
            return undefined;
        }
        const referenceNodes = getReferenceNodes(referencedSymbols[0].references, name);

        return referenceNodes && { references: referenceNodes, declaration: parent, replacement: parent.initializer };
    }

    if (tryWithReferenceToken && isIdentifier(token)) {
        // Try finding the declaration and nodes to replace via the reference token.
        const referencedSymbols = FindAllReferences.Core.getReferencedSymbolsForNode(token.pos, token, program, program.getSourceFiles(), cancellationToken);
        if (!referencedSymbols || referencedSymbols.length !== 1) {
            return undefined;
        }

        const { definition, references } = referencedSymbols[0];
        if (definition?.type !== FindAllReferences.DefinitionKind.Symbol) {
            return undefined;
        }

        const { valueDeclaration } = definition.symbol;
        if (valueDeclaration && isInitializedVariable(valueDeclaration) && isVariableDeclarationInVariableStatement(valueDeclaration)) {
            const referenceNodes = getReferenceNodes(references, valueDeclaration.name);

            return referenceNodes && { references: referenceNodes, declaration: valueDeclaration, replacement: valueDeclaration.initializer };
        }
    }

    // TODO: Do we want to have other errors too?
    return { error: getLocaleSpecificMessage(Diagnostics.Could_not_find_variable_to_inline) };
}

function getReferenceNodes(entries: readonly FindAllReferences.Entry[], declaration: Node): Node[] | undefined {
    const referenceNodes = mapDefined(entries, entry => {
        // Only replace node references, and exclude the original variable too.
        if (entry.kind !== FindAllReferences.EntryKind.Node || entry.node === declaration) {
            return undefined;
        }

        // Only inline if all references are reads. Else we might end up with an invalid scenario like:
        // const y = x++ + 1 -> const y = 2++ + 1
        if (FindAllReferences.isWriteAccessForReference(entry.node)) {
            return undefined;
        }

        return entry.node;
    });

    // Return undefined if the only reference is the declaration itself, or if a reference
    // isn't applicable for inlining.
    return referenceNodes.length > 0 && referenceNodes.length === entries.length - 1 ? referenceNodes : undefined;
}

function getReplacementExpression(reference: Node, replacement: Expression): Expression {
    // Logic from binaryOperandNeedsParentheses: "If the operand has lower precedence,
    // then it needs to be parenthesized to preserve the intent of the expression.
    // If the operand has higher precedence, then it does not need to be parenthesized."
    //
    // Note that binaryOperandNeedsParentheses has further logic when the precedences
    // are equal, but for the purposes of this refactor we keep things simple and always
    // parenthesize.
    const { parent } = reference;
    if (isExpression(parent)) {
        if (getExpressionPrecedence(replacement) <= getExpressionPrecedence(parent)) {
            return factory.createParenthesizedExpression(replacement);
        }
    }

    return replacement;
}