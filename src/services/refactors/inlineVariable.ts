import {
    canHaveModifiers,
    Debug,
    Diagnostics,
    emptyArray,
    Expression,
    factory,
    FindAllReferences,
    findAncestor,
    getExpressionPrecedence,
    getLocaleSpecificMessage,
    getTokenAtPosition,
    Identifier,
    InitializedVariableDeclaration,
    isExportModifier,
    isExpression,
    isIdentifier,
    isInitializedVariable,
    isTypeQueryNode,
    isVariableDeclarationInVariableStatement,
    needsParentheses,
    Node,
    Program,
    refactor,
    some,
    SourceFile,
    SymbolFlags,
    textChanges,
    TypeChecker,
    VariableDeclaration,
} from "../_namespaces/ts";
import { RefactorErrorInfo, registerRefactor } from "../_namespaces/ts.refactor";

const refactorName = "Inline variable";
const refactorDescription = getLocaleSpecificMessage(Diagnostics.Inline_variable);

const inlineVariableAction = {
    name: refactorName,
    description: refactorDescription,
    kind: "refactor.inline.variable"
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
            file,
            program,
            preferences,
            startPosition,
            triggerReason
        } = context;

        // tryWithReferenceToken is true below when triggerReason === "invoked", since we want to
        // always provide the refactor in the declaration site but only show it in references when
        // the refactor is explicitly invoked.
        const info = getInliningInfo(file, startPosition, triggerReason === "invoked", program);
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

        const { file, program, startPosition } = context;

        const info = getInliningInfo(file, startPosition, /*tryWithReferenceToken*/ true, program);
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

function getInliningInfo(file: SourceFile, startPosition: number, tryWithReferenceToken: boolean, program: Program): InliningInfo | RefactorErrorInfo | undefined {
    const checker = program.getTypeChecker();
    const token = getTokenAtPosition(file, startPosition);
    const parent = token.parent;

    // If the node is a variable declaration, make sure it's not in a catch clause or for-loop
    // and that it has a value.
    if (isInitializedVariable(parent) && isVariableDeclarationInVariableStatement(parent) && isIdentifier(parent.name)) {
        // Don't inline the variable if it has multiple declarations.
        if (parent.symbol.declarations?.length !== 1) {
            return { error: getLocaleSpecificMessage(Diagnostics.Variables_that_share_a_name_with_a_type_or_namespace_in_the_same_scope_cannot_be_inlined) };
        }

        // Do not inline if the variable is exported.
        if (findAncestor(parent, node => canHaveModifiers(node) && some(node.modifiers, isExportModifier))) {
            return undefined;
        }

        // Find all references to the variable in the current file.
        const references = getReferenceNodes(parent, checker, file);
        return references && { references, declaration: parent, replacement: parent.initializer };
    }

    // Try finding the declaration and nodes to replace via the reference token.
    if (tryWithReferenceToken && isIdentifier(token)) {
        const definition = checker.resolveName(token.text, token, SymbolFlags.Value, /*excludeGlobals*/ false);
        if (definition?.declarations?.length !== 1) {
            return { error: getLocaleSpecificMessage(Diagnostics.Variables_that_share_a_name_with_a_type_or_namespace_in_the_same_scope_cannot_be_inlined) };
        }

        const declaration = definition.declarations[0];
        if (!isInitializedVariable(declaration) || !isVariableDeclarationInVariableStatement(declaration) || !isIdentifier(declaration.name)) {
            return undefined;
        }

        const references = getReferenceNodes(declaration, checker, file);
        return references && { references, declaration, replacement: declaration.initializer };
    }

    return { error: getLocaleSpecificMessage(Diagnostics.Could_not_find_variable_to_inline) };
}

function getReferenceNodes(declaration: InitializedVariableDeclaration, checker: TypeChecker, file: SourceFile): Identifier[] | undefined {
    const references: Identifier[] = [];
    const cannotInline = FindAllReferences.Core.eachSymbolReferenceInFile(declaration.name as Identifier, checker, file, ref => {
        // Only inline if all references are reads. Else we might end up with an invalid scenario like:
        // const y = x++ + 1 -> const y = 2++ + 1
        if (FindAllReferences.isWriteAccessForReference(ref)) {
            return true;
        }

        // typeof needs an identifier, so we can't inline a value in there.
        if (isTypeQueryNode(ref.parent)) {
            return true;
        }

        // Cannot inline recursive declarations (e.g. const foo = () => foo();)
        if (findAncestor(ref, node => node === declaration.initializer)) {
            return true;
        }

        references.push(ref);
    });

    return references.length === 0 || cannotInline ? undefined : references;
}

function getReplacementExpression(reference: Node, replacement: Expression): Expression {
    // Logic from binaryOperandNeedsParentheses: "If the operand has lower precedence,
    // then it needs to be parenthesized to preserve the intent of the expression.
    // If the operand has higher precedence, then it does not need to be parenthesized."
    //
    // Note that binaryOperandNeedsParentheses has further logic when the precedences
    // are equal, but for the purposes of this refactor we keep things simple and
    // instead just check for special cases with needsParentheses.
    const { parent } = reference;
    if (isExpression(parent) && (getExpressionPrecedence(replacement) < getExpressionPrecedence(parent) || needsParentheses(parent))) {
        return factory.createParenthesizedExpression(replacement);
    }

    return replacement;
}