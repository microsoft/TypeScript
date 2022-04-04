/* @internal */
namespace ts.codefix {
    const fixId = "addNameToNamelessParameter";
    const errorCodes = [Diagnostics.Parameter_has_a_name_but_no_type_Did_you_mean_0_Colon_1.code];
    registerCodeFix({
        errorCodes,
        getCodeActions: function getCodeActionsToAddNameToNamelessParameter(context) {
            const changes = textChanges.ChangeTracker.with(context, t => makeChange(t, context.sourceFile, context.span.start));
            return [createCodeFixAction(fixId, changes, Diagnostics.Add_parameter_name, fixId, Diagnostics.Add_names_to_all_parameters_without_names)];
        },
        fixIds: [fixId],
        getAllCodeActions: context => codeFixAll(context, errorCodes, (changes, diag) => makeChange(changes, diag.file, diag.start)),
    });

    function makeChange(changeTracker: textChanges.ChangeTracker, sourceFile: SourceFile, pos: number) {
        const token = getTokenAtPosition(sourceFile, pos);
        const param = token.parent;
        if (!isParameter(param)) {
            return Debug.fail("Tried to add a parameter name to a non-parameter: " + Debug.formatSyntaxKind(token.kind));
        }

        const i = param.parent.parameters.indexOf(param);
        Debug.assert(!param.type, "Tried to add a parameter name to a parameter that already had one.");
        Debug.assert(i > -1, "Parameter not found in parent parameter list.");

        const typeNode = factory.createTypeReferenceNode(param.name as Identifier, /*typeArguments*/ undefined);
        const replacement = factory.createParameterDeclaration(
            /*decorators*/ undefined,
            param.modifiers,
            param.dotDotDotToken,
            "arg" + i,
            param.questionToken,
            param.dotDotDotToken ? factory.createArrayTypeNode(typeNode) : typeNode,
            param.initializer);
        changeTracker.replaceNode(sourceFile, param, replacement);
    }
}
