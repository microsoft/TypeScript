import {
    codeFixAll,
    createCodeFixAction,
    registerCodeFix,
} from "../_namespaces/ts.codefix.js";
import {
    cast,
    Debug,
    Diagnostics,
    factory,
    first,
    getAllowSyntheticDefaultImports,
    getQuotePreference,
    getTokenAtPosition,
    Identifier,
    ImportSpecifier,
    isIdentifier,
    isNoSubstitutionTemplateLiteral,
    isObjectBindingPattern,
    isRequireCall,
    isVariableDeclaration,
    isVariableStatement,
    NamedImports,
    ObjectBindingPattern,
    Program,
    QuotePreference,
    SourceFile,
    StringLiteralLike,
    textChanges,
    tryCast,
    UserPreferences,
    VariableStatement,
} from "../_namespaces/ts.js";

const fixId = "requireInTs";
const errorCodes = [Diagnostics.require_call_may_be_converted_to_an_import.code];
registerCodeFix({
    errorCodes,
    getCodeActions(context) {
        const info = getInfo(context.sourceFile, context.program, context.span.start, context.preferences);
        if (!info) {
            return undefined;
        }
        const changes = textChanges.ChangeTracker.with(context, t => doChange(t, context.sourceFile, info));
        return [createCodeFixAction(fixId, changes, Diagnostics.Convert_require_to_import, fixId, Diagnostics.Convert_all_require_to_import)];
    },
    fixIds: [fixId],
    getAllCodeActions: context =>
        codeFixAll(context, errorCodes, (changes, diag) => {
            const info = getInfo(diag.file, context.program, diag.start, context.preferences);
            if (info) {
                doChange(changes, context.sourceFile, info);
            }
        }),
});

function doChange(changes: textChanges.ChangeTracker, sourceFile: SourceFile, info: Info) {
    const { allowSyntheticDefaults, defaultImportName, namedImports, statement, moduleSpecifier } = info;
    changes.replaceNode(
        sourceFile,
        statement,
        defaultImportName && !allowSyntheticDefaults
            ? factory.createImportEqualsDeclaration(/*modifiers*/ undefined, /*isTypeOnly*/ false, defaultImportName, factory.createExternalModuleReference(moduleSpecifier))
            : factory.createImportDeclaration(/*modifiers*/ undefined, factory.createImportClause(/*isTypeOnly*/ false, defaultImportName, namedImports), moduleSpecifier, /*attributes*/ undefined),
    );
}

interface Info {
    readonly allowSyntheticDefaults: boolean;
    readonly defaultImportName: Identifier | undefined;
    readonly namedImports: NamedImports | undefined;
    readonly statement: VariableStatement;
    readonly moduleSpecifier: StringLiteralLike;
}

function getInfo(sourceFile: SourceFile, program: Program, pos: number, preferences: UserPreferences): Info | undefined {
    const { parent } = getTokenAtPosition(sourceFile, pos);
    if (!isRequireCall(parent, /*requireStringLiteralLikeArgument*/ true)) {
        Debug.failBadSyntaxKind(parent);
    }

    const decl = cast(parent.parent, isVariableDeclaration);
    const quotePreference = getQuotePreference(sourceFile, preferences);
    const defaultImportName = tryCast(decl.name, isIdentifier);
    const namedImports = isObjectBindingPattern(decl.name) ? tryCreateNamedImportsFromObjectBindingPattern(decl.name) : undefined;
    if (defaultImportName || namedImports) {
        const moduleSpecifier = first(parent.arguments);
        return {
            allowSyntheticDefaults: getAllowSyntheticDefaultImports(program.getCompilerOptions()),
            defaultImportName,
            namedImports,
            statement: cast(decl.parent.parent, isVariableStatement),
            moduleSpecifier: isNoSubstitutionTemplateLiteral(moduleSpecifier) ? factory.createStringLiteral(moduleSpecifier.text, quotePreference === QuotePreference.Single) : moduleSpecifier,
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
