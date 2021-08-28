/* @internal */
namespace ts.codefix {
    const fixId = "fixNonExported";
    const errorCodes = [
        Diagnostics.Module_0_declares_1_locally_but_it_is_not_exported.code,
    ];
    registerCodeFix({
        errorCodes,
        getCodeActions(context) {
            const { sourceFile, span, program } = context;

            const [symbol, source, nodeText, moduleSpecifierText] = getInfo(
                sourceFile,
                span.start,
                program.getTypeChecker()
            );

            if (!symbol || !source) return;

            const changes = textChanges.ChangeTracker.with(context, (t) => {
                doChange(t, symbol, source);
            });

            return [
                createCodeFixAction(
                    fixId,
                    changes,
                    [
                        Diagnostics.Export_1_from_module_0,
                        moduleSpecifierText,
                        nodeText,
                    ],
                    fixId,
                    Diagnostics.Add_all_missing_exports,
                ),
            ];
        },
        getAllCodeActions: (context) =>
            codeFixAll(context, errorCodes, (changes, diag) => {
                const [symbol, source] = getInfo(
                    diag.file,
                    diag.start,
                    context.program.getTypeChecker()
                );

                if (!symbol || !source) return;

                doChange(changes, symbol, source);
            }),
        fixIds: [fixId],
    });

    function doChange(
        changes: textChanges.ChangeTracker,
        symbol: Symbol,
        sourceFile: SourceFile,
    ) {
        const decelerations = sourceFile.getNamedDeclarations().get(symbol.getName());
        
        const ancestor = findAncestor(decelerations?.[0], v => 
            isVariableStatement(v) || 
            isDeclarationStatement(v) ||
            isFunctionLikeDeclaration(v) 
            );

        if (!ancestor) return;

        changes.insertExportModifier(sourceFile, ancestor as DeclarationStatement);

    }

    function getInfo(
        sourceFile: SourceFile,
        start: number,
        typeChecker: TypeChecker
    ) {
        const node = getTokenAtPosition(sourceFile, start);
        if (!isImportSpecifier(node.parent)) return [];

        const ancestor = findAncestor(node, isImportDeclaration)
        if (!ancestor) return []

        const otherFileSymbol =
            typeChecker.getSymbolAtLocation(ancestor.moduleSpecifier);
        if (!otherFileSymbol) return [];

        const otherSourceFile =
            otherFileSymbol.declarations?.[0]?.getSourceFile();
        const otherNodeSymbol = typeChecker.getSymbolAtLocation(
                node.parent.name
        );
        if (!otherSourceFile || !otherNodeSymbol) return [];

        return [
            otherNodeSymbol,
            otherSourceFile,
            node.getText(),
            ancestor.moduleSpecifier.getText(),
        ] as const;
    }
}





