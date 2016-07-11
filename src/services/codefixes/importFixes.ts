/* @internal */
namespace ts.codeFix {
    const nodeModulesDir = directorySeparator + "node_modules" + directorySeparator;

    registerCodeFix({
        name: getLocaleSpecificMessage(Diagnostics.Add_missing_import_for_unknown_identifier),
        errorCodes: ["TS2304"],
        getCodeActions: (context: CodeFixContext) => {
            const { sourceFile, checker } = context;

            const token = getTokenAtPosition(sourceFile, context.span.start);
            const name = token.getText();

            // Get existing ImportDeclarations from the source file
            const imports: ImportDeclaration[] = [];
            if (sourceFile.statements) {
                forEach(sourceFile.statements, (statement) => {
                    if (statement.kind === SyntaxKind.ImportDeclaration) {
                        imports.push(<ImportDeclaration>statement);
                    }
                });
            }

            const allActions: CodeAction[] = [];

            // Check if a matching symbol is exported by any ambient modules that have been declared
            const ambientModules = checker.getAmbientModules();
            forEach(ambientModules, (moduleSymbol) => {
                const exports = checker.getExportsOfModule(moduleSymbol) || [];
                forEach(exports, (exported) => {
                    if (exported.name === name) {
                        allActions.push(getCodeActionForImport(removeQuotes(moduleSymbol.getName())));
                    }
                });
            });

            // Check if a matching symbol is exported by any files known to the compiler
            forEach(context.allFiles, (file) => {
                const exports = file.symbol && file.symbol.exports;
                if (exports) {
                    for (const exported in exports) {
                        if (exports.hasOwnProperty(exported) && exported === name) {
                            let moduleSpecifier: string;
                            const sourceDir = getDirectoryPath(sourceFile.fileName);
                            if (file.fileName.indexOf(nodeModulesDir) !== -1) {
                                moduleSpecifier = convertPathToModuleSpecifier(file.fileName, context);
                            } else {
                                // Try and convert the file path into one relative to the source file

                                const pathName = getRelativePathToDirectoryOrUrl(
                                    sourceDir,
                                    file.fileName,
                                    sourceDir,
                                    createGetCanonicalFileName(context.useCaseSensitiveFileNames),
                                    false
                                );

                                // Make sure we got back a path that can be a valid module specifier
                                const isRootedOrRelative = isExternalModuleNameRelative(pathName) || isRootedDiskPath(pathName);
                                moduleSpecifier = removeFileExtension(isRootedOrRelative ? pathName : combinePaths(".", pathName));
                            }

                            allActions.push(getCodeActionForImport(moduleSpecifier, (a, b) =>
                                compareModuleSpecifiers(a, b, sourceDir, context.useCaseSensitiveFileNames)
                            ));
                        }
                    }
                }
            });

            return allActions;

            function getCodeActionForImport(moduleName: string, isEqual: (a: string, b: string) => Comparison = compareStrings): CodeAction {
                // Check to see if there are already imports being made from this source in the current file
                const existing = forEach(imports, (importDeclaration) => {
                    if (isEqual(removeQuotes(importDeclaration.moduleSpecifier.getText()), moduleName) === Comparison.EqualTo) {
                        return importDeclaration;
                    }
                });

                if (existing) {
                    return getCodeActionForExistingImport(sourceFile, existing, token, context);
                }

                return getCodeActionForNewImport(sourceFile, imports, name, moduleName, context);
            }
        }
    });

