/* @internal */
namespace ts.refactor.inferFunctionReturnType {
    const refactorName = "Infer function return type";
    const refactorDescription = Diagnostics.Infer_function_return_type.message;
    const rewriteFunctionReturnType = "refactor.rewrite.function.returnType";

    registerRefactor(refactorName, { refactorKinds: [rewriteFunctionReturnType], getEditsForAction, getAvailableActions });

    function getEditsForAction(context: RefactorContext): RefactorEditInfo | undefined {
        const info = getInfo(context);
        if (info && "declaration" in info) {
            const edits = textChanges.ChangeTracker.with(context, t =>
                t.tryInsertTypeAnnotation(context.file, info.declaration, info.returnTypeNode));
            return { renameFilename: undefined, renameLocation: undefined, edits };
        }
        return undefined;
    }

    function getAvailableActions(context: RefactorContext): readonly ApplicableRefactorInfo[] {
        const info = getInfo(context);
        if (info && "declaration" in info) {
            return [{
                name: refactorName,
                description: refactorDescription,
                actions: [{
                    name: refactorName,
                    description: refactorDescription,
                    refactorKind: rewriteFunctionReturnType
                }]
            }];
        }
        if (info && "error" in info && context.preferences.provideRefactorNotApplicableReason) {
            return [{
                name: refactorName,
                description: refactorDescription,
                actions: [{
                    name: refactorName,
                    description: refactorDescription,
                    refactorKind: rewriteFunctionReturnType,
                    notApplicableReason: info.error
                }]
            }];
        }
        return emptyArray;
    }

    type ConvertibleDeclaration =
        | FunctionDeclaration
        | FunctionExpression
        | ArrowFunction
        | MethodDeclaration;

    type Info = FunctionInfo | Error;
    
    interface FunctionInfo {
        declaration: ConvertibleDeclaration;
        returnTypeNode: TypeNode;
    }

    interface Error {
        error: string
    }

    function getInfo(context: RefactorContext): Info | undefined {
        if (isInJSFile(context.file) || !refactorKindBeginsWith(rewriteFunctionReturnType, context.refactorKind)) return;

        const token = getTokenAtPosition(context.file, context.startPosition);
        const declaration = findAncestor(token, isConvertibleDeclaration);
        if (!declaration || !declaration.body || declaration.type) {
            return { error: getLocaleSpecificMessage(Diagnostics.Return_type_must_be_inferred_from_a_function) };
        }

        const typeChecker = context.program.getTypeChecker();
        const returnType = tryGetReturnType(typeChecker, declaration);
        if (!returnType) {
            return { error: getLocaleSpecificMessage(Diagnostics.Could_not_determine_function_return_type) };
        };

        const returnTypeNode = typeChecker.typeToTypeNode(returnType, declaration, NodeBuilderFlags.NoTruncation);
        if (returnTypeNode) {
            return { declaration, returnTypeNode };
        }
    }

    function isConvertibleDeclaration(node: Node): node is ConvertibleDeclaration {
        switch (node.kind) {
            case SyntaxKind.FunctionDeclaration:
            case SyntaxKind.FunctionExpression:
            case SyntaxKind.ArrowFunction:
            case SyntaxKind.MethodDeclaration:
                return true;
            default:
                return false;
        }
    }

    function tryGetReturnType(typeChecker: TypeChecker, node: ConvertibleDeclaration): Type | undefined {
        if (typeChecker.isImplementationOfOverload(node)) {
            const signatures = typeChecker.getTypeAtLocation(node).getCallSignatures();
            if (signatures.length > 1) {
                return typeChecker.getUnionType(mapDefined(signatures, s => s.getReturnType()));
            }
        }
        const signature = typeChecker.getSignatureFromDeclaration(node);
        if (signature) {
            return typeChecker.getReturnTypeOfSignature(signature);
        }
    }
}
