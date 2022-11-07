/* @internal */
namespace ts.codefix {
const fixId = "requireInTs";
const errorCodes = [ts.Diagnostics.require_call_may_be_converted_to_an_import.code];
ts.codefix.registerCodeFix({
    errorCodes,
    getCodeActions(context) {
        const info = getInfo(context.sourceFile, context.program, context.span.start);
        if (!info) {
            return undefined;
        }
        const changes = ts.textChanges.ChangeTracker.with(context, t => doChange(t, context.sourceFile, info));
        return [ts.codefix.createCodeFixAction(fixId, changes, ts.Diagnostics.Convert_require_to_import, fixId, ts.Diagnostics.Convert_all_require_to_import)];
    },
    fixIds: [fixId],
    getAllCodeActions: context => ts.codefix.codeFixAll(context, errorCodes, (changes, diag) => {
        const info = getInfo(diag.file, context.program, diag.start);
        if (info) {
            doChange(changes, context.sourceFile, info);
        }
    }),
});

function doChange(changes: ts.textChanges.ChangeTracker, sourceFile: ts.SourceFile, info: Info) {
    const { allowSyntheticDefaults, defaultImportName, namedImports, statement, required } = info;
    changes.replaceNode(sourceFile, statement, defaultImportName && !allowSyntheticDefaults
        ? ts.factory.createImportEqualsDeclaration(/*modifiers*/ undefined, /*isTypeOnly*/ false, defaultImportName, ts.factory.createExternalModuleReference(required))
        : ts.factory.createImportDeclaration(/*modifiers*/ undefined, ts.factory.createImportClause(/*isTypeOnly*/ false, defaultImportName, namedImports), required, /*assertClause*/ undefined));
}

interface Info {
    readonly allowSyntheticDefaults: boolean;
    readonly defaultImportName: ts.Identifier | undefined;
    readonly namedImports: ts.NamedImports | undefined;
    readonly statement: ts.VariableStatement;
    readonly required: ts.StringLiteralLike;
}

function getInfo(sourceFile: ts.SourceFile, program: ts.Program, pos: number): Info | undefined {
    const { parent } = ts.getTokenAtPosition(sourceFile, pos);
    if (!ts.isRequireCall(parent, /*checkArgumentIsStringLiteralLike*/ true)) {
        throw ts.Debug.failBadSyntaxKind(parent);
    }

    const decl = ts.cast(parent.parent, ts.isVariableDeclaration);
    const defaultImportName = ts.tryCast(decl.name, ts.isIdentifier);
    const namedImports = ts.isObjectBindingPattern(decl.name) ? tryCreateNamedImportsFromObjectBindingPattern(decl.name) : undefined;
    if (defaultImportName || namedImports) {
        return {
            allowSyntheticDefaults: ts.getAllowSyntheticDefaultImports(program.getCompilerOptions()),
            defaultImportName,
            namedImports,
            statement: ts.cast(decl.parent.parent, ts.isVariableStatement),
            required: ts.first(parent.arguments)
        };
    }
}

function tryCreateNamedImportsFromObjectBindingPattern(node: ts.ObjectBindingPattern): ts.NamedImports | undefined {
    const importSpecifiers: ts.ImportSpecifier[] = [];
    for (const element of node.elements) {
        if (!ts.isIdentifier(element.name) || element.initializer) {
            return undefined;
        }
        importSpecifiers.push(ts.factory.createImportSpecifier(/*isTypeOnly*/ false, ts.tryCast(element.propertyName, ts.isIdentifier), element.name));
    }

    if (importSpecifiers.length) {
        return ts.factory.createNamedImports(importSpecifiers);
    }
}
}
