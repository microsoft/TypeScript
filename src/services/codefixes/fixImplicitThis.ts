import * as ts from "../_namespaces/ts";

const fixId = "fixImplicitThis";
const errorCodes = [ts.Diagnostics.this_implicitly_has_type_any_because_it_does_not_have_a_type_annotation.code];
ts.codefix.registerCodeFix({
    errorCodes,
    getCodeActions: function getCodeActionsToFixImplicitThis(context) {
        const { sourceFile, program, span } = context;
        let diagnostic: ts.DiagnosticAndArguments | undefined;
        const changes = ts.textChanges.ChangeTracker.with(context, t => {
            diagnostic = doChange(t, sourceFile, span.start, program.getTypeChecker());
        });
        return diagnostic ? [ts.codefix.createCodeFixAction(fixId, changes, diagnostic, fixId, ts.Diagnostics.Fix_all_implicit_this_errors)] : ts.emptyArray;
    },
    fixIds: [fixId],
    getAllCodeActions: context => ts.codefix.codeFixAll(context, errorCodes, (changes, diag) => {
        doChange(changes, diag.file, diag.start, context.program.getTypeChecker());
    }),
});

function doChange(changes: ts.textChanges.ChangeTracker, sourceFile: ts.SourceFile, pos: number, checker: ts.TypeChecker): ts.DiagnosticAndArguments | undefined {
    const token = ts.getTokenAtPosition(sourceFile, pos);
    if (!ts.isThis(token)) return undefined;

    const fn = ts.getThisContainer(token, /*includeArrowFunctions*/ false);
    if (!ts.isFunctionDeclaration(fn) && !ts.isFunctionExpression(fn)) return undefined;

    if (!ts.isSourceFile(ts.getThisContainer(fn, /*includeArrowFunctions*/ false))) { // 'this' is defined outside, convert to arrow function
        const fnKeyword = ts.Debug.checkDefined(ts.findChildOfKind(fn, ts.SyntaxKind.FunctionKeyword, sourceFile));
        const { name } = fn;
        const body = ts.Debug.checkDefined(fn.body); // Should be defined because the function contained a 'this' expression
        if (ts.isFunctionExpression(fn)) {
            if (name && ts.FindAllReferences.Core.isSymbolReferencedInFile(name, checker, sourceFile, body)) {
                // Function expression references itself. To fix we would have to extract it to a const.
                return undefined;
            }

            // `function() {}` --> `() => {}`
            changes.delete(sourceFile, fnKeyword);
            if (name) {
                changes.delete(sourceFile, name);
            }
            changes.insertText(sourceFile, body.pos, " =>");
            return [ts.Diagnostics.Convert_function_expression_0_to_arrow_function, name ? name.text : ts.ANONYMOUS];
        }
        else {
            // `function f() {}` => `const f = () => {}`
            // `name` should be defined because we only do this in inner contexts, and name is only undefined for `export default function() {}`.
            changes.replaceNode(sourceFile, fnKeyword, ts.factory.createToken(ts.SyntaxKind.ConstKeyword));
            changes.insertText(sourceFile, name!.end, " = ");
            changes.insertText(sourceFile, body.pos, " =>");
            return [ts.Diagnostics.Convert_function_declaration_0_to_arrow_function, name!.text];
        }
    }
}
