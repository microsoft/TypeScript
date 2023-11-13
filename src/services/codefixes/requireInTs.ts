import {
    cast,
    Debug,
    Diagnostics,
    factory,
    first,
    getAllowSyntheticDefaultImports,
    getTokenAtPosition,
    Identifier,
    ImportSpecifier,
    isIdentifier,
    isObjectBindingPattern,
    isRequireCall,
    isVariableDeclaration,
    isVariableStatement,
    NamedImports,
    ObjectBindingPattern,
    Program,
    SourceFile,
    StringLiteralLike,
    textChanges,
    tryCast,
    VariableStatement,
} from "../_namespaces/ts";
import {
    codeFixAll,
    createCodeFixAction,
    registerCodeFix,
} from "../_namespaces/ts.codefix";

const fixId = "requireInTs";
const errorCodes = [Diagnostics.require_call_may_be_converted_to_an_import.code];
registerCodeFix({
    errorCodes,
    getCodeActions(context) {
        const info = getInfo(context.sourceFile, context.program, context.span.start);
        if (!info) {
            return undefined;
        }
        const changes = textChanges.ChangeTracker.with(context, t => doChange(t, context.sourceFile, info));
        return [createCodeFixAction(fixId, changes, Diagnostics.Convert_require_to_import, fixId, Diagnostics.Convert_all_require_to_import)];
    },
    fixIds: [fixId],
    getAllCodeActions: context =>
        codeFixAll(context, errorCodes, (changes, diag) => {
            const info = getInfo(diag.file, context.program, diag.start);
            if (info) {
                doChange(changes, context.sourceFile, info);
            }
        }),
});

function doChange(changes: textChanges.ChangeTracker, sourceFile: SourceFile, info: Info) {
    const { allowSyntheticDefaults, defaultImportName, namedImports, statement, required } = info;
    changes.replaceNode(
        sourceFile,
        statement,
        defaultImportName && !allowSyntheticDefaults
            ? factory.createImportEqualsDeclaration(/*modifiers*/ undefined, /*isTypeOnly*/ false, defaultImportName, factory.createExternalModuleReference(required))
            : factory.createImportDeclaration(/*modifiers*/ undefined, factory.createImportClause(/*isTypeOnly*/ false, defaultImportName, namedImports), required, /*attributes*/ undefined),
    );
}

interface Info {
    readonly allowSyntheticDefaults: boolean;
    readonly defaultImportName: Identifier | undefined;
    readonly namedImports: NamedImports | undefined;
    readonly statement: VariableStatement;
    readonly required: StringLiteralLike;
}

function getInfo(sourceFile: SourceFile, program: Program, pos: number): Info | undefined {
    const { parent } = getTokenAtPosition(sourceFile, pos);
    if (!isRequireCall(parent, /*requireStringLiteralLikeArgument*/ true)) {
        Debug.failBadSyntaxKind(parent);
    }

    const decl = cast(parent.parent, isVariableDeclaration);
    const defaultImportName = tryCast(decl.name, isIdentifier);
    const namedImports = isObjectBindingPattern(decl.name) ? tryCreateNamedImportsFromObjectBindingPattern(decl.name) : undefined;
    if (defaultImportName || namedImports) {
        return {
            allowSyntheticDefaults: getAllowSyntheticDefaultImports(program.getCompilerOptions()),
            defaultImportName,
            namedImports,
            statement: cast(decl.parent.parent, isVariableStatement),
            required: first(parent.arguments),
        };
    }
}

function tryCreateNamedImportsFromObjectBindingPattern(node: ObjectBindingPattern): NamedImports | undefined {
    const importSpecifiers: ImportSpecifier[] = [];
    for (const element of node.elements) {
        if (!isIdentifier(element.name) || element.initializer) {
            return undefined;
        }
        importSpecifiers.push(factory.createImportSpecifier(/*isTypeOnly*/ false, tryCast(element.propertyName, isIdentifier), element.name));
    }

    if (importSpecifiers.length) {
        return factory.createNamedImports(importSpecifiers);
    }
}
