/* @internal */
namespace ts.codefix {
    const fixId = "fixSpelling";
    const errorCodes = [
        Diagnostics.Property_0_does_not_exist_on_type_1_Did_you_mean_2.code,
        Diagnostics.Cannot_find_name_0_Did_you_mean_1.code,
        Diagnostics.Cannot_find_name_0_Did_you_mean_the_instance_member_this_0.code,
        Diagnostics.Cannot_find_name_0_Did_you_mean_the_static_member_1_0.code,
        Diagnostics.Module_0_has_no_exported_member_1_Did_you_mean_2.code,
    ];
    registerCodeFix({
        errorCodes,
        getCodeActions(context) {
            const { sourceFile } = context;
            const info = getInfo(sourceFile, context.span.start, context);
            if (!info) return undefined;
            const { node, suggestedSymbol } = info;
            const { target } = context.host.getCompilationSettings();
            const changes = textChanges.ChangeTracker.with(context, t => doChange(t, sourceFile, node, suggestedSymbol, target!));
            return [createCodeFixAction("spelling", changes, [Diagnostics.Change_spelling_to_0, symbolName(suggestedSymbol)], fixId, Diagnostics.Fix_all_detected_spelling_errors)];
        },
        fixIds: [fixId],
        getAllCodeActions: context => codeFixAll(context, errorCodes, (changes, diag) => {
            const info = getInfo(diag.file, diag.start, context);
            const { target } = context.host.getCompilationSettings();
            if (info) doChange(changes, context.sourceFile, info.node, info.suggestedSymbol, target!);
        }),
    });

    function getInfo(sourceFile: SourceFile, pos: number, context: CodeFixContextBase): { node: Node, suggestedSymbol: Symbol } | undefined {
        // This is the identifier of the misspelled word. eg:
        // this.speling = 1;
        //      ^^^^^^^
        const node = getTokenAtPosition(sourceFile, pos);
        const parent = node.parent;
        const checker = context.program.getTypeChecker();

        let suggestedSymbol: Symbol | undefined;
        if (isPropertyAccessExpression(parent) && parent.name === node) {
            Debug.assert(isIdentifierOrPrivateIdentifier(node), "Expected an identifier for spelling (property access)");
            let containingType = checker.getTypeAtLocation(parent.expression);
            if (parent.flags & NodeFlags.OptionalChain) {
                containingType = checker.getNonNullableType(containingType);
            }
            suggestedSymbol = checker.getSuggestedSymbolForNonexistentProperty(node, containingType);
        }
        else if (isImportSpecifier(parent) && parent.name === node) {
            Debug.assertNode(node, isIdentifier, "Expected an identifier for spelling (import)");
            const importDeclaration = findAncestor(node, isImportDeclaration)!;
            const resolvedSourceFile = getResolvedSourceFileFromImportDeclaration(sourceFile, context, importDeclaration);
            if (resolvedSourceFile && resolvedSourceFile.symbol) {
                suggestedSymbol = checker.getSuggestedSymbolForNonexistentModule(node, resolvedSourceFile.symbol);
            }
        }
        else {
            const meaning = getMeaningFromLocation(node);
            const name = getTextOfNode(node);
            Debug.assert(name !== undefined, "name should be defined");
            suggestedSymbol = checker.getSuggestedSymbolForNonexistentSymbol(node, name, convertSemanticMeaningToSymbolFlags(meaning));
        }

        return suggestedSymbol === undefined ? undefined : { node, suggestedSymbol };
    }

    function doChange(changes: textChanges.ChangeTracker, sourceFile: SourceFile, node: Node, suggestedSymbol: Symbol, target: ScriptTarget) {
        const suggestion = symbolName(suggestedSymbol);
        if (!isIdentifierText(suggestion, target) && isPropertyAccessExpression(node.parent)) {
            const valDecl = suggestedSymbol.valueDeclaration;
            if (isNamedDeclaration(valDecl) && isPrivateIdentifier(valDecl.name)) {
                changes.replaceNode(sourceFile, node, factory.createIdentifier(suggestion));
            }
            else {
                changes.replaceNode(sourceFile, node.parent, factory.createElementAccessExpression(node.parent.expression, factory.createStringLiteral(suggestion)));
            }
        }
        else {
            changes.replaceNode(sourceFile, node, factory.createIdentifier(suggestion));
        }
    }

    function convertSemanticMeaningToSymbolFlags(meaning: SemanticMeaning): SymbolFlags {
        let flags = 0;
        if (meaning & SemanticMeaning.Namespace) {
            flags |= SymbolFlags.Namespace;
        }
        if (meaning & SemanticMeaning.Type) {
            flags |= SymbolFlags.Type;
        }
        if (meaning & SemanticMeaning.Value) {
            flags |= SymbolFlags.Value;
        }
        return flags;
    }

    function getResolvedSourceFileFromImportDeclaration(sourceFile: SourceFile, context: CodeFixContextBase, importDeclaration: ImportDeclaration): SourceFile | undefined {
        if (!importDeclaration || !isStringLiteralLike(importDeclaration.moduleSpecifier)) return undefined;

        const resolvedModule = getResolvedModule(sourceFile, importDeclaration.moduleSpecifier.text);
        if (!resolvedModule) return undefined;

        return context.program.getSourceFile(resolvedModule.resolvedFileName);
    }
}
