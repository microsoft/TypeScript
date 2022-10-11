/* @internal */
namespace ts.codefix {
const fixIdPlain = "fixJSDocTypes_plain";
const fixIdNullable = "fixJSDocTypes_nullable";
const errorCodes = [ts.Diagnostics.JSDoc_types_can_only_be_used_inside_documentation_comments.code];
ts.codefix.registerCodeFix({
    errorCodes,
    getCodeActions(context) {
        const { sourceFile } = context;
        const checker = context.program.getTypeChecker();
        const info = getInfo(sourceFile, context.span.start, checker);
        if (!info) return undefined;
        const { typeNode, type } = info;
        const original = typeNode.getText(sourceFile);
        const actions = [fix(type, fixIdPlain, ts.Diagnostics.Change_all_jsdoc_style_types_to_TypeScript)];
        if (typeNode.kind === ts.SyntaxKind.JSDocNullableType) {
            // for nullable types, suggest the flow-compatible `T | null | undefined`
            // in addition to the jsdoc/closure-compatible `T | null`
            actions.push(fix(checker.getNullableType(type, ts.TypeFlags.Undefined), fixIdNullable, ts.Diagnostics.Change_all_jsdoc_style_types_to_TypeScript_and_add_undefined_to_nullable_types));
        }
        return actions;

        function fix(type: ts.Type, fixId: string, fixAllDescription: ts.DiagnosticMessage): ts.CodeFixAction {
            const changes = ts.textChanges.ChangeTracker.with(context, t => doChange(t, sourceFile, typeNode, type, checker));
            return ts.codefix.createCodeFixAction("jdocTypes", changes, [ts.Diagnostics.Change_0_to_1, original, checker.typeToString(type)], fixId, fixAllDescription);
        }
    },
    fixIds: [fixIdPlain, fixIdNullable],
    getAllCodeActions(context) {
        const { fixId, program, sourceFile } = context;
        const checker = program.getTypeChecker();
        return ts.codefix.codeFixAll(context, errorCodes, (changes, err) => {
            const info = getInfo(err.file, err.start, checker);
            if (!info) return;
            const { typeNode, type } = info;
            const fixedType = typeNode.kind === ts.SyntaxKind.JSDocNullableType && fixId === fixIdNullable ? checker.getNullableType(type, ts.TypeFlags.Undefined) : type;
            doChange(changes, sourceFile, typeNode, fixedType, checker);
        });
    }
});

function doChange(changes: ts.textChanges.ChangeTracker, sourceFile: ts.SourceFile, oldTypeNode: ts.TypeNode, newType: ts.Type, checker: ts.TypeChecker): void {
    changes.replaceNode(sourceFile, oldTypeNode, checker.typeToTypeNode(newType, /*enclosingDeclaration*/ oldTypeNode, /*flags*/ undefined)!); // TODO: GH#18217
}

function getInfo(sourceFile: ts.SourceFile, pos: number, checker: ts.TypeChecker): { readonly typeNode: ts.TypeNode, readonly type: ts.Type } | undefined {
    const decl = ts.findAncestor(ts.getTokenAtPosition(sourceFile, pos), isTypeContainer);
    const typeNode = decl && decl.type;
    return typeNode && { typeNode, type: checker.getTypeFromTypeNode(typeNode) };
}

// TODO: GH#19856 Node & { type: TypeNode }
type TypeContainer =
    | ts.AsExpression | ts.CallSignatureDeclaration | ts.ConstructSignatureDeclaration | ts.FunctionDeclaration
    | ts.GetAccessorDeclaration | ts.IndexSignatureDeclaration | ts.MappedTypeNode | ts.MethodDeclaration
    | ts.MethodSignature | ts.ParameterDeclaration | ts.PropertyDeclaration | ts.PropertySignature | ts.SetAccessorDeclaration
    | ts.TypeAliasDeclaration | ts.TypeAssertion | ts.VariableDeclaration;
function isTypeContainer(node: ts.Node): node is TypeContainer {
    // NOTE: Some locations are not handled yet:
    // MappedTypeNode.typeParameters and SignatureDeclaration.typeParameters, as well as CallExpression.typeArguments
    switch (node.kind) {
        case ts.SyntaxKind.AsExpression:
        case ts.SyntaxKind.CallSignature:
        case ts.SyntaxKind.ConstructSignature:
        case ts.SyntaxKind.FunctionDeclaration:
        case ts.SyntaxKind.GetAccessor:
        case ts.SyntaxKind.IndexSignature:
        case ts.SyntaxKind.MappedType:
        case ts.SyntaxKind.MethodDeclaration:
        case ts.SyntaxKind.MethodSignature:
        case ts.SyntaxKind.Parameter:
        case ts.SyntaxKind.PropertyDeclaration:
        case ts.SyntaxKind.PropertySignature:
        case ts.SyntaxKind.SetAccessor:
        case ts.SyntaxKind.TypeAliasDeclaration:
        case ts.SyntaxKind.TypeAssertionExpression:
        case ts.SyntaxKind.VariableDeclaration:
            return true;
        default:
            return false;
    }
}
}
