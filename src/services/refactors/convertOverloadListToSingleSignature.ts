/* @internal */
namespace ts.refactor.addOrRemoveBracesToArrowFunction {
const refactorName = "Convert overload list to single signature";
const refactorDescription = ts.Diagnostics.Convert_overload_list_to_single_signature.message;

const functionOverloadAction = {
    name: refactorName,
    description: refactorDescription,
    kind: "refactor.rewrite.function.overloadList",
};
ts.refactor.registerRefactor(refactorName, {
    kinds: [functionOverloadAction.kind],
    getEditsForAction: getRefactorEditsToConvertOverloadsToOneSignature,
    getAvailableActions: getRefactorActionsToConvertOverloadsToOneSignature
});

function getRefactorActionsToConvertOverloadsToOneSignature(context: ts.RefactorContext): readonly ts.ApplicableRefactorInfo[] {
    const { file, startPosition, program } = context;
    const info = getConvertableOverloadListAtPosition(file, startPosition, program);
    if (!info) return ts.emptyArray;

    return [{
        name: refactorName,
        description: refactorDescription,
        actions: [functionOverloadAction]
    }];
}

function getRefactorEditsToConvertOverloadsToOneSignature(context: ts.RefactorContext): ts.RefactorEditInfo | undefined {
    const { file, startPosition, program } = context;
    const signatureDecls = getConvertableOverloadListAtPosition(file, startPosition, program);
    if (!signatureDecls) return undefined;

    const checker = program.getTypeChecker();

    const lastDeclaration = signatureDecls[signatureDecls.length - 1];
    let updated = lastDeclaration;
    switch (lastDeclaration.kind) {
        case ts.SyntaxKind.MethodSignature: {
            updated = ts.factory.updateMethodSignature(
                lastDeclaration,
                lastDeclaration.modifiers,
                lastDeclaration.name,
                lastDeclaration.questionToken,
                lastDeclaration.typeParameters,
                getNewParametersForCombinedSignature(signatureDecls),
                lastDeclaration.type,
            );
            break;
        }
        case ts.SyntaxKind.MethodDeclaration: {
            updated = ts.factory.updateMethodDeclaration(
                lastDeclaration,
                lastDeclaration.modifiers,
                lastDeclaration.asteriskToken,
                lastDeclaration.name,
                lastDeclaration.questionToken,
                lastDeclaration.typeParameters,
                getNewParametersForCombinedSignature(signatureDecls),
                lastDeclaration.type,
                lastDeclaration.body
            );
            break;
        }
        case ts.SyntaxKind.CallSignature: {
            updated = ts.factory.updateCallSignature(
                lastDeclaration,
                lastDeclaration.typeParameters,
                getNewParametersForCombinedSignature(signatureDecls),
                lastDeclaration.type,
            );
            break;
        }
        case ts.SyntaxKind.Constructor: {
            updated = ts.factory.updateConstructorDeclaration(
                lastDeclaration,
                lastDeclaration.modifiers,
                getNewParametersForCombinedSignature(signatureDecls),
                lastDeclaration.body
            );
            break;
        }
        case ts.SyntaxKind.ConstructSignature: {
            updated = ts.factory.updateConstructSignature(
                lastDeclaration,
                lastDeclaration.typeParameters,
                getNewParametersForCombinedSignature(signatureDecls),
                lastDeclaration.type,
            );
            break;
        }
        case ts.SyntaxKind.FunctionDeclaration: {
            updated = ts.factory.updateFunctionDeclaration(
                lastDeclaration,
                lastDeclaration.modifiers,
                lastDeclaration.asteriskToken,
                lastDeclaration.name,
                lastDeclaration.typeParameters,
                getNewParametersForCombinedSignature(signatureDecls),
                lastDeclaration.type,
                lastDeclaration.body
            );
            break;
        }
        default: return ts.Debug.failBadSyntaxKind(lastDeclaration, "Unhandled signature kind in overload list conversion refactoring");
    }

    if (updated === lastDeclaration) {
        return; // No edits to apply, do nothing
    }

    const edits = ts.textChanges.ChangeTracker.with(context, t => {
        t.replaceNodeRange(file, signatureDecls[0], signatureDecls[signatureDecls.length - 1], updated);
    });

    return { renameFilename: undefined, renameLocation: undefined, edits };

    function getNewParametersForCombinedSignature(signatureDeclarations: (ts.MethodSignature | ts.MethodDeclaration | ts.CallSignatureDeclaration | ts.ConstructorDeclaration | ts.ConstructSignatureDeclaration | ts.FunctionDeclaration)[]): ts.NodeArray<ts.ParameterDeclaration> {
        const lastSig = signatureDeclarations[signatureDeclarations.length - 1];
        if (ts.isFunctionLikeDeclaration(lastSig) && lastSig.body) {
            // Trim away implementation signature arguments (they should already be compatible with overloads, but are likely less precise to guarantee compatability with the overloads)
            signatureDeclarations = signatureDeclarations.slice(0, signatureDeclarations.length - 1);
        }
        return ts.factory.createNodeArray([
            ts.factory.createParameterDeclaration(
                /*modifiers*/ undefined,
                ts.factory.createToken(ts.SyntaxKind.DotDotDotToken),
                "args",
                /*questionToken*/ undefined,
                ts.factory.createUnionTypeNode(ts.map(signatureDeclarations, convertSignatureParametersToTuple))
            )
        ]);
    }

    function convertSignatureParametersToTuple(decl: ts.MethodSignature | ts.MethodDeclaration | ts.CallSignatureDeclaration | ts.ConstructorDeclaration | ts.ConstructSignatureDeclaration | ts.FunctionDeclaration): ts.TupleTypeNode {
        const members = ts.map(decl.parameters, convertParameterToNamedTupleMember);
        return ts.setEmitFlags(ts.factory.createTupleTypeNode(members), ts.some(members, m => !!ts.length(ts.getSyntheticLeadingComments(m))) ? ts.EmitFlags.None : ts.EmitFlags.SingleLine);
    }

    function convertParameterToNamedTupleMember(p: ts.ParameterDeclaration): ts.NamedTupleMember {
        ts.Debug.assert(ts.isIdentifier(p.name)); // This is checked during refactoring applicability checking
        const result = ts.setTextRange(ts.factory.createNamedTupleMember(
            p.dotDotDotToken,
            p.name,
            p.questionToken,
            p.type || ts.factory.createKeywordTypeNode(ts.SyntaxKind.AnyKeyword)
        ), p);
        const parameterDocComment = p.symbol && p.symbol.getDocumentationComment(checker);
        if (parameterDocComment) {
            const newComment = ts.displayPartsToString(parameterDocComment);
            if (newComment.length) {
                ts.setSyntheticLeadingComments(result, [{
                    text: `*
${newComment.split("\n").map(c => ` * ${c}`).join("\n")}
 `,
                    kind: ts.SyntaxKind.MultiLineCommentTrivia,
                    pos: -1,
                    end: -1,
                    hasTrailingNewLine: true,
                    hasLeadingNewline: true,
                }]);
            }
        }
        return result;
    }

}

function isConvertableSignatureDeclaration(d: ts.Node): d is ts.MethodSignature | ts.MethodDeclaration | ts.CallSignatureDeclaration | ts.ConstructorDeclaration | ts.ConstructSignatureDeclaration | ts.FunctionDeclaration {
    switch (d.kind) {
        case ts.SyntaxKind.MethodSignature:
        case ts.SyntaxKind.MethodDeclaration:
        case ts.SyntaxKind.CallSignature:
        case ts.SyntaxKind.Constructor:
        case ts.SyntaxKind.ConstructSignature:
        case ts.SyntaxKind.FunctionDeclaration:
            return true;
    }
    return false;
}

function getConvertableOverloadListAtPosition(file: ts.SourceFile, startPosition: number, program: ts.Program) {
    const node = ts.getTokenAtPosition(file, startPosition);
    const containingDecl = ts.findAncestor(node, isConvertableSignatureDeclaration);
    if (!containingDecl) {
        return;
    }
    if (ts.isFunctionLikeDeclaration(containingDecl) && containingDecl.body && ts.rangeContainsPosition(containingDecl.body, startPosition)) {
        return;
    }

    const checker = program.getTypeChecker();
    const signatureSymbol = containingDecl.symbol;
    if (!signatureSymbol) {
        return;
    }
    const decls = signatureSymbol.declarations;
    if (ts.length(decls) <= 1) {
        return;
    }
    if (!ts.every(decls, d => ts.getSourceFileOfNode(d) === file)) {
        return;
    }
    if (!isConvertableSignatureDeclaration(decls![0])) {
        return;
    }
    const kindOne = decls![0].kind;
    if (!ts.every(decls, d => d.kind === kindOne)) {
        return;
    }
    const signatureDecls = decls as (ts.MethodSignature | ts.MethodDeclaration | ts.CallSignatureDeclaration | ts.ConstructorDeclaration | ts.ConstructSignatureDeclaration | ts.FunctionDeclaration)[];
    if (ts.some(signatureDecls, d => !!d.typeParameters || ts.some(d.parameters, p => !!p.modifiers || !ts.isIdentifier(p.name)))) {
        return;
    }
    const signatures = ts.mapDefined(signatureDecls, d => checker.getSignatureFromDeclaration(d));
    if (ts.length(signatures) !== ts.length(decls)) {
        return;
    }
    const returnOne = checker.getReturnTypeOfSignature(signatures[0]);
    if (!ts.every(signatures, s => checker.getReturnTypeOfSignature(s) === returnOne)) {
        return;
    }

    return signatureDecls;
}
}
