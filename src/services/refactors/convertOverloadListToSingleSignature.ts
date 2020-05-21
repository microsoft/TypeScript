/* @internal */
namespace ts.refactor.addOrRemoveBracesToArrowFunction {
    const refactorName = "Convert overload list to single signature";
    const refactorDescription = Diagnostics.Convert_overload_list_to_single_signature.message;
    registerRefactor(refactorName, { getEditsForAction, getAvailableActions });


    function getAvailableActions(context: RefactorContext): readonly ApplicableRefactorInfo[] {
        const { file, startPosition, program } = context;
        const info = getConvertableOverloadListAtPosition(file, startPosition, program);
        if (!info) return emptyArray;

        return [{
            name: refactorName,
            description: refactorDescription,
            actions: [{
                name: refactorName,
                description: refactorDescription
            }]
        }];
    }

    function getEditsForAction(context: RefactorContext): RefactorEditInfo | undefined {
        const { file, startPosition, program } = context;
        const signatureDecls = getConvertableOverloadListAtPosition(file, startPosition, program);
        if (!signatureDecls) return undefined;

        const checker = program.getTypeChecker();

        const lastDeclaration = signatureDecls[signatureDecls.length - 1];
        let updated = lastDeclaration;
        switch (lastDeclaration.kind) {
            case SyntaxKind.MethodSignature: {
                updated = updateMethodSignature(
                    lastDeclaration,
                    lastDeclaration.typeParameters,
                    getNewParametersForCombinedSignature(signatureDecls),
                    lastDeclaration.type,
                    lastDeclaration.name,
                    lastDeclaration.questionToken
                );
                break;
            }
            case SyntaxKind.MethodDeclaration: {
                updated = updateMethod(
                    lastDeclaration,
                    lastDeclaration.decorators,
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
            case SyntaxKind.CallSignature: {
                updated = updateCallSignature(
                    lastDeclaration,
                    lastDeclaration.typeParameters,
                    getNewParametersForCombinedSignature(signatureDecls),
                    lastDeclaration.type,
                );
                break;
            }
            case SyntaxKind.Constructor: {
                updated = updateConstructor(
                    lastDeclaration,
                    lastDeclaration.decorators,
                    lastDeclaration.modifiers,
                    getNewParametersForCombinedSignature(signatureDecls),
                    lastDeclaration.body
                );
                break;
            }
            case SyntaxKind.ConstructSignature: {
                updated = updateConstructSignature(
                    lastDeclaration,
                    lastDeclaration.typeParameters,
                    getNewParametersForCombinedSignature(signatureDecls),
                    lastDeclaration.type,
                );
                break;
            }
            case SyntaxKind.FunctionDeclaration: {
                updated = updateFunctionDeclaration(
                    lastDeclaration,
                    lastDeclaration.decorators,
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
            default: return Debug.failBadSyntaxKind(lastDeclaration, "Unhandled signature kind in overload list conversion refactoring");
        }

        if (updated === lastDeclaration) {
            return; // No edits to apply, do nothing
        }

        const edits = textChanges.ChangeTracker.with(context, t => {
            t.replaceNodeRange(file, signatureDecls[0], signatureDecls[signatureDecls.length - 1], updated);
        });

        return { renameFilename: undefined, renameLocation: undefined, edits };

        function getNewParametersForCombinedSignature(signatureDeclarations: (MethodSignature | MethodDeclaration | CallSignatureDeclaration | ConstructorDeclaration | ConstructSignatureDeclaration | FunctionDeclaration)[]): NodeArray<ParameterDeclaration> {
            const lastSig = signatureDeclarations[signatureDeclarations.length - 1];
            if (isFunctionLikeDeclaration(lastSig) && lastSig.body) {
                // Trim away implementation signature arguments (they should already be compatible with overloads, but are likely less precise to guarantee compatability with the overloads)
                signatureDeclarations = signatureDeclarations.slice(0, signatureDeclarations.length - 1);
            }
            return createNodeArray([
                createParameter(
                    /*decorators*/ undefined,
                    /*modifiers*/ undefined,
                    createToken(SyntaxKind.DotDotDotToken),
                    "args",
                    /*questionToken*/ undefined,
                    createUnionTypeNode(map(signatureDeclarations, convertSignatureParametersToTuple))
                )
            ]);
        }

        function convertSignatureParametersToTuple(decl: MethodSignature | MethodDeclaration | CallSignatureDeclaration | ConstructorDeclaration | ConstructSignatureDeclaration | FunctionDeclaration): TupleTypeNode {
            const members = map(decl.parameters, convertParameterToNamedTupleMember);
            return setEmitFlags(createTupleTypeNode(members), some(members, m => !!length(getSyntheticLeadingComments(m))) ? EmitFlags.None : EmitFlags.SingleLine);
        }

        function convertParameterToNamedTupleMember(p: ParameterDeclaration): NamedTupleMember {
            Debug.assert(isIdentifier(p.name)); // This is checked during refactoring applicability checking
            const result = setTextRange(createNamedTupleMember(
                p.dotDotDotToken,
                p.name,
                p.questionToken,
                p.type || createKeywordTypeNode(SyntaxKind.AnyKeyword)
            ), p);
            const parameterDocComment = p.symbol && p.symbol.getDocumentationComment(checker);
            if (parameterDocComment) {
                const newComment = displayPartsToString(parameterDocComment);
                if (newComment.length) {
                    setSyntheticLeadingComments(result, [{
                        text: `*
${newComment.split("\n").map(c => ` * ${c}`).join("\n")}
 `,
                        kind: SyntaxKind.MultiLineCommentTrivia,
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

    function isConvertableSignatureDeclaration(d: Node): d is MethodSignature | MethodDeclaration | CallSignatureDeclaration | ConstructorDeclaration | ConstructSignatureDeclaration | FunctionDeclaration {
        switch (d.kind) {
            case SyntaxKind.MethodSignature:
            case SyntaxKind.MethodDeclaration:
            case SyntaxKind.CallSignature:
            case SyntaxKind.Constructor:
            case SyntaxKind.ConstructSignature:
            case SyntaxKind.FunctionDeclaration:
                return true;
        }
        return false;
    }

    function getConvertableOverloadListAtPosition(file: SourceFile, startPosition: number, program: Program) {
        const node = getTokenAtPosition(file, startPosition);
        const containingDecl = findAncestor(node, isConvertableSignatureDeclaration);
        if (!containingDecl) {
            return;
        }
        const checker = program.getTypeChecker();
        const signatureSymbol = containingDecl.symbol;
        if (!signatureSymbol) {
            return;
        }
        const decls = signatureSymbol.declarations;
        if (length(decls) <= 1) {
            return;
        }
        if (!every(decls, d => getSourceFileOfNode(d) === file)) {
            return;
        }
        if (!isConvertableSignatureDeclaration(decls[0])) {
            return;
        }
        const kindOne = decls[0].kind;
        if (!every(decls, d => d.kind === kindOne)) {
            return;
        }
        const signatureDecls = decls as (MethodSignature | MethodDeclaration | CallSignatureDeclaration | ConstructorDeclaration | ConstructSignatureDeclaration | FunctionDeclaration)[];
        if (some(signatureDecls, d => !!d.typeParameters || some(d.parameters, p => !!p.decorators || !!p.modifiers || !isIdentifier(p.name)))) {
            return;
        }
        const signatures = mapDefined(signatureDecls, d => checker.getSignatureFromDeclaration(d));
        if (length(signatures) !== length(decls)) {
            return;
        }
        const returnOne = checker.getReturnTypeOfSignature(signatures[0]);
        if (!every(signatures, s => checker.getReturnTypeOfSignature(s) === returnOne)) {
            return;
        }

        return signatureDecls;
    }
}
