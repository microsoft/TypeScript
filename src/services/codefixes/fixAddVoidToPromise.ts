/* @internal */
namespace ts.codefix {
const fixName = "addVoidToPromise";
const fixId = "addVoidToPromise";
const errorCodes = [
    ts.Diagnostics.Expected_1_argument_but_got_0_new_Promise_needs_a_JSDoc_hint_to_produce_a_resolve_that_can_be_called_without_arguments.code,
    ts.Diagnostics.Expected_0_arguments_but_got_1_Did_you_forget_to_include_void_in_your_type_argument_to_Promise.code
];
ts.codefix.registerCodeFix({
    errorCodes,
    fixIds: [fixId],
    getCodeActions(context) {
        const changes = ts.textChanges.ChangeTracker.with(context, t => makeChange(t, context.sourceFile, context.span, context.program));
        if (changes.length > 0) {
            return [ts.codefix.createCodeFixAction(fixName, changes, ts.Diagnostics.Add_void_to_Promise_resolved_without_a_value, fixId, ts.Diagnostics.Add_void_to_all_Promises_resolved_without_a_value)];
        }
    },
    getAllCodeActions(context: ts.CodeFixAllContext) {
        return ts.codefix.codeFixAll(context, errorCodes, (changes, diag) => makeChange(changes, diag.file, diag, context.program, new ts.Set()));
    }
});

function makeChange(changes: ts.textChanges.ChangeTracker, sourceFile: ts.SourceFile, span: ts.TextSpan, program: ts.Program, seen?: ts.Set<ts.ParameterDeclaration>) {
    const node = ts.getTokenAtPosition(sourceFile, span.start);
    if (!ts.isIdentifier(node) || !ts.isCallExpression(node.parent) || node.parent.expression !== node || node.parent.arguments.length !== 0) return;

    const checker = program.getTypeChecker();
    const symbol = checker.getSymbolAtLocation(node);

    // decl should be `new Promise((<decl>) => {})`
    const decl = symbol?.valueDeclaration;
    if (!decl || !ts.isParameter(decl) || !ts.isNewExpression(decl.parent.parent)) return;

    // no need to make this change if we have already seen this parameter.
    if (seen?.has(decl)) return;
    seen?.add(decl);

    const typeArguments = getEffectiveTypeArguments(decl.parent.parent);
    if (ts.some(typeArguments)) {
        // append ` | void` to type argument
        const typeArgument = typeArguments[0];
        const needsParens = !ts.isUnionTypeNode(typeArgument) && !ts.isParenthesizedTypeNode(typeArgument) &&
            ts.isParenthesizedTypeNode(ts.factory.createUnionTypeNode([typeArgument, ts.factory.createKeywordTypeNode(ts.SyntaxKind.VoidKeyword)]).types[0]);
        if (needsParens) {
            changes.insertText(sourceFile, typeArgument.pos, "(");
        }
        changes.insertText(sourceFile, typeArgument.end, needsParens ? ") | void" : " | void");
    }
    else {
        // make sure the Promise is type is untyped (i.e., `unknown`)
        const signature = checker.getResolvedSignature(node.parent);
        const parameter = signature?.parameters[0];
        const parameterType = parameter && checker.getTypeOfSymbolAtLocation(parameter, decl.parent.parent);
        if (ts.isInJSFile(decl)) {
            if (!parameterType || parameterType.flags & ts.TypeFlags.AnyOrUnknown) {
                // give the expression a type
                changes.insertText(sourceFile, decl.parent.parent.end, `)`);
                changes.insertText(sourceFile, ts.skipTrivia(sourceFile.text, decl.parent.parent.pos), `/** @type {Promise<void>} */(`);
            }
        }
        else {
            if (!parameterType || parameterType.flags & ts.TypeFlags.Unknown) {
                // add `void` type argument
                changes.insertText(sourceFile, decl.parent.parent.expression.end, "<void>");
            }
        }
    }
}

function getEffectiveTypeArguments(node: ts.NewExpression) {
    if (ts.isInJSFile(node)) {
        if (ts.isParenthesizedExpression(node.parent)) {
            const jsDocType = ts.getJSDocTypeTag(node.parent)?.typeExpression.type;
            if (jsDocType && ts.isTypeReferenceNode(jsDocType) && ts.isIdentifier(jsDocType.typeName) && ts.idText(jsDocType.typeName) === "Promise") {
                return jsDocType.typeArguments;
            }
        }
    }
    else {
        return node.typeArguments;
    }
}
}