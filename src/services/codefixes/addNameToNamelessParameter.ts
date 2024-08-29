import {
    codeFixAll,
    createCodeFixAction,
    registerCodeFix,
} from "../_namespaces/ts.codefix.js";
import {
    createRange,
    Debug,
    Diagnostics,
    factory,
    findNextToken,
    getTokenAtPosition,
    Identifier,
    isArrayBindingPattern,
    isArrayTypeNode,
    isParameter,
    ParameterDeclaration,
    SourceFile,
    SyntaxKind,
    textChanges,
    TypeNode,
} from "../_namespaces/ts.js";

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

function makeChange(changeTracker: textChanges.ChangeTracker, sourceFile: SourceFile, start: number) {
    const token = getTokenAtPosition(sourceFile, start);
    const param = token.parent;
    if (!isParameter(param)) {
        return Debug.fail("Tried to add a parameter name to a non-parameter: " + Debug.formatSyntaxKind(token.kind));
    }

    const i = param.parent.parameters.indexOf(param);
    Debug.assert(!param.type, "Tried to add a parameter name to a parameter that already had one.");
    Debug.assert(i > -1, "Parameter not found in parent parameter list.");

    let end = param.name.getEnd();
    let typeNode: TypeNode = factory.createTypeReferenceNode(param.name as Identifier, /*typeArguments*/ undefined);
    let nextParam = tryGetNextParam(sourceFile, param);
    while (nextParam) {
        typeNode = factory.createArrayTypeNode(typeNode);
        end = nextParam.getEnd();
        nextParam = tryGetNextParam(sourceFile, nextParam);
    }

    const replacement = factory.createParameterDeclaration(
        param.modifiers,
        param.dotDotDotToken,
        "arg" + i,
        param.questionToken,
        param.dotDotDotToken && !isArrayTypeNode(typeNode) ? factory.createArrayTypeNode(typeNode) : typeNode,
        param.initializer,
    );
    changeTracker.replaceRange(sourceFile, createRange(param.getStart(sourceFile), end), replacement);
}

function tryGetNextParam(sourceFile: SourceFile, param: ParameterDeclaration) {
    const nextToken = findNextToken(param.name, param.parent, sourceFile);
    if (
        nextToken && nextToken.kind === SyntaxKind.OpenBracketToken
        && isArrayBindingPattern(nextToken.parent) && isParameter(nextToken.parent.parent)
    ) {
        return nextToken.parent.parent;
    }
    return undefined;
}