    function getCodeActionForExistingImport(sourceFile: SourceFile, declaration: ImportDeclaration, token: Node, context: CodeFixContext): CodeAction {
        const name = token.getText();
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
                    const textChange = getTextChangeForImportList(sourceFile, <NamedImports>namedBindings, name, context);
                    return createCodeAction(
                        Diagnostics.Add_0_to_existing_import_declaration_from_1,
                        [name, moduleSpecifier],
                        textChange.newText,
                        textChange.span,
                        sourceFile.fileName
                    );
                }
            }
            else if (declaration.importClause.name){
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
        }

        /**
         * Case: import "mod"
         *
         * Add a list of imports
         */
        return createCodeAction(
            Diagnostics.Add_0_to_existing_import_declaration_from_1,
            [name, moduleSpecifier],
            `{ ${name} } from `,
            { start: declaration.moduleSpecifier.getStart(), length: 0 },
            sourceFile.fileName
        );
    }

    function getCodeActionForNewImport(sourceFile: SourceFile, existing: ImportDeclaration[], tokenName: string, moduleName: string, context: CodeFixContext): CodeAction {
        // Try to insert after any existing imports
        let lastDeclaration: ImportDeclaration;
        let lastEnd: number;
        forEach(existing, (declaration) => {
            const end  = declaration.getEnd();
            if (!lastDeclaration || end > lastEnd) {
                lastDeclaration = declaration;
                lastEnd = end;
            }
        });

        let newText = `import { ${tokenName} } from "${moduleName}";`;
        newText = lastDeclaration ? context.newLineCharacter + newText : newText + context.newLineCharacter;

        return createCodeAction(
            Diagnostics.Import_0_from_1,
            [tokenName, `"${moduleName}"`],
            newText,
            { start: lastDeclaration ? lastEnd : sourceFile.getStart(), length: 0 },
            sourceFile.fileName
        );
    }

    function getTextChangeForImportList(sourceFile: SourceFile, importList: NamedImports, newSymbol: string, context: CodeFixContext): TextChange {
        if (importList.elements.length === 0) {
            const start = importList.getStart();
            return {
                newText: `{ ${newSymbol} }`,
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
            newText: oneImportPerLine ? "," + context.newLineCharacter + newSymbol : "," + newSymbol,
            span: { start: insertPoint, length: 0 }
        };
    }

    function convertPathToModuleSpecifier(path: string, context: CodeFixContext): string {
        const i = path.lastIndexOf(nodeModulesDir);
        const moduleSpecifier = i !== -1 ? removeFileExtension(path.substring(i + nodeModulesDir.length)) : path;

        // If this is a node module, check to see if the given file is the main export of the module or not. If so,
        // it can be referenced by just the module name.
        if (i !== -1) {
            const moduleDir = getDirectoryPath(path);
            let nodePackage: any;
            try {
                nodePackage = JSON.parse(context.readFile(combinePaths(moduleDir, "package.json")));
            }
            catch(e) {}

            // If no main export is explicitly defined, check for the default (index.js)
            const mainExport = (nodePackage && nodePackage.main) || "index.js";
            const mainExportPath = isRootedDiskPath(mainExport) ? mainExport : combinePaths(moduleDir, mainExport);

            const baseDir = getDirectoryPath(context.sourceFile.fileName);

            if (compareModuleSpecifiers(path, mainExportPath, baseDir, context.useCaseSensitiveFileNames) === Comparison.EqualTo) {
                return getDirectoryPath(moduleSpecifier);
            }
        }

        return moduleSpecifier;
    }

    function removeQuotes(name: string): string {
        if ((startsWith(name, "\"") && endsWith(name, "\"")) || (startsWith(name, "'") && endsWith(name, "'"))) {
            return name.substr(1, name.length - 2);
        } else {
            return name;
        }
    }

    /**
     * Paths to modules can be relative or absolute and may optionally include the file
     * extension of the module
     */
    function compareModuleSpecifiers(a: string, b: string, basePath: string, useCaseSensitiveFileNames: boolean): Comparison {
        a = removeFileExtension(a);
        b = removeFileExtension(b);
        return comparePaths(a, b, basePath, !useCaseSensitiveFileNames);
    }

    function createCodeAction(description: DiagnosticMessage, dArgs: string[], newText: string, span: TextSpan, fileName: string): CodeAction {
        return {
            description: formatMessage.apply(undefined, [undefined, description].concat(<any[]>dArgs)),
            changes: [{
                fileName,
                textChanges: [{
                    newText,
                    span
                }]
            }]
        };
    }
}
