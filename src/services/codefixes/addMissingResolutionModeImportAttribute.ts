import {
    codeFixAll,
    createCodeFixAction,
    registerCodeFix,
} from "../_namespaces/ts.codefix.js";
import {
    Debug,
    Diagnostics,
    factory,
    findAncestor,
    getQuotePreference,
    getTokenAtPosition,
    isImportDeclaration,
    isImportTypeNode,
    LanguageServiceHost,
    ModuleKind,
    or,
    Program,
    QuotePreference,
    resolveModuleName,
    SourceFile,
    SyntaxKind,
    textChanges,
    tryGetModuleSpecifierFromDeclaration,
    UserPreferences,
} from "../_namespaces/ts.js";

const fixId = "addMissingResolutionModeImportAttribute";
const errorCodes = [
    Diagnostics.Type_only_import_of_an_ECMAScript_module_from_a_CommonJS_module_must_have_a_resolution_mode_attribute.code,
    Diagnostics.Type_import_of_an_ECMAScript_module_from_a_CommonJS_module_must_have_a_resolution_mode_attribute.code,
];

registerCodeFix({
    errorCodes,
    getCodeActions: function getCodeActionsToAddMissingResolutionModeImportAttribute(context) {
        const changes = textChanges.ChangeTracker.with(context, t => makeChange(t, context.sourceFile, context.span.start, context.program, context.host, context.preferences));
        return [createCodeFixAction(fixId, changes, Diagnostics.Add_resolution_mode_import_attribute, fixId, Diagnostics.Add_resolution_mode_import_attribute_to_all_type_only_imports_that_need_it)];
    },
    fixIds: [fixId],
    getAllCodeActions: context => codeFixAll(context, errorCodes, (changes, diag) => makeChange(changes, diag.file, diag.start, context.program, context.host, context.preferences)),
});

function makeChange(changeTracker: textChanges.ChangeTracker, sourceFile: SourceFile, pos: number, program: Program, host: LanguageServiceHost, preferences: UserPreferences) {
    const token = getTokenAtPosition(sourceFile, pos);
    const importNode = findAncestor(token, or(isImportDeclaration, isImportTypeNode))!;
    Debug.assert(!!importNode, "Expected position to be owned by an ImportDeclaration or ImportType.");
    const useSingleQuotes = getQuotePreference(sourceFile, preferences) === QuotePreference.Single;
    const moduleSpecifier = tryGetModuleSpecifierFromDeclaration(importNode);
    const canUseImportMode = !moduleSpecifier || (resolveModuleName(
        moduleSpecifier.text,
        sourceFile.fileName,
        program.getCompilerOptions(),
        host,
        program.getModuleResolutionCache(),
        /*redirectedReference*/ undefined,
        ModuleKind.ESNext,
    ).resolvedModule?.resolvedFileName === program.getResolvedModuleFromModuleSpecifier(
        moduleSpecifier,
        sourceFile,
    )?.resolvedModule?.resolvedFileName);

    const attributes = importNode.attributes
        ? factory.updateImportAttributes(
            importNode.attributes,
            factory.createNodeArray([
                ...importNode.attributes.elements,
                factory.createImportAttribute(
                    factory.createStringLiteral("resolution-mode", useSingleQuotes),
                    factory.createStringLiteral(canUseImportMode ? "import" : "require", useSingleQuotes),
                ),
            ], importNode.attributes.elements.hasTrailingComma),
            importNode.attributes.multiLine,
        )
        : factory.createImportAttributes(
            factory.createNodeArray([
                factory.createImportAttribute(
                    factory.createStringLiteral("resolution-mode", useSingleQuotes),
                    factory.createStringLiteral(canUseImportMode ? "import" : "require", useSingleQuotes),
                ),
            ]),
        );
    if (importNode.kind === SyntaxKind.ImportDeclaration) {
        changeTracker.replaceNode(
            sourceFile,
            importNode,
            factory.updateImportDeclaration(
                importNode,
                importNode.modifiers,
                importNode.importClause,
                importNode.moduleSpecifier,
                attributes,
            ),
        );
    }
    else {
        changeTracker.replaceNode(
            sourceFile,
            importNode,
            factory.updateImportTypeNode(
                importNode,
                importNode.argument,
                attributes,
                importNode.qualifier,
                importNode.typeArguments,
            ),
        );
    }
}
