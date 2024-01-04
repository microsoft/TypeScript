import * as fake from "./_namespaces/fakes";
import * as ts from "./_namespaces/ts";
import * as vfs from "./_namespaces/vfs";

export const isolatedDeclarationsErrors = new Set([
    ts.Diagnostics.Declaration_emit_for_this_file_requires_adding_a_type_reference_directive_which_are_not_supported_with_isolatedDeclarations,
    ts.Diagnostics.Assigning_properties_to_functions_without_declaring_them_is_not_supported_with_isolatedDeclarations_Add_an_explicit_declaration_for_the_properties_assigned_to_this_function,
    ts.Diagnostics.Reference_directives_are_not_supported_with_isolatedDeclarations,
    ts.Diagnostics.Function_must_have_an_explicit_return_type_annotation_with_isolatedDeclarations,
    ts.Diagnostics.Method_must_have_an_explicit_return_type_annotation_with_isolatedDeclarations,
    ts.Diagnostics.Variable_must_have_an_explicit_type_annotation_with_isolatedDeclarations,
    ts.Diagnostics.At_least_one_accessor_must_have_an_explicit_return_type_annotation_with_isolatedDeclarations,
    ts.Diagnostics.Parameter_must_have_an_explicit_type_annotation_with_isolatedDeclarations,
    ts.Diagnostics.Property_must_have_an_explicit_type_annotation_with_isolatedDeclarations,
    ts.Diagnostics.Computed_properties_must_be_number_or_string_literals_variables_or_dotted_expressions_with_isolatedDeclarations,
    ts.Diagnostics.Enum_member_initializers_must_be_computable_without_references_to_external_symbols_with_isolatedDeclarations,
    ts.Diagnostics.Extends_clause_can_t_contain_an_expression_with_isolatedDeclarations,
    ts.Diagnostics.Objects_that_contain_shorthand_properties_can_t_be_inferred_with_isolatedDeclarations,
    ts.Diagnostics.Objects_that_contain_spread_assignments_can_t_be_inferred_with_isolatedDeclarations,
    ts.Diagnostics.Arrays_with_spread_elements_can_t_inferred_with_isolatedDeclarations,
    ts.Diagnostics.Default_exports_can_t_be_inferred_with_isolatedDeclarations,
    ts.Diagnostics.Only_const_arrays_can_be_inferred_with_isolatedDeclarations,
    ts.Diagnostics.Expression_type_can_t_be_inferred_with_isolatedDeclarations,
    ts.Diagnostics.Binding_elements_can_t_be_exported_directly_with_isolatedDeclarations,
].map(d => d.code));

export function fixTestFiles(
    fs: vfs.FileSystem,
    programFileNames: string[],
    options: ts.CompilerOptions,
) {
    const host = new fake.CompilerHost(fs, options);

    const snapShotRegistry = createSnapshotRegistry(host);
    const langHost = createLanguageHost(snapShotRegistry, {
        fileNames: programFileNames,
        options,
        errors: [],
    }, host);

    return fixProjectInternal(
        langHost,
        ts.createDocumentRegistryInternal(
            host.useCaseSensitiveFileNames(),
            host.getCurrentDirectory(),
            /*jsDocParsingMode*/ undefined,
            {
                getDocument(_key, path) {
                    const sourceFile = host.getSourceFile(path, { languageVersion: ts.getEmitScriptTarget(options) });
                    if (sourceFile) {
                        const version = snapShotRegistry.getScriptVersion(path);
                        sourceFile.version = version.toString();
                        sourceFile.impliedNodeFormat = ts.getImpliedNodeFormatForFile(
                            path,
                            langHost.getCompilerHost?.()?.getModuleResolutionCache?.()?.getPackageJsonInfoCache(),
                            host,
                            options,
                        );
                    }
                    return sourceFile;
                },
                setDocument() {
                },
            },
        ),
        snapShotRegistry,
        isolatedDeclarationsErrors,
        { includeRelativeTypeFixes: false, includeInlineTypeFixes: false },
    );
}

