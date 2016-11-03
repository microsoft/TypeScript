/* @internal */
namespace ts.codefix {
    const nodeModulesFolderName = "node_modules";

    registerCodeFix({
        errorCodes: [Diagnostics.Cannot_find_name_0.code],
        getCodeActions: (context: CodeFixContext, cancellationToken: CancellationToken) => {
            const sourceFile = context.sourceFile;
            const checker = context.program.getTypeChecker();
            const allSourceFiles = context.program.getSourceFiles();
            const useCaseSensitiveFileNames = context.host.useCaseSensitiveFileNames ? context.host.useCaseSensitiveFileNames() : false;

            const token = getTokenAtPosition(sourceFile, context.span.start);
            const name = token.getText();
            const allActions: CodeAction[] = [];

            const allPotentialModules = concatenate(checker.getAmbientModules(), map(allSourceFiles, sf => sf.symbol));

            for (const moduleSymbol of allPotentialModules) {
                cancellationToken.throwIfCancellationRequested();

                const exports = checker.getExportsOfModule(moduleSymbol) || [];
                for (const exported of exports) {
                    if (exported.name === name) {
                        allActions.push(getCodeActionForImport(moduleSymbol));
                    }
                }
            }

            return allActions;

            function getCodeActionForImport(moduleSymbol: Symbol): CodeAction {
                // Check to see if there are already imports being made from this source in the current file
                const existingDeclaration = forEach(sourceFile.imports, importModuleSpecifier => {
                    const importSymbol = checker.getSymbolAtLocation(importModuleSpecifier);
                    if (importSymbol === moduleSymbol) {
                        return getImportDeclaration(importModuleSpecifier);
                    }
                });

                if (existingDeclaration) {
                    return getCodeActionForExistingImport(existingDeclaration);
                }
                else {
                    return getCodeActionForNewImport();
                }

                function getImportDeclaration(moduleSpecifier: LiteralExpression) {
                    let node: Node = moduleSpecifier;
                    while (node) {
                        if (node.kind !== SyntaxKind.ImportDeclaration) {
                            node = node.parent;
                        }

                        return <ImportDeclaration>node;
                    }
                    return undefined;
                }

                function getCodeActionForExistingImport(declaration: ImportDeclaration): CodeAction {
                    const moduleSpecifier = declaration.moduleSpecifier.getText();

                    // We have to handle all of the different import declaration forms
                    if (declaration.importClause) {
                        if (declaration.importClause.namedBindings) {
                            const namedBindings = declaration.importClause.namedBindings;
                            if (namedBindings.kind === SyntaxKind.NamespaceImport) {
                                /**
                                 * Cases:
                                 *     import * as ns from "mod"
                                 *     import d, * as ns from "mod"
                                 *
                                 * Because there is no import list, we alter the reference to include the
                                 * namespace instead of altering the import declaration. For example, "foo" would
                                 * become "ns.foo"
                                 */
                                const ns = (<NamespaceImport>namedBindings).name.getText();
                                return createCodeAction(
                                    Diagnostics.Change_0_to_1,
                                    [name, `${ns}.${name}`],
                                    `${ns}.`,
                                    { start: token.getStart(), length: 0 },
                                    sourceFile.fileName
                                );
                            }
                            else if (namedBindings.kind === SyntaxKind.NamedImports) {
                                /**
                                 * Cases:
                                 *     import { a, b as x } from "mod"
                                 *     import d, { a, b as x } from "mod"
                                 *
                                 * Because there is already an import list, just insert the identifier into it
                                 */
                                const textChange = getTextChangeForImportList(<NamedImports>namedBindings);
                                return createCodeAction(
                                    Diagnostics.Add_0_to_existing_import_declaration_from_1,
                                    [name, moduleSpecifier],
                                    textChange.newText,
                                    textChange.span,
                                    sourceFile.fileName
                                );
                            }
                        }
                        else if (declaration.importClause.name) {
                            /**
                             * Case: import d from "mod"
                             *
                             * Add a list of imports after the default import
                             */
                            return createCodeAction(
                                Diagnostics.Add_0_to_existing_import_declaration_from_1,
                                [name, moduleSpecifier],
                                `, { ${name} }`,
                                { start: declaration.importClause.name.getEnd(), length: 0 },
                                sourceFile.fileName
                            );
                        }

                        function getTextChangeForImportList(importList: NamedImports): TextChange {
                            if (importList.elements.length === 0) {
                                const start = importList.getStart();
                                return {
                                    newText: `{ ${name} }`,
                                    span: { start, length: importList.getEnd() - start }
                                };
                            }

                            // Insert after the last element
                            const insertPoint = importList.elements[importList.elements.length - 1].getEnd();

                            // If the import list has one import per line, preserve that. Otherwise, insert on same line as last element
                            let oneImportPerLine: boolean;

                            if (importList.elements.length === 1) {
                                /**
                                 * If there is only one symbol being imported, still check to see if it's set up for multi-line imports like this:
                                 *     import {
                                 *         foo
                                 *     } from "./module";
                                 */
                                const startLine = getLineOfLocalPosition(sourceFile, importList.getStart());
                                const endLine = getLineOfLocalPosition(sourceFile, importList.getEnd());

                                oneImportPerLine = endLine - startLine >= 2;
                            }
                            else {
                                const startLine = getLineOfLocalPosition(sourceFile, importList.elements[0].getStart());
                                const endLine = getLineOfLocalPosition(sourceFile, insertPoint);

                                oneImportPerLine = endLine - startLine >= importList.elements.length - 1;
                            }

                            return {
                                newText: oneImportPerLine ? `, ${context.newLineCharacter}${name}` : `,${name}`,
                                span: { start: insertPoint, length: 0 }
                            };
                        }

                    }

                    return createCodeAction(
                        Diagnostics.Add_0_to_existing_import_declaration_from_1,
                        [name, moduleSpecifier],
                        `{ ${name} } from `,
                        { start: declaration.moduleSpecifier.getStart(), length: 0 },
                        sourceFile.fileName
                    );
                }

                function getCodeActionForNewImport(): CodeAction {
                    // Try to insert after any existing imports
                    let lastModuleSpecifierEnd = -1;
                    for (const moduleSpecifier of sourceFile.imports) {
                        const end = moduleSpecifier.getEnd();
                        if (!lastModuleSpecifierEnd || end > lastModuleSpecifierEnd) {
                            lastModuleSpecifierEnd = end;
                        }
                    }

                    const moduleSpecifier = getModuleSpecifierForNewImport();
                    let newText = `import { ${name} } from "${moduleSpecifier}";`;
                    newText = lastModuleSpecifierEnd ? context.newLineCharacter + newText : newText + context.newLineCharacter;

                    return createCodeAction(
                        Diagnostics.Import_0_from_1,
                        [name, `"${moduleSpecifier}"`],
                        newText,
                        {
                            start: lastModuleSpecifierEnd >= 0 ? lastModuleSpecifierEnd + 1 : sourceFile.getStart(),
                            length: 0
                        },
                        sourceFile.fileName
                    );
                }

                function getModuleSpecifierForNewImport(): string {
                    const sourceDir = getDirectoryPath(sourceFile.fileName);

                    // If the module is from a module file, then there are typically two cases:
                    //     1. from a source file in your program
                    //     2. from a declaration file in a node_modules folder:
                    //        2.1 the node_modules folder is in the sourceDir or above (can be found by the module resolution)
                    //        2.2 the node_modules folder is in a subfolder of the sourceDir (cannot be found by the module resolution)
                    // for case 1 and 2.2, we would return the relative file path as the module specifier;
                    // for case 2.1, we would just use the module name instead.
                    if (moduleSymbol.valueDeclaration.kind === SyntaxKind.SourceFile) {
                        const moduleFileName = moduleSymbol.valueDeclaration.getSourceFile().fileName;

                        // case 2.1
                        if (moduleFileName.indexOf(combinePaths(sourceDir, nodeModulesFolderName)) === 0 ||
                            (moduleFileName.indexOf(sourceDir) < 0 && moduleFileName.indexOf(`${directorySeparator}${nodeModulesFolderName}${directorySeparator}`) >= 0)) {
                            return moduleSymbol.name;
                        }

                        // case 1 and case 2.2
                        const relativePath = getRelativePathToDirectoryOrUrl(
                            sourceDir,
                            moduleFileName,
                            /*currentDirectory*/ sourceDir,
                            createGetCanonicalFileName(useCaseSensitiveFileNames),
                            /*isAbsolutePathAnUrl*/ false
                        );

                        // Make sure we got back a path that can be a valid module specifier
                        const isRootedOrRelative = isExternalModuleNameRelative(relativePath) || isRootedDiskPath(relativePath);
                        return removeFileExtension(isRootedOrRelative ? relativePath : combinePaths(".", relativePath));

                    }

                    // the module is not from a module file, so just return the module name.
                    return moduleSymbol.name;
                }
            }

            function createCodeAction(description: DiagnosticMessage, diagnosticArgs: string[], newText: string, span: TextSpan, fileName: string): CodeAction {
                return {
                    description: formatMessage.apply(undefined, [undefined, description].concat(<any[]>diagnosticArgs)),
                    changes: [{ fileName, textChanges: [{ newText, span }] }]
                };
            }
        }
    });
}
