import * as ts from "../_namespaces/ts";

const fixId = "addNameToNamelessParameter";
const errorCodes = [ts.Diagnostics.Parameter_has_a_name_but_no_type_Did_you_mean_0_Colon_1.code];
ts.codefix.registerCodeFix({
    errorCodes,
    getCodeActions: function getCodeActionsToAddNameToNamelessParameter(context) {
        const changes = ts.textChanges.ChangeTracker.with(context, t => makeChange(t, context.sourceFile, context.span.start));
        return [ts.codefix.createCodeFixAction(fixId, changes, ts.Diagnostics.Add_parameter_name, fixId, ts.Diagnostics.Add_names_to_all_parameters_without_names)];
    },
    fixIds: [fixId],
    getAllCodeActions: context => ts.codefix.codeFixAll(context, errorCodes, (changes, diag) => makeChange(changes, diag.file, diag.start)),
});

function makeChange(changeTracker: ts.textChanges.ChangeTracker, sourceFile: ts.SourceFile, pos: number) {
    const token = ts.getTokenAtPosition(sourceFile, pos);
    const param = token.parent;
    if (!ts.isParameter(param)) {
        return ts.Debug.fail("Tried to add a parameter name to a non-parameter: " + ts.Debug.formatSyntaxKind(token.kind));
    }

    const i = param.parent.parameters.indexOf(param);
    ts.Debug.assert(!param.type, "Tried to add a parameter name to a parameter that already had one.");
    ts.Debug.assert(i > -1, "Parameter not found in parent parameter list.");

    const typeNode = ts.factory.createTypeReferenceNode(param.name as ts.Identifier, /*typeArguments*/ undefined);
    const replacement = ts.factory.createParameterDeclaration(
        param.modifiers,
        param.dotDotDotToken,
        "arg" + i,
        param.questionToken,
        param.dotDotDotToken ? ts.factory.createArrayTypeNode(typeNode) : typeNode,
        param.initializer);
    changeTracker.replaceNode(sourceFile, param, replacement);
}