export function fixProjectInternal(
    host: ts.LanguageServiceHost,
    documentRegistry: ts.DocumentRegistry | undefined,
    snapShotRegistry: VersionedFileRegistry,
    fixableErrors: Set<number>,
    userPreferences: ts.UserPreferences,
) {
    documentRegistry = documentRegistry ?? ts.createDocumentRegistry(
        host.useCaseSensitiveFileNames?.(),
        host.getCurrentDirectory(),
    );
    const service = ts.createLanguageService(host, documentRegistry);
    try {
        const program = service.getProgram()!;
        const files = program.getSourceFiles();
        if (files.some(f => f.parseDiagnostics.length !== 0)) {
            return { success: false } as const;
        }
        const defaultFormatOptions = ts.getDefaultFormatCodeSettings();

        for (const file of files) {
            if (file.fileName.endsWith(".d.ts")) continue;

            let diagnostics = getIsolatedDeclarationsErrors(file.fileName);

            if (diagnostics.length === 0) continue;

            // Try to fix all
            const fixAll = service.getCombinedCodeFix({ type: "file", fileName: file.fileName }, "fixMissingTypeAnnotationOnExports", defaultFormatOptions, userPreferences);
            applyFix(fixAll.changes);

            // Some fixes need to be applied individually such as fixing `export =`
            diagnostics = getIsolatedDeclarationsErrors(file.fileName);
            let lastFixedDiagnostic: ts.Diagnostic | undefined;
            let stuckCount = 0;
            let skipCount = 0;
            while (diagnostics.length > skipCount) {
                const diag = diagnostics[diagnostics.length - 1 - skipCount];
                // Ensure we break out of a unfixable loop
                if (lastFixedDiagnostic?.start === diag.start) {
                    stuckCount++;
                }
                else {
                    stuckCount = 0;
                }
                if (stuckCount === 3) {
                    return { success: false } as const;
                }
                const fixes = service.getCodeFixesAtPosition(file.fileName, diag.start, diag.start + diag.length, [diag.code], defaultFormatOptions, userPreferences);
                // Un-fixable error
                if (fixes.length === 0) {
                    skipCount++;
                    continue;
                }
                const fix = fixes[0];

                if (fix.changes.length === 0) break;
                lastFixedDiagnostic = diag;
                diagnostics = getIsolatedDeclarationsErrors(file.fileName);
            }
        }
        return { success: true, unfixedDiagnostics: getIsolatedDeclarationsErrors() } as const;
    }
    finally {
        service.dispose();
    }
    function applyFix(changes: readonly ts.FileTextChanges[]) {
        for (const fileChanges of changes) {
            const snapshot = snapShotRegistry.getSnapshot(fileChanges.fileName)!;
            const newSnapShot = applyChangesSnapShot(snapshot, fileChanges.textChanges);
            snapShotRegistry.setSnapshot(fileChanges.fileName, newSnapShot);
        }
    }
    function getIsolatedDeclarationsErrors(fileName?: string) {
        const program = service.getProgram();
        if (!program) return [];
        const sourceFile = fileName === undefined ? undefined : program.getSourceFile(fileName);
        return program.getDeclarationDiagnostics(sourceFile).filter(d => fixableErrors.has(d.code)) ?? [];
    }
}

export function createLanguageHost(
    snapShotRegistry: VersionedFileRegistry,
    cmdLine: ts.ParsedCommandLine,
    compilerHost: ts.CompilerHost,
) {
    function readFile(path: string) {
        const snapShot = snapShotRegistry.getSnapshot(path);
        if (snapShot) {
            return snapShot.getText(0, snapShot.getLength());
        }
        return undefined;
    }

    // Create a new TypeScript language service
    const langHost: ts.LanguageServiceHost = {
        useCaseSensitiveFileNames: () => true,
        getCompilationSettings: () => cmdLine.options,
        fileExists: path => compilerHost.fileExists(path),
        readFile,
        getScriptFileNames: () => cmdLine.fileNames,
        getScriptVersion: path => {
            return snapShotRegistry.getScriptVersion(path).toString();
        },
        getScriptSnapshot: snapShotRegistry.getSnapshot,
        readDirectory: (path, extensions, excludes, includes, depth) => compilerHost.readDirectory!(path, extensions ?? [], excludes, includes ?? [], depth),
        getCurrentDirectory: () => compilerHost.getCurrentDirectory(),
        getDefaultLibFileName: options => compilerHost.getDefaultLibFileName(options),
        getProjectReferences: () => cmdLine.projectReferences,
        writeFile(fileName, content) {
            compilerHost.writeFile(fileName, content, !!cmdLine.options.emitBOM);
        },
        directoryExists(directoryName) {
            return compilerHost.directoryExists!(directoryName);
        },
        getDirectories(directoryName) {
            return compilerHost.getDirectories!(directoryName);
        },
    };
    return langHost;
}

