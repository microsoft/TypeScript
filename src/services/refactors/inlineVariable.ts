import {
    cast,
    Debug,
    Diagnostics,
    emptyArray,
    Expression,
    factory,
    FindAllReferences,
    getExpressionPrecedence,
    getLocaleSpecificMessage,
    getSynthesizedDeepClone,
    getTouchingPropertyName,
    Identifier,
    InitializedVariableDeclaration,
    isCallLikeExpression,
    isExportAssignment,
    isExportModifier,
    isExportSpecifier,
    isExpression,
    isFunctionLike,
    isIdentifier,
    isInitializedVariable,
    isNumericLiteral,
    isObjectLiteralExpression,
    isPropertyAccessExpression,
    isShorthandPropertyAssignment,
    isStringLiteral,
    isTaggedTemplateExpression,
    isTemplateSpan,
    isTypeQueryNode,
    isVariableDeclarationInVariableStatement,
    isVariableStatement,
    needsParentheses,
    Node,
    Program,
    refactor,
    some,
    SourceFile,
    StringLiteral,
    SymbolFlags,
    TemplateSpan,
    textChanges,
    textRangeContainsPositionInclusive,
    TypeChecker,
    VariableDeclaration,
    walkUpParenthesizedExpressions,
} from "../_namespaces/ts.js";
import {
    RefactorErrorInfo,
    registerRefactor,
} from "../_namespaces/ts.refactor.js";

const refactorName = "Inline variable";
const refactorDescription = getLocaleSpecificMessage(Diagnostics.Inline_variable);

const inlineVariableAction = {
    name: refactorName,
    description: refactorDescription,
    kind: "refactor.inline.variable",
};

interface InliningInfo {
    references: Node[];
    declaration: VariableDeclaration;
    replacement: Expression;
}

registerRefactor(refactorName, {
    kinds: [inlineVariableAction.kind],

    getAvailableActions(context) {
        const {
            file,
            program,
            preferences,
            startPosition,
            triggerReason,
        } = context;

        // tryWithReferenceToken is true below when triggerReason === "invoked", since we want to
        // always provide the refactor in the declaration site but only show it in references when
        // the refactor is explicitly invoked.
        const info = getInliningInfo(file, startPosition, triggerReason === "invoked", program);
        if (!info) {
            return emptyArray;
        }

        if (!refactor.isRefactorErrorInfo(info)) {
            return [{
                name: refactorName,
                description: refactorDescription,
                actions: [inlineVariableAction],
            }];
        }

        if (preferences.provideRefactorNotApplicableReason) {
            return [{
                name: refactorName,
                description: refactorDescription,
                actions: [{
                    ...inlineVariableAction,
                    notApplicableReason: info.error,
                }],
            }];
        }

        return emptyArray;
    },

    getEditsForAction(context, actionName) {
        Debug.assert(actionName === refactorName, "Unexpected refactor invoked");
        const { file, program, startPosition } = context;

        // tryWithReferenceToken is true below since here we're already performing the refactor.
        // The trigger kind was only relevant when checking the availability of the refactor.
        const info = getInliningInfo(file, startPosition, /*tryWithReferenceToken*/ true, program);
        if (!info || refactor.isRefactorErrorInfo(info)) {
            return undefined;
        }

        const { references, declaration, replacement } = info;
        const edits = textChanges.ChangeTracker.with(context, tracker => {
            for (const node of references) {
                const closestStringIdentifierParent = isStringLiteral(replacement) && isIdentifier(node) && walkUpParenthesizedExpressions(node.parent);
                if (closestStringIdentifierParent && isTemplateSpan(closestStringIdentifierParent) && !isTaggedTemplateExpression(closestStringIdentifierParent.parent.parent)) {
                    replaceTemplateStringVariableWithLiteral(tracker, file, closestStringIdentifierParent, replacement);
                }
                else {
                    tracker.replaceNode(file, node, getReplacementExpression(node, replacement));
                }
            }
            tracker.delete(file, declaration);
        });

        return { edits };
    },
});

