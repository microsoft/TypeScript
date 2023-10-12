import * as path from "path";
import ts, {
    CompilerHost,
    createCompilerHost,
    createDocumentRegistry,
    DocumentRegistry,
    UserPreferences,
} from "typescript";
import {
    CodeFixAction,
    Diagnostic,
    LanguageService,
} from "typescript";

import {
    applyChangesSnapShot,
    createSnapshotRegistry,
    revertChangeSnapShot,
    VersionedFileRegistry,
    VersionedScriptSnapshot,
} from "./snapshots";
import {
    getLineColumn,
} from "./utils";

export interface BasicAbortSignal {
    isAborted: boolean;
}

export async function fixProjectRaw(
    host: ts.LanguageServiceHost,
    documentRegistry: DocumentRegistry | undefined,
    snapShotRegistry: VersionedFileRegistry,
    fixableErrors: Set<number>,
    userPreferences: ts.UserPreferences,
    selectFix: (service: LanguageService, diag: Diagnostic, fixes: readonly CodeFixAction[], files: VersionedFileRegistry, signal: BasicAbortSignal) => Promise<number | undefined> | (number | undefined),
    validateFix?: (service: LanguageService) => Promise<boolean>,
    onProjectLoaded?: (service: LanguageService, documentRegistry: DocumentRegistry, files: VersionedFileRegistry, signal: BasicAbortSignal) => Promise<void>,
) {
    documentRegistry = documentRegistry ?? createDocumentRegistry(
        host.useCaseSensitiveFileNames?.(),
        host.getCurrentDirectory(),
    );
    const service = ts.createLanguageService(host, documentRegistry);
    const program = service.getProgram()!;
    const signal: BasicAbortSignal = { isAborted: false };

    onProjectLoaded && (await onProjectLoaded?.(service, documentRegistry, snapShotRegistry, signal));
    const files = program.getSourceFiles();
    const skips = new Map<string, number>();
    const defaultFormatOptions = ts.getDefaultFormatCodeSettings();
    fileLoop:
    for (let index = 0; index < files.length; index++) {
        const file = files[index];
        if (file.fileName.endsWith(".d.ts")) continue;

        let diagnostics = getIsolatedDeclarationsErrors(file.fileName);

        if (diagnostics.length === 0) continue;
        let skipCount = skips.get(file.fileName) ?? 0;
        let lastFixedDiagnostic: Diagnostic | undefined;
        let stuckCount = 0;
        while (diagnostics.length > skipCount) {
            const diag = diagnostics[skipCount];
            // Ensure we break out of a unfixable loop
            if (lastFixedDiagnostic?.start === diag.start) {
                stuckCount++;
            }
            else {
                stuckCount = 0;
            }
            if (stuckCount === 3) {
                const { line, col } = getLineColumn(diag);
                throw Error(`Could not fix file. Got stuck in a fix loop on ${diag.file?.fileName}:${line}:${col}
TS${diag.code}: ${diag.messageText}
${diag.file?.text.substring(diag.start ?? 0, (diag.start ?? 0) + (diag.length ?? 0))}
`);
            }
            const fixes = service.getCodeFixesAtPosition(file.fileName, diag.start!, diag.start! + diag.length!, [diag.code], defaultFormatOptions, userPreferences);
            signal.isAborted = false;
            let selectedFix: number | undefined = -1;
            if (fixes.length) {
                const fixResult = selectFix(service, diag, fixes, snapShotRegistry, signal);
                selectedFix = typeof fixResult === "number" || fixResult === undefined ? fixResult : (await fixResult);
                if (signal.isAborted || selectedFix === undefined) {
                    // Restart files.
                    index = -1;
                    continue fileLoop;
                }
            }
            if (selectedFix === -1) {
                skipCount++;
                skips.set(file.fileName, skipCount);
                continue;
            }

            const fix = fixes[selectedFix];
            const changedFiles: {
                file: string;
                old: VersionedScriptSnapshot;
                new: VersionedScriptSnapshot;
            }[] = [];

            for (const fileChanges of fix.changes) {
                const snapshot = snapShotRegistry.getSnapshot(fileChanges.fileName)!;
                const newSnapShot = applyChangesSnapShot(snapshot, fileChanges.textChanges);
                snapShotRegistry.setSnapshot(fileChanges.fileName, newSnapShot);
                changedFiles.push({
                    file: fileChanges.fileName,
                    new: newSnapShot,
                    old: snapshot,
                });
            }

            if (validateFix && !await validateFix(service)) {
                changedFiles.forEach(c => {
                    snapShotRegistry.setSnapshot(c.file, revertChangeSnapShot(c.old, c.new));
                });
            }
            lastFixedDiagnostic = diag;
            diagnostics = getIsolatedDeclarationsErrors(file.fileName);
        }
    }
    service.dispose();
    function getIsolatedDeclarationsErrors(fileName: string) {
        const program = service.getProgram();
        if (!program) return [];
        const sourceFile = program.getSourceFile(fileName);
        return program.getDeclarationDiagnostics(sourceFile).filter(d => fixableErrors.has(d.code)) ?? [];
    }
}

export async function fixProject(
    tsconfigPath: string,
    fixableErrors: Set<number>,
    userPreferences: UserPreferences,
    selectFix: (service: LanguageService, diag: Diagnostic, fixes: readonly CodeFixAction[], files: VersionedFileRegistry, signal: BasicAbortSignal) => Promise<number | undefined>,
    validateFix?: (service: LanguageService) => Promise<boolean>,
    onProjectLoaded?: (service: LanguageService, documentRegistry: DocumentRegistry, files: VersionedFileRegistry, signal: BasicAbortSignal) => Promise<void>,
) {
    const resolved = path.resolve(tsconfigPath);
    const resolvedDirName = path.dirname(resolved);
    process.chdir(resolvedDirName);
    const relativeTsConfigPath = path.relative(resolvedDirName, resolved);

    // // Read tsconfig.json file from disk
    const tsconfig = ts.readConfigFile(relativeTsConfigPath, ts.sys.readFile);
    // // Parse JSON content to get compiler options and file names
    const cmdLine = ts.parseJsonConfigFileContent(tsconfig.config, ts.sys, resolvedDirName);
    cmdLine.options.skipLibCheck = true;
    const snapShotRegistry = createSnapshotRegistry(ts.sys);
    const compilerHost = createCompilerHost(cmdLine.options);
    const langHost = createLanguageHost(snapShotRegistry, cmdLine, compilerHost);

    fixProjectRaw(langHost, /*documentRegistry*/ undefined, snapShotRegistry, fixableErrors, userPreferences, selectFix, validateFix, onProjectLoaded);
}

export function createLanguageHost(
    snapShotRegistry: VersionedFileRegistry,
    cmdLine: ts.ParsedCommandLine,
    compilerHost: CompilerHost,
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
