/* @internal */
namespace ts.codefix {
    const fixId = "fixConvertConstantVariableOrProperty";
    const errorCodes = [
        Diagnostics.Cannot_assign_to_0_because_it_is_a_constant_or_a_read_only_property.code
    ];
    registerCodeFix({
        errorCodes,
        getCodeActions(context) {
            const { sourceFile, span, program } = context;
            if (program.isSourceFileFromExternalLibrary(sourceFile) || program.isSourceFileDefaultLibrary(sourceFile)) return undefined;
            const declaration = getDeclaration(sourceFile, span.start, program.getTypeChecker());
            if (!declaration) return undefined;
            const changes = textChanges.ChangeTracker.with(context, t => doChange(t, sourceFile, declaration));
            const type = declaration.kind === SyntaxKind.VariableDeclaration ? "const" : "readonly";
            return [createCodeFixAction(fixId, changes, [Diagnostics.Remove_0_modifier, type], fixId, Diagnostics.Make_variables_and_properties_mutable_where_necessary)];
        },
        fixIds: [fixId],
        getAllCodeActions: context => codeFixAll(context, errorCodes, (changes, diag) => {
            const declaration = getDeclaration(diag.file, diag.start, context.program.getTypeChecker());
            if (declaration) doChange(changes, context.sourceFile, declaration);
        }),
    });
    function getDeclaration(sourceFile: SourceFile, pos: number, checker: TypeChecker): Declaration | undefined {
        const node = getTokenAtPosition(sourceFile, pos);
        const symbol = checker.getSymbolAtLocation(node);
        return Debug.assertDefined(symbol).valueDeclaration;
    }

    function doChange(changes: textChanges.ChangeTracker, sourceFile: SourceFile, node: Declaration) {
        if (node.kind === SyntaxKind.VariableDeclaration) {
            const oldDeclarationList = node.parent as VariableDeclarationList;
            const declarationList = createVariableDeclarationList(oldDeclarationList.declarations, NodeFlags.Let);
            changes.replaceNode(sourceFile, oldDeclarationList, declarationList);
        }
        else if (node.kind === SyntaxKind.PropertyDeclaration) {
            changes.deleteModifier(sourceFile, Debug.assertDefined(findModifier(node, SyntaxKind.ReadonlyKeyword)));
        }
    }
}