function getInliningInfo(file: SourceFile, startPosition: number, tryWithReferenceToken: boolean, program: Program): InliningInfo | RefactorErrorInfo | undefined {
    const checker = program.getTypeChecker();
    const token = getTouchingPropertyName(file, startPosition);
    const parent = token.parent;

    if (!isIdentifier(token)) {
        return undefined;
    }

    // If triggered in a variable declaration, make sure it's not in a catch clause or for-loop
    // and that it has a value.
    if (isInitializedVariable(parent) && isVariableDeclarationInVariableStatement(parent) && isIdentifier(parent.name)) {
        // Don't inline the variable if it has multiple declarations.
        if (checker.getMergedSymbol(parent.symbol).declarations?.length !== 1) {
            return { error: getLocaleSpecificMessage(Diagnostics.Variables_with_multiple_declarations_cannot_be_inlined) };
        }

        // Do not inline if the variable is exported.
        if (isDeclarationExported(parent)) {
            return undefined;
        }

        // Find all references to the variable in the current file.
        const references = getReferenceNodes(parent, checker, file);
        return references && { references, declaration: parent, replacement: parent.initializer };
    }

    // Try finding the declaration and nodes to replace via the reference token.
    if (tryWithReferenceToken) {
        let definition = checker.resolveName(token.text, token, SymbolFlags.Value, /*excludeGlobals*/ false);
        definition = definition && checker.getMergedSymbol(definition);

        // Don't inline the variable if it has multiple declarations.
        if (definition?.declarations?.length !== 1) {
            return { error: getLocaleSpecificMessage(Diagnostics.Variables_with_multiple_declarations_cannot_be_inlined) };
        }

        // Make sure we're not inlining something like "let foo;" or "for (let i = 0; i < 5; i++) {}".
        const declaration = definition.declarations[0];
        if (!isInitializedVariable(declaration) || !isVariableDeclarationInVariableStatement(declaration) || !isIdentifier(declaration.name)) {
            return undefined;
        }

        // Do not inline if the variable is exported.
        if (isDeclarationExported(declaration)) {
            return undefined;
        }

        const references = getReferenceNodes(declaration, checker, file);
        return references && { references, declaration, replacement: declaration.initializer };
    }

    return { error: getLocaleSpecificMessage(Diagnostics.Could_not_find_variable_to_inline) };
}

function isDeclarationExported(declaration: InitializedVariableDeclaration): boolean {
    // We use this function after isVariableDeclarationInVariableStatement, which ensures
    // that the cast below succeeds.
    const variableStatement = cast(declaration.parent.parent, isVariableStatement);
    return some(variableStatement.modifiers, isExportModifier);
}

function getReferenceNodes(declaration: InitializedVariableDeclaration, checker: TypeChecker, file: SourceFile): Identifier[] | undefined {
    const references: Identifier[] = [];
    const cannotInline = FindAllReferences.Core.eachSymbolReferenceInFile(declaration.name as Identifier, checker, file, ref => {
        // Only inline if all references are reads, or if it includes a shorthand property assignment.
        // Else we might end up with an invalid scenario like:
        // const y = x++ + 1 -> const y = 2++ + 1,
        if (FindAllReferences.isWriteAccessForReference(ref) && !isShorthandPropertyAssignment(ref.parent)) {
            return true;
        }

        // We cannot inline exported variables like "export { x as y }" or "export default foo".
        if (isExportSpecifier(ref.parent) || isExportAssignment(ref.parent)) {
            return true;
        }

        // typeof needs an identifier, so we can't inline a value in there.
        if (isTypeQueryNode(ref.parent)) {
            return true;
        }

        // Cannot inline recursive declarations (e.g. const foo = () => foo();)
        if (textRangeContainsPositionInclusive(declaration, ref.pos)) {
            return true;
        }

        references.push(ref);
    });

    return references.length === 0 || cannotInline ? undefined : references;
}

function getReplacementExpression(reference: Node, replacement: Expression) {
    // Make sure each reference site gets its own copy of the replacement node.
    replacement = getSynthesizedDeepClone(replacement);
    const { parent } = reference;

    // Logic from binaryOperandNeedsParentheses: "If the operand has lower precedence,
    // then it needs to be parenthesized to preserve the intent of the expression.
    // If the operand has higher precedence, then it does not need to be parenthesized."
    //
    // Note that binaryOperandNeedsParentheses has further logic when the precedences
    // are equal, but for the purposes of this refactor we keep things simple and
    // instead just check for special cases with needsParentheses.
    if (isExpression(parent) && (getExpressionPrecedence(replacement) < getExpressionPrecedence(parent) || needsParentheses(parent))) {
        return factory.createParenthesizedExpression(replacement);
    }

    // Functions also need to be parenthesized.
    // E.g.: const f = () => {}; f(); -> (() => {})();
    if (isFunctionLike(replacement) && (isCallLikeExpression(parent) || isPropertyAccessExpression(parent))) {
        return factory.createParenthesizedExpression(replacement);
    }

    // Property access of numeric literals and objects need parentheses.
    // E.g.: const x = 1; x.toString(); -> (1).toString();
    if (isPropertyAccessExpression(parent) && (isNumericLiteral(replacement) || isObjectLiteralExpression(replacement))) {
        return factory.createParenthesizedExpression(replacement);
    }

    // Inline shorthand property assignment
    // E.g.:
    // const x = 1;
    // const y = { x }; -> const y = { x: 1 };
    if (isIdentifier(reference) && isShorthandPropertyAssignment(parent)) {
        return factory.createPropertyAssignment(reference, replacement);
    }

    return replacement;
}

function replaceTemplateStringVariableWithLiteral(tracker: textChanges.ChangeTracker, sourceFile: SourceFile, reference: TemplateSpan, replacement: StringLiteral) {
    const templateExpression = reference.parent;
    const index = templateExpression.templateSpans.indexOf(reference);
    const prevNode = index === 0 ? templateExpression.head : templateExpression.templateSpans[index - 1];
    tracker.replaceRangeWithText(
        sourceFile,
        {
            pos: prevNode.getEnd() - 2,
            end: reference.literal.getStart() + 1,
        },
        replacement.text.replace(/\\/g, "\\\\").replace(/`/g, "\\`"),
    );
}
