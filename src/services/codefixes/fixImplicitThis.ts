/* @internal */
namespace ts.codefix {
    const fixId = "fixImplicitThis";
    const errorCodes = [Diagnostics.this_implicitly_has_type_any_because_it_does_not_have_a_type_annotation.code];
    registerCodeFix({
        errorCodes,
        getCodeActions(context) {
            const { sourceFile, program, span } = context;
            let diagnostic: DiagnosticAndArguments | undefined;
            const changes = textChanges.ChangeTracker.with(context, t => {
                diagnostic = doChange(t, sourceFile, span.start, program.getTypeChecker());
            });
            return diagnostic ? [createCodeFixAction(fixId, changes, diagnostic, fixId, Diagnostics.Fix_all_implicit_this_errors)] : emptyArray;
        },
        fixIds: [fixId],
        getAllCodeActions: context => codeFixAll(context, errorCodes, (changes, diag) => {
            doChange(changes, diag.file, diag.start, context.program.getTypeChecker());
        }),
    });

    function doChange(changes: textChanges.ChangeTracker, sourceFile: SourceFile, pos: number, checker: TypeChecker): DiagnosticAndArguments | undefined {
        const token = getTokenAtPosition(sourceFile, pos);
        Debug.assert(token.kind === SyntaxKind.ThisKeyword);

        const fn = getThisContainer(token, /*includeArrowFunctions*/ false);
        if (!isFunctionDeclaration(fn) && !isFunctionExpression(fn)) return undefined;

        if (!isSourceFile(getThisContainer(fn, /*includeArrowFunctions*/ false))) { // 'this' is defined outside, convert to arrow function
            const fnKeyword = Debug.assertDefined(findChildOfKind(fn, SyntaxKind.FunctionKeyword, sourceFile));
            const { name } = fn;
            const body = Debug.assertDefined(fn.body); // Should be defined because the function contained a 'this' expression
            if (isFunctionExpression(fn)) {
                if (name && FindAllReferences.Core.isSymbolReferencedInFile(name, checker, sourceFile, body)) {
                    // Function expression references itself. To fix we would have to extract it to a const.
                    return undefined;
                }

                // `function() {}` --> `() => {}`
                changes.delete(sourceFile, fnKeyword);
                if (name) {
                    changes.delete(sourceFile, name);
                }
                changes.insertText(sourceFile, body.pos, " =>");
                return [Diagnostics.Convert_function_expression_0_to_arrow_function, name ? name.text : ANONYMOUS];
            }
            else {
                // `function f() {}` => `const f = () => {}`
                // `name` should be defined because we only do this in inner contexts, and name is only undefined for `export default function() {}`.
                changes.replaceNode(sourceFile, fnKeyword, createToken(SyntaxKind.ConstKeyword));
                changes.insertText(sourceFile, name!.end, " = ");
                changes.insertText(sourceFile, body.pos, " =>");
                return [Diagnostics.Convert_function_declaration_0_to_arrow_function, name!.text];
            }
        }
        // No outer 'this', add a @class tag if in a JS constructor function
        else if (isSourceFileJS(sourceFile) && isPropertyAccessExpression(token.parent) && isAssignmentExpression(token.parent.parent)) {
            addJSDocTags(changes, sourceFile, fn, [createJSDocClassTag()]);
            return Diagnostics.Add_class_tag;
        }
    }
}
