/* @internal */
namespace ts.refactor.inferFunctionReturnType {
    const refactorName = "Infer function return type";
    const refactorDescription = Diagnostics.Infer_function_return_type.message;
    registerRefactor(refactorName, { getEditsForAction, getAvailableActions });

    function getEditsForAction(context: RefactorContext): RefactorEditInfo | undefined {
        const info = getInfo(context);
        if (info) {
            const edits = textChanges.ChangeTracker.with(context, t =>
                t.tryInsertTypeAnnotation(context.file, info.declaration, info.returnTypeNode));
            return { renameFilename: undefined, renameLocation: undefined, edits };
        }
        return undefined;
    }

    function getAvailableActions(context: RefactorContext): readonly ApplicableRefactorInfo[] {
        const info = getInfo(context);
        if (info) {
            return [{
                name: refactorName,
                description: refactorDescription,
                actions: [{
                    name: refactorName,
                    description: refactorDescription
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

    interface Info {
        declaration: ConvertibleDeclaration;
        returnTypeNode: TypeNode;
    }

    function getInfo(context: RefactorContext): Info | undefined {
        if (isInJSFile(context.file)) return;

        const token = getTokenAtPosition(context.file, context.startPosition);
        const declaration = findAncestor(token, isConvertibleDeclaration);
        if (!declaration || !declaration.body || declaration.type) return;

        const typeChecker = context.program.getTypeChecker();
        const returnType = tryGetReturnType(typeChecker, declaration);
        if (!returnType) return;

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
