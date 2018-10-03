/* @internal */
namespace ts.codefix {
    registerCodeFix({
        errorCodes: [Diagnostics.A_namespace_style_import_cannot_be_called_or_constructed_and_will_cause_a_failure_at_runtime.code],
        getCodeActions: getActionsForInvalidImport
    });

    function getActionsForInvalidImport(context: CodeFixContext): CodeAction[] | undefined {
        const sourceFile = context.sourceFile;

        // This is the whole import statement, eg:
        // import * as Bluebird from 'bluebird';
        // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        const node = getTokenAtPosition(sourceFile, context.span.start, /*includeJsDocComment*/ false).parent as ImportDeclaration;
        if (!isImportDeclaration(node)) {
            // No import quick fix for import calls
            return [];
        }
        return getCodeFixesForImportDeclaration(context, node);
    }

    function getCodeFixesForImportDeclaration(context: CodeFixContext, node: ImportDeclaration) {
        const sourceFile = getSourceFileOfNode(node);
        const namespace = getNamespaceDeclarationNode(node) as NamespaceImport;
        const opts = context.program.getCompilerOptions();
        const variations: CodeAction[] = [];

        // import Bluebird from "bluebird";
        variations.push(createAction(context, sourceFile, node, makeImportDeclaration(namespace.name, /*namedImports*/ undefined, node.moduleSpecifier)));

        if (getEmitModuleKind(opts) === ModuleKind.CommonJS) {
            // import Bluebird = require("bluebird");
            variations.push(createAction(context, sourceFile, node, createImportEqualsDeclaration(
                /*decorators*/ undefined,
                /*modifiers*/ undefined,
                namespace.name,
                createExternalModuleReference(node.moduleSpecifier)
            )));
        }

        return variations;
    }

    function createAction(context: CodeFixContext, sourceFile: SourceFile, node: Node, replacement: Node): CodeAction {
        // TODO: GH#21246 Should be able to use `replaceNode`, but be sure to preserve comments (see `codeFixCalledES2015Import11.ts`)
        const changes = textChanges.ChangeTracker.with(context, t => t.replaceRange(sourceFile, { pos: node.getStart(), end: node.end }, replacement));
        return {
            description: formatStringFromArgs(getLocaleSpecificMessage(Diagnostics.Replace_import_with_0), [changes[0].textChanges[0].newText]),
            changes,
        };
    }

    registerCodeFix({
        errorCodes: [
            Diagnostics.Cannot_invoke_an_expression_whose_type_lacks_a_call_signature_Type_0_has_no_compatible_call_signatures.code,
            Diagnostics.Cannot_use_new_with_an_expression_whose_type_lacks_a_call_or_construct_signature.code,
        ],
        getCodeActions: getActionsForUsageOfInvalidImport
    });

    function getActionsForUsageOfInvalidImport(context: CodeFixContext): CodeAction[] | undefined {
        const sourceFile = context.sourceFile;
        const targetKind = Diagnostics.Cannot_invoke_an_expression_whose_type_lacks_a_call_signature_Type_0_has_no_compatible_call_signatures.code === context.errorCode ? SyntaxKind.CallExpression : SyntaxKind.NewExpression;
        const node = findAncestor(getTokenAtPosition(sourceFile, context.span.start, /*includeJsDocComment*/ false), a => a.kind === targetKind && a.getStart() === context.span.start && a.getEnd() === (context.span.start + context.span.length)) as CallExpression | NewExpression;
        if (!node) {
            return [];
        }
        const expr = node.expression;
        const type = context.program.getTypeChecker().getTypeAtLocation(expr);
        if (!(type.symbol && (type.symbol as TransientSymbol).originatingImport)) {
            return [];
        }
        const fixes: CodeAction[] = [];
        const relatedImport = (type.symbol as TransientSymbol).originatingImport;
        if (!isImportCall(relatedImport)) {
            addRange(fixes, getCodeFixesForImportDeclaration(context, relatedImport));
        }
        fixes.push({
            description: getLocaleSpecificMessage(Diagnostics.Use_synthetic_default_member),
            changes: textChanges.ChangeTracker.with(context, t => t.replaceNode(sourceFile, expr, createPropertyAccess(expr, "default"), {})),
        });
        return fixes;
    }
}
