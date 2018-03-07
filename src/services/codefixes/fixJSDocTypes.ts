/* @internal */
namespace ts.codefix {
    const fixIdPlain = "fixJSDocTypes_plain";
    const fixIdNullable = "fixJSDocTypes_nullable";
    const errorCodes = [Diagnostics.JSDoc_types_can_only_be_used_inside_documentation_comments.code];
    registerCodeFix({
        errorCodes,
        getCodeActions(context) {
            const { sourceFile } = context;
            const checker = context.program.getTypeChecker();
            const info = getInfo(sourceFile, context.span.start, checker);
            if (!info) return undefined;
            const { typeNode, type } = info;
            const original = typeNode.getText(sourceFile);
            const actions = [fix(type, fixIdPlain)];
            if (typeNode.kind === SyntaxKind.JSDocNullableType) {
                // for nullable types, suggest the flow-compatible `T | null | undefined`
                // in addition to the jsdoc/closure-compatible `T | null`
                actions.push(fix(checker.getNullableType(type, TypeFlags.Undefined), fixIdNullable));
            }
            return actions;

            function fix(type: Type, fixId: string): CodeFixAction {
                const newText = checker.typeToString(type);
                const description = formatStringFromArgs(getLocaleSpecificMessage(Diagnostics.Change_0_to_1), [original, newText]);
                const changes = textChanges.ChangeTracker.with(context, t => doChange(t, sourceFile, typeNode, type, checker));
                return { description, changes, fixId };
            }
        },
        fixIds: [fixIdPlain, fixIdNullable],
        getAllCodeActions(context) {
            const { fixId, program, sourceFile } = context;
            const checker = program.getTypeChecker();
            return codeFixAll(context, errorCodes, (changes, err) => {
                const info = getInfo(err.file, err.start!, checker);
                if (!info) return;
                const { typeNode, type } = info;
                const fixedType = typeNode.kind === SyntaxKind.JSDocNullableType && fixId === fixIdNullable ? checker.getNullableType(type, TypeFlags.Undefined) : type;
                doChange(changes, sourceFile, typeNode, fixedType, checker);
            });
        }
    });

    function doChange(changes: textChanges.ChangeTracker, sourceFile: SourceFile, oldTypeNode: TypeNode, newType: Type, checker: TypeChecker): void {
        changes.replaceNode(sourceFile, oldTypeNode, checker.typeToTypeNode(newType, /*enclosingDeclaration*/ oldTypeNode));
    }

    function getInfo(sourceFile: SourceFile, pos: number, checker: TypeChecker): { readonly typeNode: TypeNode, type: Type } {
        const decl = findAncestor(getTokenAtPosition(sourceFile, pos, /*includeJsDocComment*/ false), isTypeContainer);
        const typeNode = decl && decl.type;
        return typeNode && { typeNode, type: checker.getTypeFromTypeNode(typeNode) };
    }

    // TODO: GH#19856 Node & { type: TypeNode }
    type TypeContainer =
        | AsExpression | CallSignatureDeclaration | ConstructSignatureDeclaration | FunctionDeclaration
        | GetAccessorDeclaration | IndexSignatureDeclaration | MappedTypeNode | MethodDeclaration
        | MethodSignature | ParameterDeclaration | PropertyDeclaration | PropertySignature | SetAccessorDeclaration
        | TypeAliasDeclaration | TypeAssertion | VariableDeclaration;
    function isTypeContainer(node: Node): node is TypeContainer {
        // NOTE: Some locations are not handled yet:
        // MappedTypeNode.typeParameters and SignatureDeclaration.typeParameters, as well as CallExpression.typeArguments
        switch (node.kind) {
            case SyntaxKind.AsExpression:
            case SyntaxKind.CallSignature:
            case SyntaxKind.ConstructSignature:
            case SyntaxKind.FunctionDeclaration:
            case SyntaxKind.GetAccessor:
            case SyntaxKind.IndexSignature:
            case SyntaxKind.MappedType:
            case SyntaxKind.MethodDeclaration:
            case SyntaxKind.MethodSignature:
            case SyntaxKind.Parameter:
            case SyntaxKind.PropertyDeclaration:
            case SyntaxKind.PropertySignature:
            case SyntaxKind.SetAccessor:
            case SyntaxKind.TypeAliasDeclaration:
            case SyntaxKind.TypeAssertionExpression:
            case SyntaxKind.VariableDeclaration:
                return true;
            default:
                return false;
        }
    }
}