export interface VersionedFileRegistry {
    getSnapshot(file: string): VersionedScriptSnapshot | undefined;
    setSnapshot(file: string, value: VersionedScriptSnapshot): void;
    getScriptVersion(path: string): number;
    updateFromDisk(file: string): VersionedScriptSnapshot | undefined;
}

export interface VersionedScriptSnapshot extends ts.IScriptSnapshot {
    version: number;
}

export function createSnapshotRegistry(sys: Pick<ts.System, "readFile" | "writeFile">): VersionedFileRegistry {
    const changedFiles = new Map<string, VersionedScriptSnapshot>();

    function getScriptVersion(filePath: string) {
        return (changedFiles.get(filePath)?.version ?? 0);
    }
    function updateFromDisk(filePath: string): VersionedScriptSnapshot | undefined {
        return getSnapshot(filePath, /*forceRead*/ true);
    }
    function getSnapshot(filePath: string, forceRead = false): VersionedScriptSnapshot | undefined {
        let snapShot = changedFiles.get(filePath);
        if (snapShot && !forceRead) {
            return snapShot;
        }
        const text = sys.readFile(filePath);
        if (text === undefined) return undefined;
        if (snapShot && text === snapShot.getText(0, snapShot.getLength())) {
            return snapShot;
        }
        snapShot = Object.assign(ts.ScriptSnapshot.fromString(text), {
            version: (snapShot?.version ?? 0) + 1,
        });
        changedFiles.set(filePath, snapShot);
        return snapShot;
    }
    function setSnapshot(path: string, newVersion: VersionedScriptSnapshot) {
        const existing = changedFiles.get(path);
        // No change
        const newVersionText = newVersion.getText(0, newVersion.getLength());
        const existingVersionText = existing && existing.getText(0, existing.getLength());
        if (existingVersionText === newVersionText) {
            return;
        }
        changedFiles.set(path, newVersion);
        sys.writeFile(path, newVersionText);
    }

    return {
        getScriptVersion,
        getSnapshot,
        setSnapshot,
        updateFromDisk,
    };
}

export function textSpanEnd(span: ts.TextSpan) {
    return span.start + span.length;
}

export function applyChangesSnapShot(snapshot: VersionedScriptSnapshot, changes: readonly ts.TextChange[]): VersionedScriptSnapshot {
    let text = snapshot.getText(0, snapshot.getLength());
    let changeStart = text.length;
    let changeEnd = 0;
    const original = text;
    for (let i = changes.length - 1; i >= 0; i--) {
        const { span, newText } = changes[i];
        const spanEnd = textSpanEnd(span);
        text = `${text.substring(0, span.start)}${newText}${text.substring(spanEnd)}`;
        changeStart = Math.min(changeStart, span.start);
        changeEnd = Math.max(changeEnd, spanEnd);
    }

    const originalLength = changeEnd - changeStart;
    const newLength = originalLength + (text.length - original.length);

    return createChangeSnapshot(
        snapshot,
        text,
        { start: changeStart, length: originalLength },
        newLength,
    );
}

export function revertChangeSnapShot(originalSnapShot: VersionedScriptSnapshot, changedSnapShot: VersionedScriptSnapshot): VersionedScriptSnapshot {
    const change = changedSnapShot.getChangeRange(originalSnapShot);
    const originalText = originalSnapShot.getText(0, originalSnapShot.getLength());
    if (!change) {
        return createVersionedSnapshot(changedSnapShot, originalText);
    }
    return createChangeSnapshot(changedSnapShot, originalText, { start: change.span.start, length: change.newLength }, change.span.length);
}

export function createVersionedSnapshot(baseSnapshot: VersionedScriptSnapshot, text: string): VersionedScriptSnapshot {
    return {
        version: baseSnapshot.version + 1,
        ...ts.ScriptSnapshot.fromString(text),
    };
}
export function createChangeSnapshot(baseSnapshot: VersionedScriptSnapshot, text: string, span: ts.TextSpan, newLength: number): VersionedScriptSnapshot {
    return {
        version: baseSnapshot.version + 1,
        getChangeRange(snapshot) {
            if (snapshot !== baseSnapshot) return undefined;
            return { span, newLength };
        },
        getText(start, end) {
            if (start === 0 && end === text.length) {
                return text;
            }
            return text.substring(start, end);
        },
        dispose() {
        },
        getLength() {
            return text.length;
        },
    };
}
